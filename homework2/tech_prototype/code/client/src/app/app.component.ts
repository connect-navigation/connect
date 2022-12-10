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

    let features = {};
    let keys: string[] = [];
    async function get() {
      let coffeeShops = new CoffeeShopRepository().all();
      let gasStations = new GasStationRepository().all();
      let hotels = new HotelRepository().all();
      let restaurants = new RestaurantRepository().all();
      let superMarkets =  new SuperMarketRepository().all();

      for (let value of await coffeeShops) {// @ts-ignore
        features['Coffee Shop "' + value.name + '"'] = value;
      }
      for (let value of await gasStations) {// @ts-ignore
        features['Gas Station "' + value.name + '"'] = value;
      }
      for (let value of await hotels) {// @ts-ignore
        features['Hotel "' + value.name + '"'] = value;
      }
      for (let value of await restaurants) {// @ts-ignore
        features['Restaurant "' + value.name + '"'] = value;
      }
      for (let value of await superMarkets) {// @ts-ignore
        features['Super Market "' + value.name + '"'] = value;
      }

      keys = Object.keys(features);
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
      // results.remov
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
        results.appendChild(elem);

        count++;
      }

    });
  }
}
