package mk.ukim.finki.connect.service.impl;

import mk.ukim.finki.connect.bootstrap.DataHolder;
import mk.ukim.finki.connect.model.CoffeeShop;
import mk.ukim.finki.connect.repository.CoffeeShopRepository;
import mk.ukim.finki.connect.service.CoffeeShopService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoffeeShopServiceImpl implements CoffeeShopService {
    private CoffeeShopRepository repository;

    public CoffeeShopServiceImpl(CoffeeShopRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<CoffeeShop> findAll() {
        if (repository.count() == 0) {
            for (CoffeeShop coffeeShop : DataHolder.coffeeShops) {
                repository.save(coffeeShop);
            }
        }
        return repository.findAll();
    }
}
