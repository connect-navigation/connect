package mk.ukim.finki.connect.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class CoffeeShop extends Feature {
    public CoffeeShop(long id, double lat, double lon, String name) {
        super(id, lat, lon, name);
    }
    public CoffeeShop() {

    }
}
