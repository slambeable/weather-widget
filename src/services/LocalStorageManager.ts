import CityWeatherInfoInterface from '@/types/CityWeatherInfoInterface';

class LocalStorageManager {
  private static instance: LocalStorageManager = new LocalStorageManager();

  private currentCities :string[] = ['']

  private localStorageCities = window.localStorage.getItem('weatherWidgetCities');

  private defaultCities = ['london, gb', 'moscow, ru', 'london, us'];

  private localStorage = window.localStorage;

  private constructor() {
    LocalStorageManager.instance = this;
  }

  public static getInstance(): LocalStorageManager {
    return LocalStorageManager.instance;
  }

  public getLocalStorageCities() {
    return this.localStorageCities;
  }

  public setStartedCurrentCity() {
    this.currentCities = this.localStorageCities?.split(';') ?? this.currentCities;
  }

  public getCurrentCities() {
    return this.currentCities;
  }

  public setCurrentCitiesToDefaultValue() {
    this.currentCities = this.defaultCities;
  }

  public isCurrentCityHaveDuplicateValue(cityWithCountry: string) {
    return this.currentCities.indexOf(cityWithCountry.toLocaleLowerCase()) >= 0;
  }

  public saveChangesInLocalStorage() {
    this.localStorage.setItem('weatherWidgetCities', this.currentCities.join(';'));
  }

  public filterCurrentCity(cityWithCountry: string) {
    const newDefaultCity = this.currentCities
      .filter((currentCity) => (
        currentCity.toLocaleLowerCase() !== cityWithCountry.toLocaleLowerCase()));
    this.currentCities = newDefaultCity;
    this.saveChangesInLocalStorage();
  }

  public mapCurrentCity(citiesWeatherInfo: CityWeatherInfoInterface[]) {
    const newDefaultCity = citiesWeatherInfo.map((item) => (
      `${item.city.toLocaleLowerCase()}, ${item.country.toLocaleLowerCase()}`));
    this.currentCities = newDefaultCity;
    this.saveChangesInLocalStorage();
  }

  public removeCurrentCity() {
    this.localStorage.removeItem('weatherWidgetCities');
  }
}

export default LocalStorageManager;
