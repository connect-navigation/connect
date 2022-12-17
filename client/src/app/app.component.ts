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

  }
}
