"use client";
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import * as maptilersdk from "@maptiler/sdk";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import Grid from "@mui/material/Grid";
// import { ScaleControl } from "maplibre-gl";
import { MAP_API_KEY } from "constants";
import "@maptiler/sdk/dist/maptiler-sdk.css";

let addedCordinates = [];

export default function Map({
  onClick,
  locations = [],
  myCordinate = [],
  handleMarkerClicked,
  handleMyMarkerClicked,
  center = [0, 0],
  zoom = 0,
  handleZoomChanged,
  handleCenterChanged,
  handleBounds,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState(MAP_API_KEY);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    maptilersdk.config.apiKey = API_KEY
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS.LIGHT,
      center,
      zoom,
      geolocateControl: true,
      layers: [
        {
          id: "water",
          source: "streets",
          "source-layer": "water",
          type: "fill",
          paint: {
            "fill-color": "#00ffff",
          },
        },
      ],
    });
    map.current.setStyle(maptilersdk.MapStyle.STREETS.PASTEL);
    map.current.scrollZoom.setWheelZoomRate(1);
    map.current.scrollZoom.setZoomRate(1);
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "bottom-right"
    );
    //////////////////////////////////////////////////////////////////////////
    if (onClick) {
      var marker = new maptilersdk.Marker();

      function add_marker(event) {
        var coordinates = event.lngLat;
        marker.setLngLat(coordinates).addTo(map.current);
        onClick([coordinates.lat, coordinates.lng]);
      }

      map.current.on("click", add_marker);
    }

    //////////////////////////////////////////////////////////////////////////
    map.current.on("zoomend", () => {
      const currentZoom = map.current.getZoom();
      handleZoomChanged?.(currentZoom);
      var bounds = map.current.getBounds();

      handleBounds?.(
        bounds.getEast(),
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getSouth(),
        false
      );
    });

    //////////////////////////////////////////////////////////////////////////
    map.current.on("dragend", () => {
      var newCenter = map.current.getCenter();
      handleCenterChanged?.(newCenter);
      var bounds = map.current.getBounds();
      handleBounds?.(
        bounds.getEast(),
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getSouth(),
        true
      );
    });

    //////////////////////////////////////////////////////////////////////////
    var bounds = map.current.getBounds();

    handleBounds?.(
      bounds.getEast(),
      bounds.getWest(),
      bounds.getNorth(),
      bounds.getSouth()
    );
    //////////////////////////////////////////////////////////////////////////

    // let scale = new ScaleControl({
    //   maxWidth: 500,
    //   unit: "imperial",
    // });
    // map.current.addControl(scale);

    // scale.setUnit("metric");
  }, []);

  useEffect(() => {
    if (myCordinate[0]) {
      const marker = new maplibregl.Marker({ color: "lightBlue" })
        .setLngLat(myCordinate)
        .addTo(map.current);
      handleMyMarkerClicked &&
        marker.getElement().addEventListener("click", () => {
          handleMyMarkerClicked();
        });
    }
  }, [myCordinate[0]]);

  // useEffect(() => {
  //   map.current.flyTo({ center, zoom: 14 });
  // }, [center[0], center[1]]);

  useEffect(() => {
    addedCordinates.forEach((item) => {
      item.remove();
    });
    addedCordinates = [];
    locations.forEach((element) => {
      // const temp = addedCordinates.find(
      //   (item) => item[0] === element[0] && item[1] === element[1]
      // );
      // if (!temp) {
      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat(element)
        .addTo(map.current);
      handleMarkerClicked &&
        marker.getElement().addEventListener("click", () => {
          handleMarkerClicked(element);
        });
      addedCordinates.push(marker);
      // }
    });
  }, [locations]);

  return (
    <Grid container className="map-wrap">
      <div ref={mapContainer} className="map" />
    </Grid>
  );
}
