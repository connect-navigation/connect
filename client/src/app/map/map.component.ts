import { Component, OnInit } from '@angular/core';
// import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {useGeographic} from 'ol/proj';
import {LineString, Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Feature, VectorTile} from "ol";
import {
  CoffeeShopRepository,
  GasStationRepository,
  HotelRepository, RestaurantRepository,
  SuperMarketRepository
} from "../../repository/repositories";
import {Fill, Icon, Stroke, Style, Text} from "ol/style";
import {Size} from "ol/size";
import Geolocation from 'ol/Geolocation';
import CircleStyle from "ol/style/Circle";
import {RouteRepository} from "../../repository/route";
import {Polyline} from "ol/format";
import LayerGroup from "ol/layer/Group";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../../../node_modules/ol/ol.css']
})

export class MapComponent implements OnInit {
  public map!: Map
  public center!: number[]
  ngOnInit(): void {
    useGeographic();

    // This is the center of macedonia use to align the map.
    // lon, lat
    this.center = [21.8958, 41.5363];

    // Helper function to create an image style.
    function createStyle(src: string | undefined, size: Size, img: HTMLImageElement | undefined) {
      return new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          crossOrigin: 'anonymous',
          src: src,
          scale: 0.05,
        }),
      });
    }

    // Point style to represent point on the map
    const pointStyle = createStyle('assets/icon.png', [50, 50], undefined);

    const view = new View({
      center: this.center,
      zoom: 8.7
    });

    // All the route layer goes here, like the line from one place to another.
    const routeLayer = new LayerGroup({
      layers: []
    });

    // All the points go in this layer
    const pointLayer = new LayerGroup({
      layers: []
    });

    // Special layer for selected points,
    // could be merged into pointLayer.
    const selectedLayer = new LayerGroup({
      layers: []
    });

    // Create the map.
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        routeLayer,
        pointLayer,
        selectedLayer,
      ],
      target: 'map',
      view: view,
    });

    // Your location on the map, for now we assign it to an arbitrary Skopje location.
    let yourLocation: number[] | undefined = [42.0112726, 21.4051544];;

    // The geolocation module is used to give the notification,
    // to allow the browser to give the location detail.
    //
    // NOTE: this only work if the connection is HTTPS
    const geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });

    // handle geolocation error.
    geolocation.on('error', function (error) {
      // @ts-ignore
      console.log(error.message);
    });

    const accuracyFeature = new Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry() || undefined);
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );

    geolocation.on('change:position', function () {
      const coordinates = geolocation.getPosition();
      yourLocation = coordinates;
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : undefined);
    });

    new VectorLayer({
      map: this.map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });

    let map = this.map;

    // helper function used to display the points on button click.
    function buttonSetup(buttonId: string, repo: any) {
      let layer: VectorLayer<any> | null;
      document.getElementById(buttonId)
        ?.addEventListener('click', async function () {
          if (layer) {
            pointLayer.getLayers().remove(layer);
            layer = null;

            document.getElementById(buttonId)?.classList.remove('selected-button');
            return;
          }
          let value = await repo.all();
          let features: Feature[] = [];
          for (let v of value) {
            features.push(new Feature(new Point([v.lat, v.lon])));
          }

          layer = new VectorLayer({
            source: new VectorSource({
              features: features,
            }),
            style: pointStyle
          });
          pointLayer.getLayers().push(layer);
          map.render();
          document.getElementById(buttonId)?.classList.add('selected-button');
        })
    }

    // Register all the buttons
    buttonSetup('coffee-shop-button', new CoffeeShopRepository());
    buttonSetup('gas-station-button', new GasStationRepository());
    buttonSetup('hotel-button', new HotelRepository());
    buttonSetup('restaurant-button', new RestaurantRepository());
    buttonSetup('super-market-button', new SuperMarketRepository());

    // Helper function used to get the route between two points
    async function getRouteLayer(from: number[], to: number[], color: number[] = [100, 200, 255, 0.8]) {
      let route = await new RouteRepository().route(from[0], from[1], to[1], to[0]);
      // have to reverse the coords because OpenLayers expects [lon, lat] format
      let distance = route.distance;
      route = route.points.map((x: { lat: any; lon: any; }) => [x.lon, x.lat]);

      // console.log(route);

      let polyline = new LineString(route);
      const routeFeature = new Feature({
        type: 'route',
        geometry: polyline,
      });

      routeFeature.setStyle(
        new Style({
          fill: new Fill({ color: color }),
          stroke: new Stroke({ color: color, width: 3 }),
          text: new Text({
            text: `${ (distance / 1000).toFixed(2) } km`,
            font: '18px "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif',
            fill: new Fill({ color: 'black' }),
            scale: 0.7,
          })
        })
      );

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          // @ts-ignore
          features: [routeFeature],
        }),
        style: new Style({
          stroke: new Stroke({
            width: 5,
            color: color,
          }),
        }),
      });

      return vectorLayer
    }

    // @ts-ignore
    let input: HTMLInputElement = document.getElementById("search-input");
    // @ts-ignore
    let results: HTMLElement = document.getElementById('search-results');

    let features: object = {};
    let keys: string[] = [];
    // Gets all the location, this is used for search.
    async function get() {
      let coffeeShops = new CoffeeShopRepository().all();
      let gasStations = new GasStationRepository().all();
      let hotels = new HotelRepository().all();
      let restaurants = new RestaurantRepository().all();
      let superMarkets =  new SuperMarketRepository().all();

      for (let value of await coffeeShops) {
        let key = 'Coffee Shop "' + value.name + '"';
        // @ts-ignore
        features[key] = value;
        keys.push(key);
      }
      for (let value of await gasStations) {// @ts-ignore
        let key = 'Gas Station "' + value.name + '"';
        // @ts-ignore
        features[key] = value;
        keys.push(key);
      }
      // @ts-ignore
      let hotelsSorted = (await hotels).sort((a: object, b: object) => (b.stars - a.stars));
      for (let value of hotelsSorted) {// @ts-ignore
        let key = 'Hotel "' + value.name + '"';
        // @ts-ignore
        features[key] = value;
        keys.push(key);
      }
      // @ts-ignore
      let restaurantsSorted = (await restaurants).sort((a: object, b: object) => (b.stars - a.stars));
      for (let value of restaurantsSorted) {// @ts-ignore
        let key = 'Restaurant "' + value.name + '"';
        // @ts-ignore
        features[key] = value;
        keys.push(key);
      }
      for (let value of await superMarkets) {// @ts-ignore
        let key = 'Super Market "' + value.name + '"';
        // @ts-ignore
        features[key] = value;
        keys.push(key);
      }
    }
    get().then(x => {});

    // Add a listener that is executed on key event. This is for search
    input.addEventListener('keyup', function () {
      let value =  input.value.toLowerCase();
      if (value === '') {
        results.setAttribute('hidden', 'true');
      } else {
        results.removeAttribute('hidden');
      }
      // console.log(value);
      results.innerHTML = '';
      let count = 0;
      for (let key of keys) {
        if (count > 6) {
          break;
        }
        if (!key.toLowerCase().includes(value)) {
          continue;
        }
        let elem = document.createElement('p');
        // @ts-ignore
        elem.innerHTML = key;
        elem.classList.add('search-result-item');

        // @ts-ignore
        let stars = features[key].stars;
        if (stars != undefined) {
          let starsContainer = document.createElement('span');
          starsContainer.style.textAlign = 'right';
          let star = document.createElement('i');
          star.classList.add('fa-solid');
          star.classList.add('fa-star');
          star.style.color = 'yellow';
          let counter = document.createElement('span');
          counter.innerHTML = `x ${stars}`;
          starsContainer.appendChild(star);
          starsContainer.appendChild(counter);
          elem.appendChild(starsContainer);
        }

        // @ts-ignore
        if (features[key].vectorLayers) {
          elem.classList.add('selected-item');
        }

        elem.onclick = function() {
          if (!yourLocation) {
            return;
          }

          elem.classList.toggle('selected-item');

          // @ts-ignore
          let coords = [features[key].lat, features[key].lon];
          let pointFeature = new Feature(new Point(coords));
          const vectorLayer = new VectorLayer({
            source: new VectorSource({
              // @ts-ignore
              features: [pointFeature],
            }),
            style: pointStyle,
          });

          // @ts-ignore
          let layers = features[key].vectorLayers;
          if (layers) {
            // @ts-ignore
            for (let layer of layers) {
              map.removeLayer(layer);
            }

            // @ts-ignore
            features[key].vectorLayers = undefined;
            return;
          }

          getRouteLayer(yourLocation, coords)
            .then(layer => {
              // @ts-ignore
              features[key].vectorLayers = [layer, vectorLayer];
              // @ts-ignore
              layers = features[key].vectorLayers;
              // @ts-ignore
              for (let layer of layers) {
                map.addLayer(layer);
              }
            });
        }

        results.appendChild(elem);
        count++;
      }
    });

    // This is done to remove a label that appears on the map.
    // it can be ignored.
    let d = document.getElementsByTagName('ul');
    if (d) {
      let l = d.item(0);
      if (l) {
        l.setAttribute("hidden", "value");
      }
    }
  }
}
