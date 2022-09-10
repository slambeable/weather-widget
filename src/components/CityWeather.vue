<template>
  <div class="weather-widget-city-info">
    <div class="weather-widget-city-info__name">{{ cityWeatherWidgetText.cityWithCountry }}</div>
    <div class="weather-widget-city-info-container weather-widget-city-info-container--1">
      <img
        class="weather-widget-city-info-container__main-icon"
        :src="cityWeatherWidgetText.iconId"
        alt="weather icon"
      >
      <div
        class="weather-widget-city-info-container__celsius"
      >{{ cityWeatherWidgetText.degreesCelsius }}</div>
    </div>
    <div
      class="weather-widget-city-info__feels-like"
    >{{ cityWeatherWidgetText.shortDescription }}</div>
    <div class="weather-widget-city-info-container weather-widget-city-info-container--2">
      <div class="weather-widget-city-info-component">
        <arrow-wind-icon
          class="weather-widget-city-info-container__arrow-icon"
        />
        <span>{{ cityWeatherWidgetText.windSpeed }}</span>
      </div>
      <div class="weather-widget-city-info-component">
        <compass-icon
          class="weather-widget-city-info-container__compass-icon"
        />
        <span>{{ cityWeatherWidgetText.pressure }}</span>
      </div>
    </div>
    <div class="weather-widget-city-info-container weather-widget-city-info-container--3">
      <div>{{ cityWeatherWidgetText.humidity }}</div>
      <div>{{ cityWeatherWidgetText.dewPoint }}</div>
      <div>{{ cityWeatherWidgetText.visibility }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, toRefs, ref,
} from 'vue';
import CityWeatherInfoInterface from '@/types/CityWeatherInfoInterface';
import { ArrowWindIcon, CompassIcon } from '@/components/Icons/index';

export default defineComponent({
  name: 'CityWeather',
  components: {
    ArrowWindIcon,
    CompassIcon,
  },
  props: {
    cityWeatherInfo: {
      required: true,
      type: Object as PropType<CityWeatherInfoInterface>,
    },
  },
  setup(props) {
    const { cityWeatherInfo } = toRefs(props);

    const cityWeatherWidgetText = ref({
      cityWithCountry: `${cityWeatherInfo.value.city}, ${cityWeatherInfo.value.country}`,
      degreesCelsius: `${Math.round(cityWeatherInfo.value.degreesCelsius)}°C`,
      shortDescription: `Feels like: ${Math.round(cityWeatherInfo.value.feelsLike)}°C,
        ${cityWeatherInfo.value.weatherDescription}`,
      iconId: `https://openweathermap.org/img/wn/${cityWeatherInfo.value.iconId}@4x.png`,
      windSpeed: `${cityWeatherInfo.value.windSpeed}m/s SSE`,
      pressure: `${cityWeatherInfo.value.pressure}hPa`,
      humidity: `Humidity ${cityWeatherInfo.value.humidity}%`,
      dewPoint: `Dew point ${cityWeatherInfo.value.dewPoint}°C`,
      visibility: `Visibility ${cityWeatherInfo.value.visibility}km`,
    });

    return {
      cityWeatherWidgetText,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/css/colors";

.weather-widget-city-info {
  border-bottom: 2px solid $main-text-color;

  &__name {
    font-size: 22px;
    text-align: left;
  }

  &-container {
    display: flex;
    align-items: center;

    &--1 {
      justify-content: space-around;
    }

    &--2 {
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &--3 {
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 16px;

      & div {
        white-space: nowrap;
      }
    }

    &__celsius {
      font-size: 36px;
      font-weight: 600;
      margin-left: 20px;
    }

    &__main-icon {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }

    &__arrow-icon {
      height: 20px;
      transform: rotate(-20deg);
      margin-right: 10px;
    }

    &__compass-icon {
      height: 20px;
      margin-right: 10px;
    }
  }

  &__feels-like {
    text-align: left;
    margin-bottom: 16px;
  }

  &-component {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
