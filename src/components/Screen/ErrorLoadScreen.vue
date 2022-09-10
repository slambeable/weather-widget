<template>
  <div class="weather-widget-error-load">
    <property-button
      class="weather-widget-error-load__button"
      @click="tryLoadAllDataAgain"
    >
      {{ 'Try again' }}
    </property-button>
    <div
      class="weather-widget-error-load__text"
    >{{ 'Something wrong, press button to try again' }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PropertyButton from '../UI/PropertyButton.vue';

export default defineComponent({
  name: 'ErrorLoadScreen',
  components: {
    PropertyButton,
  },
  emits: ['tryLoadAllDataAgain'],
  setup(_, { emit }) {
    const tryLoadAllDataAgain = () => {
      emit('tryLoadAllDataAgain');
    };

    return {
      tryLoadAllDataAgain,
    };
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";

.weather-widget-error-load {
  &__button {
    width: 100px;
    height: 50px;
    margin-bottom: 10px;
  }
}
</style>
