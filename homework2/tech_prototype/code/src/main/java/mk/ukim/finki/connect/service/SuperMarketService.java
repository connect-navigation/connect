package mk.ukim.finki.connect.service;

import mk.ukim.finki.connect.model.SuperMarket;
import org.springframework.stereotype.Service;

import java.util.List;

public interface SuperMarketService {
    List<SuperMarket> findAll();
}
