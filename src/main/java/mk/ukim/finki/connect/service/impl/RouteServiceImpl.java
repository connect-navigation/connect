package mk.ukim.finki.connect.service.impl;

import mk.ukim.finki.connect.model.Point;
import mk.ukim.finki.connect.model.Route;
import mk.ukim.finki.connect.repository.RouteRepository;
import mk.ukim.finki.connect.service.RouteService;
import org.springframework.stereotype.Service;

@Service
public class RouteServiceImpl implements RouteService  {

    private RouteRepository repository;

    public RouteServiceImpl(RouteRepository repository) {
        this.repository = repository;
    }

    @Override
    public Route getRoute(Point from, Point to) {
        return repository.getRoute(from, to);
    }
}
