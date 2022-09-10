import axios from 'axios';
import InfoAboutWeatherResponseParametersInterface
  from '@/types/api/InfoAboutWeatherResponseParametersInterface';
import InfoAboutCityResponseParametersInterface
  from '@/types/api/InfoAboutCityResponseParametersInterface';

export default {
  getLocation(params?: InfoAboutCityResponseParametersInterface) {
    return axios
      .get('https://api.openweathermap.org/geo/1.0/direct', { params })
      .then((response) => response.data[0]);
  },

  getWeatherInfoAboutCity(params?: InfoAboutWeatherResponseParametersInterface) {
    return axios
      .get('https://api.openweathermap.org/data/2.5/weather', { params })
      .then((response) => response.data);
  },
};
