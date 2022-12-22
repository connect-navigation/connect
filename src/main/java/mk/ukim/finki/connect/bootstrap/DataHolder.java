package mk.ukim.finki.connect.bootstrap;

import jakarta.annotation.PostConstruct;
import mk.ukim.finki.connect.model.*;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataHolder {
    public static List<CoffeeShop> coffeeShops = new ArrayList<>();
    public static List<GasStation> gasStations = new ArrayList<>();
    public static List<Hotel> hotels = new ArrayList<>();
    public static List<Restaurant> restaurants = new ArrayList<>();
    public static List<SuperMarket> superMarkets = new ArrayList<>();

    @PostConstruct
    void init() throws IOException {
        SplitByFilter splitByNewlineFilter = new SplitByFilter("\n");
        SkipFilter skipFirstLineFilter = new SkipFilter(1);
        RemoveUnnamedFilter removeUnnamedFilter = new RemoveUnnamedFilter();

        Pipe<String, List<String[]>> pipe = new Pipe<>();
        pipe.add(splitByNewlineFilter);
        pipe.add(skipFirstLineFilter);
        pipe.add(removeUnnamedFilter);

        String fileString = Files.readString(Path.of("bootstrap/coffee_shops.csv"), Charset.defaultCharset());
        List<String[]> values = pipe.run(fileString);
        for (String[] value : values) {
            coffeeShops.add(new CoffeeShop(
                    Long.parseLong(value[0]),
                    Double.parseDouble(value[1]),
                    Double.parseDouble(value[2]),
                    value[3]
            ));
        }

        fileString = Files.readString(Path.of("bootstrap/gas_stations.csv"), Charset.defaultCharset());
        values = pipe.run(fileString);
        for (String[] value : values) {
            gasStations.add(new GasStation(
                    Long.parseLong(value[0]),
                    Double.parseDouble(value[1]),
                    Double.parseDouble(value[2]),
                    value[3]
            ));
        }

        fileString = Files.readString(Path.of("bootstrap/hotels.csv"), Charset.defaultCharset());
        values = pipe.run(fileString);
        for (String[] value : values) {
            hotels.add(new Hotel(
                    Long.parseLong(value[0]),
                    Double.parseDouble(value[1]),
                    Double.parseDouble(value[2]),
                    value[3],
                    Byte.parseByte(value[4].trim())
            ));
        }

        fileString = Files.readString(Path.of("bootstrap/restaurants.csv"), Charset.defaultCharset());
        values = pipe.run(fileString);
        for (String[] value : values) {
            restaurants.add(new Restaurant(
                    Long.parseLong(value[0]),
                    Double.parseDouble(value[1]),
                    Double.parseDouble(value[2]),
                    value[3],
                    Byte.parseByte(value[4].trim())
            ));
        }

        fileString = Files.readString(Path.of("bootstrap/supermarkets.csv"), Charset.defaultCharset());
        values = pipe.run(fileString);
        for (String[] value : values) {
            superMarkets.add(new SuperMarket(
                    Long.parseLong(value[0]),
                    Double.parseDouble(value[1]),
                    Double.parseDouble(value[2]),
                    value[3]
            ));
        }
    }
}
