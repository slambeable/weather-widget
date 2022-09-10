import { Store } from 'vuex';
import CityWeatherInfoInterface from '@/types/CityWeatherInfoInterface';

declare module '@vue/runtime-core' {
  interface State {
    citiesWeatherInfo: CityWeatherInfoInterface[]
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
