package mk.ukim.finki.connect.service;

import mk.ukim.finki.connect.model.GasStation;
import org.springframework.stereotype.Service;

import java.util.List;

public interface GasStationService {
    List<GasStation> findAll();
}
