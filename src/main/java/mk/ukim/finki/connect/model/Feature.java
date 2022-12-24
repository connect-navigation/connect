package mk.ukim.finki.connect.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Data
@Entity
public abstract class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double lat;
    private Double lon;
    private String name;

    private byte stars;
    private String city;
    private String street;

    public Feature(Long id, Double lat, Double lon, String name, byte stars, String city, String street) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.name = name;
        this.stars = stars;
        this.city = city;
        this.street = street;
    }

    public Feature() {

    }
}
