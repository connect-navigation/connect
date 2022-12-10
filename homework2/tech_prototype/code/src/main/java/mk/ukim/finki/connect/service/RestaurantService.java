package mk.ukim.finki.connect.service;

import mk.ukim.finki.connect.model.Restaurant;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RestaurantService {
    List<Restaurant> findAll();
}
