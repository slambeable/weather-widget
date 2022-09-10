<template>
  <transition name="weather-widget-component-header">
    <header-main-vue
      v-if="isShow.header"
      @toggleScreen="toggleScreen"
    />
  </transition>
  <transition name="weather-widget-component">
    <city-weather-list-vue
      v-if="isShow.cityWeather"
    />
  </transition>
  <transition name="weather-widget-component">
    <property-screen-vue
      v-if="isShow.setting"
      @deleteItem="deleteItem"
      @addItem="addItem"
      @moveItem="moveItem"
    />
  </transition>
  <transition name="weather-widget-component">
    <pre-loader-vue
      v-if="isShow.preloader"
    />
  </transition>
  <transition name="weather-widget-component">
    <error-load-screen-vue
      v-if="isShow.errorScreen"
      @tryLoadAllDataAgain="tryLoadAllDataAgain"
    />
  </transition>
  <transition name="weather-widget-component">
    <error-pop-up-vue
      v-if="isShow.errorPopUp"
      :keyForErrorText="keyForErrorText"
    />
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { AxiosError } from 'axios';
import ErrorTextForTemplateEnum from './constants/errors/ErrorTextForTemplateEnum';
import CityWeatherListVue from './components/Screen/CityWeatherListScreen.vue';
import HeaderMainVue from './components/HeaderMain.vue';
import PropertyScreenVue from './components/Screen/PropertyScreen.vue';
import PreLoaderVue from './components/UI/PreLoader.vue';
import ErrorLoadScreenVue from './components/Screen/ErrorLoadScreen.vue';
import ErrorPopUpVue from './components/UI/ErrorPopUp.vue';
import LocalStorageManager from './services/LocalStorageManager';
import GeoPositionManager from './services/GeoPositionManager';

export default defineComponent({
  name: 'App',
  components: {
    CityWeatherListVue,
    HeaderMainVue,
    PropertyScreenVue,
    PreLoaderVue,
    ErrorLoadScreenVue,
    ErrorPopUpVue,
  },
  setup() {
    const store = useStore();

    const timer = {
      hideErrorPopUp: 3000,
    };

    const isShow = ref({
      preloader: true,
      cityWeather: false,
      setting: false,
      header: false,
      errorScreen: false,
      errorPopUp: false,
    });

    let keyForErrorText = ErrorTextForTemplateEnum.networkErrorText;

    const localStorageManager = LocalStorageManager.getInstance();
    const geoPositionManager = GeoPositionManager.getInstance();

    const deleteItem = (id: string, cityWithCountry: string) => {
      store.commit('deleteCitiesWeatherInfo', id);

      localStorageManager.filterCurrentCity(cityWithCountry);

      if (localStorageManager.getCurrentCities().length === 0) {
        localStorageManager.removeCurrentCity();
      }
    };

    const addItem = async (cityWithCountry: string) => {
      try {
        if (localStorageManager.isCurrentCityHaveDuplicateValue(cityWithCountry)) {
          isShow.value.errorPopUp = true;
          keyForErrorText = ErrorTextForTemplateEnum.duplicateErrorText;
          throw new Error('The weather for this city has already been specified');
        }

        keyForErrorText = ErrorTextForTemplateEnum.networkErrorText;

        await store.dispatch(
          'fetchCitiesWeatherInfo',
          {
            city: cityWithCountry,
          },
        );

        localStorageManager.mapCurrentCity(store.state.citiesWeatherInfo);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }

        if (error instanceof AxiosError) {
          isShow.value.errorPopUp = true;
        }

        setTimeout(() => {
          isShow.value.errorPopUp = false;
        }, timer.hideErrorPopUp);
      }
    };

    const moveItem = () => {
      localStorageManager.mapCurrentCity(store.state.citiesWeatherInfo);
    };

    const toggleScreen = () => {
      isShow.value.cityWeather = !isShow.value.cityWeather;
      isShow.value.setting = !isShow.value.setting;
    };

    const giveCurrentUserPositionErrorHandler = () => {
      if (!localStorageManager.getLocalStorageCities()) {
        localStorageManager.setCurrentCitiesToDefaultValue();
        localStorageManager.saveChangesInLocalStorage();
      }
    };

    const fetchCitiesInStartWidget = () => (
      localStorageManager.getCurrentCities().map(async (city) => {
        await store.dispatch(
          'fetchCitiesWeatherInfo',
          {
            city,
            lat: geoPositionManager.getCurrentPosition().lat,
            lon: geoPositionManager.getCurrentPosition().lon,
          },
        );
      })
    );

    const giveDataForCitiesList = async () => {
      try {
        await Promise.all(fetchCitiesInStartWidget());

        return true;
      } catch (error) {
        isShow.value.preloader = false;
        isShow.value.errorScreen = true;

        if (error instanceof Error) {
          console.error(error.message);
        }

        return false;
      }
    };

    const tryLoadAllData = async () => {
      const isCorrectDate = await giveDataForCitiesList();

      if (isCorrectDate) {
        if (localStorageManager.getCurrentCities().length > 1) {
          store.commit('sortCitiesInFirstLoad', localStorageManager.getCurrentCities());
        }

        isShow.value.preloader = false;
        isShow.value.cityWeather = true;
        isShow.value.header = true;

        if (!localStorageManager.getLocalStorageCities()) {
          localStorageManager.mapCurrentCity(store.state.citiesWeatherInfo);
        }
      }
    };

    const tryLoadAllDataAgain = async () => {
      isShow.value.preloader = true;
      isShow.value.errorScreen = false;

      await tryLoadAllData();
    };

    onMounted(async () => {
      await geoPositionManager.giveCurrentUserPosition(
        !localStorageManager.getLocalStorageCities(),
        giveCurrentUserPositionErrorHandler,
      );

      localStorageManager.setStartedCurrentCity();

      await tryLoadAllData();
    });

    return {
      timer,
      localStorageManager,
      geoPositionManager,
      isShow,
      keyForErrorText,
      deleteItem,
      addItem,
      moveItem,
      toggleScreen,
      giveCurrentUserPositionErrorHandler,
      fetchCitiesInStartWidget,
      giveDataForCitiesList,
      tryLoadAllData,
      tryLoadAllDataAgain,
    };
  },
});
</script>

<style lang="scss">
@import "@/css/colors";
@import "./css/transition-group";
@import "https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600&display=swap";

weather-widget {
  font-family: Teko, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-text-color;
  letter-spacing: 0.5px;
  margin-top: 60px;
  position: relative;
  display: block;
  width: 250px;
  height: 500px;
  padding: 16px;
  font-size: 20px;
  overflow: scroll;
  background-color: $main-background-color;
  border-radius: 16px;
  box-shadow: 0 0 20px -5px;
}
</style>
