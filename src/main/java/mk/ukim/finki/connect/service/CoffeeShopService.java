package mk.ukim.finki.connect.service;

import mk.ukim.finki.connect.model.CoffeeShop;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CoffeeShopService {
    List<CoffeeShop> findAll();
}
