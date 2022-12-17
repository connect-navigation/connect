package mk.ukim.finki.connect.model;

import lombok.Data;

import java.util.List;

@Data
public class Route {
    Point from;
    Point to;
    List<Point> points;

    double distance;

    public Route(Point from, Point to, List<Point> points, double distance) {
        this.from = from;
        this.to = to;
        this.points = points;
        this.distance = distance;
    }
}
