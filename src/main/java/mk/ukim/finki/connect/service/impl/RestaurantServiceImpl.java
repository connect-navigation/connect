package mk.ukim.finki.connect.service.impl;

import mk.ukim.finki.connect.bootstrap.DataHolder;
import mk.ukim.finki.connect.model.Hotel;
import mk.ukim.finki.connect.model.Restaurant;
import mk.ukim.finki.connect.repository.RestaurantRepository;
import mk.ukim.finki.connect.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    private RestaurantRepository repository;

    public RestaurantServiceImpl(RestaurantRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Restaurant> findAll() {
        if (repository.count() == 0) {
            for (Restaurant restaurant : DataHolder.restaurants) {
                repository.save(restaurant);
            }
        }
        return repository.findAll();
    }
}
