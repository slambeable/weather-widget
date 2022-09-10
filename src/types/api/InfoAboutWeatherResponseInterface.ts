interface InfoAboutWeatherResponseInterface {
  name: string,
  sys: {
    country: string,
  },
  coord: {
    lat: number,
    lon: number,
  },
  weather: {
    0: {
      description: string,
      icon: string,
    },
  },
  main: {
    pressure: number,
    temp: number,
    humidity: number,
    ['feels_like']: number,
  },
  wind: {
    speed: number,
  },
  visibility: number,
}

export default InfoAboutWeatherResponseInterface;
