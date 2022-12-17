package mk.ukim.finki.connect.service;

import mk.ukim.finki.connect.model.Point;
import mk.ukim.finki.connect.model.Route;

public interface RouteService {
    Route getRoute(Point from, Point to);
}
