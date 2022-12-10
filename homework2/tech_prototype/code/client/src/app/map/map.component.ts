import { Component, OnInit } from '@angular/core';
// import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {useGeographic} from 'ol/proj';
import {Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Feature} from "ol";
import {
  CoffeeShopRepository,
  GasStationRepository,
  HotelRepository, RestaurantRepository,
  SuperMarketRepository
} from "../../repository/repositories";
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import {Icon, Style} from "ol/style";
import {Size} from "ol/size";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', '../../../node_modules/ol/ol.css']
})

export class MapComponent implements OnInit {
  public map!: Map
  ngOnInit(): void {
    useGeographic();

    function createStyle(src: string | undefined, size: Size, img: HTMLImageElement | undefined) {
      return new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          crossOrigin: 'anonymous',
          src: src,
          // img: img,
          // imgSize: img ? [img.width, img.height] : undefined,
          // size: new Size(),
          scale: 0.05,

        }),
      });
    }

    const pointStyle = createStyle('assets/icon.png', [50, 50], undefined);

    const place = [21.8958, 41.5363];
    const point = new Point(place);

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        // new VectorLayer({
        //   source: new VectorSource({
        //     features: [new Feature(point)],
        //   }),
        //   style: {
        //     'circle-radius': 4,
        //     'circle-fill-color': 'red',
        //   },
        // })
      ],
      target: 'map',
      view: new View({
        center: place,
        zoom: 8.7
      }),
    });

    let d = document.getElementsByTagName('ul');
    if (d) {
      let l = d.item(0);
      if (l) {
        l.setAttribute("hidden", "value");
      }
    }

    let map = this.map;
    function buttonSetup(buttonId: string, repo: any) {
      let layer: VectorLayer<any> | null;
      document.getElementById(buttonId)
        ?.addEventListener('click', async function () {
          if (layer) {
            map.removeLayer(layer);
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
            // style: {
            //   'circle-radius': 4,
            //   'circle-fill-color': 'red',
            // },
            style: pointStyle
          });
          map.addLayer(layer)
          document.getElementById(buttonId)?.classList.add('selected-button');
        })
    }

    buttonSetup('coffee-shop-button', new CoffeeShopRepository());
    buttonSetup('gas-station-button', new GasStationRepository());
    buttonSetup('hotel-button', new HotelRepository());
    buttonSetup('restaurant-button', new RestaurantRepository());
    buttonSetup('super-market-button', new SuperMarketRepository());
  }
}
