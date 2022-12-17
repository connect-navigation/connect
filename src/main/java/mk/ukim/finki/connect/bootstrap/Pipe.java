package mk.ukim.finki.connect.bootstrap;

import java.util.ArrayList;
import java.util.List;

public class Pipe<I, O> {
    private List<Filter> filters = new ArrayList<>();

    void add(Filter filter) {
        this.filters.add(filter);
    }

    O run(I inputRaw) {
        Object input = inputRaw;
        for (Filter filter : filters) {
            input = filter.run(input);
        }
        return (O)input;
    }
}
