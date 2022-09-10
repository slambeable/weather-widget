import { createStore } from 'vuex';
import CityWeatherInfoInterface from '@/types/CityWeatherInfoInterface';
import InfoAboutWeatherResponseInterface from '@/types/api/InfoAboutWeatherResponseInterface';
import InfoAboutCityResponseInterface from '@/types/api/InfoAboutCityResponseInterface';
import api from '@/api/index';

export default createStore({
  state: {
    citiesWeatherInfo: [] as CityWeatherInfoInterface[],
  },
  mutations: {
    setCitiesWeatherInfo(state, newCityInfo: InfoAboutWeatherResponseInterface) {
      state.citiesWeatherInfo.push({
        city: newCityInfo.name,
        country: newCityInfo.sys.country,
        cityWithCountry: `${newCityInfo.name}, ${newCityInfo.sys.country}`.toLocaleLowerCase(),
        degreesCelsius: newCityInfo.main.temp,
        feelsLike: newCityInfo.main.feels_like,
        weatherDescription: newCityInfo.weather[0].description,
        iconId: newCityInfo.weather[0].icon,
        windSpeed: newCityInfo.wind.speed,
        pressure: newCityInfo.main.pressure,
        humidity: newCityInfo.main.humidity,
        dewPoint: 0,
        visibility: newCityInfo.visibility,
        lat: newCityInfo.coord.lat,
        lon: newCityInfo.coord.lon,
        id: `${Math.abs(newCityInfo.coord.lat)}
          - ${Math.abs(newCityInfo.coord.lon)} - ${newCityInfo.name}`,
      });
    },

    deleteCitiesWeatherInfo(state, id: string) {
      state.citiesWeatherInfo = state.citiesWeatherInfo?.filter((item) => item.id !== id);
    },

    sortCitiesInFirstLoad(state, currentCities: string[]) {
      state.citiesWeatherInfo = currentCities
        .reduce((acc, city) => {
          const index = state.citiesWeatherInfo.findIndex((item) => (
            item.cityWithCountry === city.toLowerCase()));
          return [...acc, state.citiesWeatherInfo[index]];
        }, [] as CityWeatherInfoInterface[]);
    },
  },
  actions: {
    async fetchCitiesWeatherInfo(
      { commit },
      payload: {
        city: string,
        lat: null | number,
        lon: null | number
      },
    ) {
      let infoAboutCityResponse: InfoAboutCityResponseInterface | null = null;

      if (!payload.lat) {
        infoAboutCityResponse = await api.getLocation({
          q: payload.city,
          limit: 1,
          appid: process.env.VUE_APP_WEATHER_USER_KEY,
        });
      }

      const infoAboutWeather: InfoAboutWeatherResponseInterface = await api
        .getWeatherInfoAboutCity({
          lat: payload.lat ?? (infoAboutCityResponse?.lat ?? null),
          lon: payload.lon ?? (infoAboutCityResponse?.lon ?? null),
          units: 'metric',
          appid: process.env.VUE_APP_WEATHER_USER_KEY,
        });

      commit('setCitiesWeatherInfo', infoAboutWeather);
    },
  },
});
