package mk.ukim.finki.connect.service.impl;

import mk.ukim.finki.connect.bootstrap.DataHolder;
import mk.ukim.finki.connect.model.Restaurant;
import mk.ukim.finki.connect.model.SuperMarket;
import mk.ukim.finki.connect.repository.SuperMarketRepository;
import mk.ukim.finki.connect.service.SuperMarketService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperMarketServiceImpl implements SuperMarketService {
    private SuperMarketRepository repository;

    public SuperMarketServiceImpl(SuperMarketRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<SuperMarket> findAll() {
        if (repository.count() == 0) {
            for (SuperMarket superMarket : DataHolder.superMarkets) {
                repository.save(superMarket);
            }
        }
        return repository.findAll();
    }
}
