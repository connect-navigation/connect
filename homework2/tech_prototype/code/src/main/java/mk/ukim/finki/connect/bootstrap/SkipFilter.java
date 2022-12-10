package mk.ukim.finki.connect.bootstrap;

import java.util.List;
import java.util.stream.Collectors;

public class SkipFilter implements Filter {
    private final int n;

    public SkipFilter(int n) {
        this.n = n;
    }

    @Override
    public Object run(Object input) {
        List<String> list = (List<String>) input;
        return list.stream().skip(this.n).collect(Collectors.toList());
    }
}
