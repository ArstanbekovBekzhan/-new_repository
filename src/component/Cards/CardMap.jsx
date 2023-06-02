import React, { useEffect, useRef } from 'react';

const CardMap = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Геокодирование для получения координат по адресу
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;

        // Создание карты
        const mapOptions = {
          center: location,
          zoom: 12,
        };

        mapRef.current = new window.google.maps.Map(document.getElementById('map'), mapOptions);

        // Добавление маркера на карту
        new window.google.maps.Marker({
          position: location,
          map: mapRef.current,
          title: address,
        });
      } else {
        console.error('Ошибка геокодирования:', status);
      }
    });
  }, [address]);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default CardMap;