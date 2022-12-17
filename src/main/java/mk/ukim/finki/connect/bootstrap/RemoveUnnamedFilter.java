package mk.ukim.finki.connect.bootstrap;

import java.util.ArrayList;
import java.util.List;

public class RemoveUnnamedFilter implements Filter {
    @Override
    public Object run(Object input) {
        List<String> list = (List<String>) input;
        List<String[]> result = new ArrayList<>();
        for (String v : list) {
            String p[] = v.split(",");
            if (p.length == 3 || p[3].isEmpty()) {
                continue;
            }
            result.add(p);
        }
        return result;
    }
}
