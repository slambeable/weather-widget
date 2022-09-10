<template>
  <div class="weather-widget-header">
    <div class="weather-widget-header__title">{{ 'Weather Widget' }}</div>
    <lottie-animation
      class="weather-widget-header__animation"
      animationLink="https://assets6.lottiefiles.com/packages/lf20_jJd3k8.json"
      style="margin: 0; cursor: pointer;"
      :height="35"
      :width="35"
      :autoPlay="false"
      :loop="false"
      :speed="3"
      ref="lottieContainer"
      @click="toggleScreen"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface LottieAnimation {
  play(): void,
  setDirection(argument: string): void,
}

export default defineComponent({
  name: 'HeaderMain',
  emits: ['toggleScreen'],
  setup(_, { emit }) {
    const lottieContainer = ref<LottieAnimation | null>(null);
    let settingButtonIsTapped = false;

    const toggleScreen = () => {
      if (settingButtonIsTapped) {
        lottieContainer.value?.setDirection('reverse');
        settingButtonIsTapped = false;
      } else {
        settingButtonIsTapped = true;
        lottieContainer.value?.setDirection('forward');
      }

      lottieContainer.value?.play();
      emit('toggleScreen');
    };

    return {
      lottieContainer,
      toggleScreen,
    };
  },
});
</script>

<style scoped lang="scss">
.weather-widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  &__title {
    font-size: 26px;
    font-weight: 500;
  }

  &__animation path {
    stroke-width: 4px !important;
  }
}
</style>
