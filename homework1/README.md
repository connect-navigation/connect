# Prerequisites

You will need a Linux OS or use Linux subsystem for Windows, to be able to use
these tools.

Packages to install:
 - `wget` - To download the latest map from [Open Street Map][open_street_map]
 - `osmosis` - parse `pbf` files into [XML][xml] map file
 - `osmctools` - Manipulation the [XML][xml] file

# Execution

```bash
$ ./pipe_and_filter.sh
```

It will download the latest map and pipe and filter it to get all the:
 - Restaurants
 - Hotels
 - Coffee Shops
 - Gas Stations
 - Supermarkets

It will pipe and filter the `ID`, `Longitude`, `Latitude`, and `Name` if it
exists, into their respective [CSV][csv] files.

[open_street_map]: https://www.openstreetmap.org/
[xml]: https://en.wikipedia.org/wiki/XML
[csv]: https://en.wikipedia.org/wiki/Comma-separated_values

