package mk.ukim.finki.connect.repository;

import com.graphhopper.GHRequest;
import com.graphhopper.GraphHopper;

import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.GraphHopper;
import com.graphhopper.ResponsePath;
import com.graphhopper.config.CHProfile;
import com.graphhopper.config.LMProfile;
import com.graphhopper.config.Profile;
import com.graphhopper.routing.weighting.custom.CustomProfile;
import com.graphhopper.util.*;
import com.graphhopper.util.shapes.GHPoint;

import mk.ukim.finki.connect.bootstrap.GraphHopperHolder;
import mk.ukim.finki.connect.model.Point;
import mk.ukim.finki.connect.model.Route;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Locale;
import java.util.List;

@Repository
public class RouteRepository {
    public Route getRoute(Point from, Point to) {
        GraphHopper hopper = GraphHopperHolder.hopper;

        // simple configuration of the request object
        GHRequest req = new GHRequest(from.getLat(), from.getLon(), to.getLat(), to.getLon()).
                // note that we have to specify which profile we are using even when there is only one like here
                        setProfile("car").
                // define the language for the turn instructions
                        setLocale(Locale.US);
        GHResponse rsp = hopper.route(req);

        // handle errors
        if (rsp.hasErrors())
            throw new RuntimeException(rsp.getErrors().toString());

        // use the best path, see the GHResponse class for more possibilities.
        ResponsePath path = rsp.getBest();

        // points, distance in meters and time in millis of the full path
        PointList pointList = path.getPoints();
        double distance = path.getDistance();
//        long timeInMs = path.getTime();

        List<Point> points = new ArrayList<>();
        for (GHPoint point : pointList) {
            points.add(new Point(point.getLat(), point.getLon()));
        }
        Route route = new Route(from, to, points, distance);
        return route;
    }
}
