import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const CardMap = ({ address }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const streetAddress = address.split(',')[0].trim();

    mapRef.current = L.map('map').setView([42.8746, 74.5698], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    const geocoder = L.Control.Geocoder.nominatim();
    const control = L.Control.geocoder({
      geocoder: geocoder,
      defaultMarkGeocode: false,
    }).addTo(mapRef.current);

    geocoder.geocode(streetAddress + ', Бишкек', (results) => {
      if (results.length > 0) {
        const { lat, lon } = results[0].center;
        if (lat && lon) {
          const coordinates = [lat, lon];
          mapRef.current.flyTo(coordinates, 1); // Изменил значение увеличения на 18

          if (markerRef.current) {
            markerRef.current.remove();
          }

          markerRef.current = L.marker(coordinates, {
            icon: L.icon({
              iconUrl: '/images/marker-icon-red.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          }).addTo(mapRef.current);

          control.markGeocode(results[0]);
        } else {
          console.error('Invalid coordinates for the specified address.');
          const defaultCoordinates = [42.8746, 74.5698];
          mapRef.current.flyTo(defaultCoordinates, 15);
        }
      } else {
        console.error('Не удалось найти координаты для указанной улицы.');
        const defaultCoordinates = [42.8746, 74.5698];
        mapRef.current.flyTo(defaultCoordinates, 15);
      }
    });

    return () => {
      mapRef.current.remove();
    };
  }, [address]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default CardMap;