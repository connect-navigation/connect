package mk.ukim.finki.connect.model;


import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Hotel extends Feature {
    public Hotel(long id, double lat, double lon, String name) {
        super(id, lat, lon, name);
    }
    public Hotel() {}
}
