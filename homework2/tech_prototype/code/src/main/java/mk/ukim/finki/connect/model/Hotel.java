package mk.ukim.finki.connect.model;


import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Hotel extends Feature {
    byte stars;

    public Hotel(long id, double lat, double lon, String name, byte stars) {
        super(id, lat, lon, name);
        this.stars = stars;
    }
    public Hotel() {}
}
