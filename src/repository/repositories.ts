import { Injectable } from '@angular/core';
import httpClient from '../infrastructure/http-client';

const ServerLocation = 'https://connect-navigation-server.onrender.com';

@Injectable()
export class CoffeeShopRepository {
  async all() {
    const resp = await fetch(ServerLocation + '/api/coffee-shops/all');
    const data = await resp.json();
    return data;
  }
}

@Injectable()
export class GasStationRepository {
  async all() {
    const resp = await fetch(ServerLocation + '/api/gas-stations/all');
    const data = await resp.json();
    return data;
  }
}

@Injectable()
export class HotelRepository {
  async all() {
    const resp = await fetch(ServerLocation + '/api/hotels/all');
    const data = await resp.json();
    return data;
  }
}

@Injectable()
export class SuperMarketRepository {
  async all() {
    const resp = await fetch(ServerLocation + '/api/super-markets/all');
    const data = await resp.json();
    return data;
  }
}

@Injectable()
export class RestaurantRepository {
  async all() {
    const resp = await fetch(ServerLocation + '/api/restaurants/all');
    const data = await resp.json();
    return data;
  }
}

