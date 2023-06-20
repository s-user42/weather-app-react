import { useEffect, useState } from 'react';

const LocationService = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const apiKey = '26261927b61347f7a96c3bbdfca8a50a';
            const reverseGeocodingUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

            const response = await fetch(reverseGeocodingUrl);
            const data = await response.json();

            if (data.results.length > 0) {
              const cityName = data.results[0].components.city;
              const countryName = data.results[0].components.country;
              setCity(cityName);
              setCountry(countryName);
            }
          } catch (error) {
            console.log('Error fetching location data:', error);
          }
        },
        (error) => {
          setCity("error getting")
          console.log('Error getting geolocation:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported in this browser');
    }
  }, []);

  return { city, country };
};

export default LocationService;
