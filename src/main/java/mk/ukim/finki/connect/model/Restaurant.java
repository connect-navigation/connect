package mk.ukim.finki.connect.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Restaurant extends Feature {
    public Restaurant(Long id, Double lat, Double lon, String name, byte stars, String city, String street) {
        super(id, lat, lon, name, stars, city, street);
    }

    public Restaurant() {}
}
