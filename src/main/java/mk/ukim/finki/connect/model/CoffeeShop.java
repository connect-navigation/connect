package mk.ukim.finki.connect.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class CoffeeShop extends Feature {
    public CoffeeShop(Long id, Double lat, Double lon, String name, byte stars, String city, String street) {
        super(id, lat, lon, name, stars, city, street);
    }

    public CoffeeShop() {

    }
}
