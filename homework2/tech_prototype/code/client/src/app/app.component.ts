import { Component } from '@angular/core';
import {
  CoffeeShopRepository, GasStationRepository,
  HotelRepository,
  RestaurantRepository,
  SuperMarketRepository
} from "../repository/repositories";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Connect Navigation';

  ngOnInit(): void {
    // @ts-ignore
    let input: HTMLInputElement = document.getElementById("search-input");
    // @ts-ignore
    let results: HTMLElement = document.getElementById('search-results');

    let features: object = {};
    let keys: string[] = [];
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

        results.appendChild(elem);

        count++;
      }

    });
  }
}
