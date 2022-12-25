import { Injectable } from '@angular/core';
import httpClient from '../infrastructure/http-client';
import {Point} from "ol/geom";

const ServerLocation = 'https://connect-navigation-server.onrender.com';

@Injectable()
export class RouteRepository {
  async route(fromLat: number, fromLon: number, toLat: number, toLon: number) {
    const resp = await fetch(ServerLocation + `/api/route/${fromLat}/${fromLon}/${toLat}/${toLon}`);
    const data = await resp.json();
    return data;
  }
}
