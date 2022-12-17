package mk.ukim.finki.connect.web.rest;

import mk.ukim.finki.connect.model.GasStation;
import mk.ukim.finki.connect.service.GasStationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/gas-stations")
@Validated
@CrossOrigin(origins = "*")
public class GasStationRestController {
    private final GasStationService gasStationService;

    public GasStationRestController(GasStationService gasStationService) {
        this.gasStationService = gasStationService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<GasStation>> getAll() {
        List<GasStation> list = gasStationService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}