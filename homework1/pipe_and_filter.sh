#!/bin/sh

# Get the latest map data of North Macedonia
echo "----------------------- Getting map data ---------------------------"
wget http://download.geofabrik.de/europe/macedonia-latest.osm.pbf

# Convert to XML file format that the filter tools understand
echo "------------ Converting to usable format ---------------------------"
osmosis --read-pbf macedonia-latest.osm.pbf  --write-xml macedonia.osm

# Filter out the data: ID langitude latitude and name if available

Get() {
    echo "------------ Pipe and filtering '$1' to '$2' -------------------"
    osmfilter macedonia.osm --keep="$1" | osmconvert - --all-to-nodes --csv="@id @lon @lat name" --csv-headline --csv-separator="," -o="$2"
}

Get "tourism=hotel"              hotels.csv
Get "shop=supermarket"           supermarkets.csv
Get "amenity=cafe;internet_cafe" coffee_shops.csv
Get "amenity=fuel"               gas_stations.csv
Get "amenity=restaurant"         restaurants.csv

echo "--------------- Pipe and filter is complete ------------------------"

