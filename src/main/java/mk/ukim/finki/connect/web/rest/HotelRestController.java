package mk.ukim.finki.connect.web.rest;

import mk.ukim.finki.connect.model.Hotel;
import mk.ukim.finki.connect.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/hotels")
@Validated
@CrossOrigin(origins = "*")
public class HotelRestController {
    private final HotelService service;

    public HotelRestController(HotelService service) {
        this.service = service;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Hotel>> getAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
}