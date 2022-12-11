package mk.ukim.finki.connect.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Restaurant extends Feature {
    byte stars;
    public Restaurant(long id, double lat, double lon, String name, byte stars) {
        super(id, lat, lon, name);
        this.stars = stars;
    }
    public Restaurant() {}
}
