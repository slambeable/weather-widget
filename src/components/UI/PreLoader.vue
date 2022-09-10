<template>
  <div class="weather-widget-roller">
    <div
      v-for="index in 8"
      :key="`weather-widget-roller--${index}`"
      :class="[
        'weather-widget-roller__dot',
        `weather-widget-roller__dot--${index}`,
      ]"
    >
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'PreLoader',
});
</script>

<style scoped lang="scss">
@import "@/css/colors";
@import "@/css/keyframes";

.weather-widget-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  &__dot {
    animation: weather-widget-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;

    &::after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: $bg-loader-color;
      margin: -4px 0 0 -4px;
    }

    &--1 {
      animation-delay: -0.036s;

      &::after {
        top: 63px;
        left: 63px;
      }
    }

    &--2 {
      animation-delay: -0.072s;

      &::after {
        top: 68px;
        left: 56px;
      }
    }

    &--3 {
      animation-delay: -0.108s;

      &::after {
        top: 71px;
        left: 48px;
      }
    }

    &--4 {
      animation-delay: -0.144s;

      &::after {
        top: 72px;
        left: 40px;
      }
    }

    &--5 {
      animation-delay: -0.18s;

      &::after {
        top: 71px;
        left: 32px;
      }
    }

    &--6 {
      animation-delay: -0.216s;

      &::after {
        top: 68px;
        left: 24px;
      }
    }

    &--7 {
      animation-delay: -0.252s;

      &::after {
        top: 63px;
        left: 17px;
      }
    }

    &--8 {
      animation-delay: -0.288s;

      &::after {
        top: 56px;
        left: 12px;
      }
    }
  }
}
</style>
