package mk.ukim.finki.connect.bootstrap;


import java.util.Arrays;
import java.util.stream.Collectors;

public class SplitByFilter implements Filter {
    private final String delimiter;
    public SplitByFilter(String delimiter) {
        this.delimiter = delimiter;
    }

    @Override
    public Object run(Object input) {
        return Arrays.stream(((String)input).split(this.delimiter)).collect(Collectors.toList());
    }
}
