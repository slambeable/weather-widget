<template>
  <div class="weather-widget-city-weather-list">
    <city-weather-vue
      class="weather-widget-city-weather-list__element"
      v-for="city in $store.state.citiesWeatherInfo"
      :key="city.id"
      :cityWeatherInfo="city"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import CityWeatherVue from '../CityWeather.vue';

export default defineComponent({
  name: 'CityWeatherListScreen',
  components: {
    CityWeatherVue,
  },
});
</script>

<style scoped lang="scss">
  .weather-widget-city-weather-list {
    &__element {
      margin-bottom: 30px;
    }
  }
</style>
