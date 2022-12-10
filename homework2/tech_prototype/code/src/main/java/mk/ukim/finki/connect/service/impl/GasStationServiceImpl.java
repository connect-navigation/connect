package mk.ukim.finki.connect.service.impl;

import mk.ukim.finki.connect.bootstrap.DataHolder;
import mk.ukim.finki.connect.model.CoffeeShop;
import mk.ukim.finki.connect.model.GasStation;
import mk.ukim.finki.connect.repository.GasStationRepository;
import mk.ukim.finki.connect.service.GasStationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GasStationServiceImpl implements GasStationService {
    private GasStationRepository repository;

    public GasStationServiceImpl(GasStationRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<GasStation> findAll() {
        if (repository.count() == 0) {
            for (GasStation gasStation : DataHolder.gasStations) {
                repository.save(gasStation);
            }
        }
        return repository.findAll();
    }
}
