package mk.ukim.finki.connect.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class GasStation extends Feature {
    public GasStation(long id, double lat, double lon, String name) {
        super(id, lat, lon, name);
    }
    public GasStation() {}
}
