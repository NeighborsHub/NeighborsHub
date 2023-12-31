"use client";
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import * as maptilersdk from "@maptiler/sdk";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import Grid from "@mui/material/Grid";
import Modal from "components/modal/modal";
import ListItem from "components/list/listItem";
import { MAP_API_KEY } from "constants";

export default function Map({
  onClick,
  cordinates = [],
  isOnList,
  center = [0, 0],
  zoom = 0,
  clickable = true,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState(MAP_API_KEY);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center,
      zoom,
      geolocateControl: true,
    });
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
    cordinates.forEach((element) => {
      const marker = new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat(element)
        .addTo(map.current);
      !isOnList &&
        marker.getElement().addEventListener("click", () => {
          setOpen(true);
        });
    });
    if (clickable) {
      var marker = new maptilersdk.Marker();

      function add_marker(event) {
        var coordinates = event.lngLat;
        marker.setLngLat(coordinates).addTo(map.current);
        onClick?.([coordinates.lng, coordinates.lat]);
      }

      map.current.on("click", add_marker);
    }
  }, []);

  useEffect(() => {
    console.log(center);
    map.current.flyTo({ center });
  }, [center[0], center[1]]);

  return (
    <Grid container className="map-wrap">
      <div ref={mapContainer} className="map" />
      <Modal open={open} onClose={() => setOpen(false)}>
        <ListItem />
      </Modal>
    </Grid>
  );
}
