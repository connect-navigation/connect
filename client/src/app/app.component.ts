import { Component } from '@angular/core';
import {
  CoffeeShopRepository, GasStationRepository,
  HotelRepository,
  RestaurantRepository,
  SuperMarketRepository
} from "../repository/repositories";
import {Point} from "ol/geom";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Connect Navigation';

  ngOnInit(): void {
    let input = document.getElementById("search-input");
    let results = document.getElementById("search-results");
    let bodyTag = document.getElementsByTagName("body");

    if (input && results && bodyTag.length == 1) {
      let body = bodyTag[0];
      results.onclick = function (e) {
        // @ts-ignore
        input.focus();
        e.stopPropagation();
      };

      input.onfocus = function () {
        // @ts-ignore
        results.removeAttribute('hidden');
      };
      input.onclick = function (e) {e.stopPropagation()};

      body.onclick = function () {
        // @ts-ignore
        results.setAttribute('hidden', 'true');
      };
    }
  }
}
