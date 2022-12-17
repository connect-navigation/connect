package mk.ukim.finki.connect.web.rest;

import mk.ukim.finki.connect.model.Point;
import mk.ukim.finki.connect.model.Route;
import mk.ukim.finki.connect.service.RouteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/route")
@Validated
@CrossOrigin(origins = "*")
public class RouteRestController {

    private final RouteService service;
    public RouteRestController(RouteService service) {
        this.service = service;
    }

    @GetMapping(value = "/{from-lat}/{from-lon}/{to-lat}/{to-lon}")
    public ResponseEntity<Route> getAll(
            @PathVariable("from-lat") double fromLat,
            @PathVariable("from-lon") double fromLon,
            @PathVariable("to-lat") double toLat,
            @PathVariable("to-lon") double toLon
    ) {
        Point from = new Point(fromLat, fromLon);
        Point to = new  Point(toLat, toLon);
        Route route = null;
        try {
            route = service.getRoute(from, to);
        } catch (Exception e) {
        }
        return new ResponseEntity<>(route, HttpStatus.OK);
    }
}