package mk.ukim.finki.connect.service.impl;

import mk.ukim.finki.connect.bootstrap.DataHolder;
import mk.ukim.finki.connect.model.GasStation;
import mk.ukim.finki.connect.model.Hotel;
import mk.ukim.finki.connect.repository.HotelRepository;
import mk.ukim.finki.connect.service.HotelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {
    private HotelRepository repository;

    public HotelServiceImpl(HotelRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Hotel> findAll() {
        if (repository.count() == 0) {
            for (Hotel hotel : DataHolder.hotels) {
                repository.save(hotel);
            }
        }
        return repository.findAll();
    }
}
