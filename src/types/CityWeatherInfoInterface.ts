interface CityWeatherInfoInterface {
  city: string,
  country: string,
  cityWithCountry: string,
  degreesCelsius: number,
  feelsLike: number,
  weatherDescription: string,
  iconId: string,
  windSpeed: number,
  pressure: number,
  humidity: number,
  dewPoint: number,
  visibility: number,
  lat: number,
  lon: number,
  id: string,
}

export default CityWeatherInfoInterface;
