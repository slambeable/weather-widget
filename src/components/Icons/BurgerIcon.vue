<template>
  <svg class="weather-widget-burger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g data-name="weather-widget-burger-icon-layer" id="weather-widget-burger-icon-layer">
      <path d="M28,10H4A1,1,0,0,1,4,8H28a1,1,0,0,1,0,2Z"/>
      <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
      <path d="M28,24H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>
    </g>
    <g id="frame">
      <rect class="weather-widget-burger-icon__rect" height="32" width="32"/>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BurgerIcon',
});
</script>

<style scoped lang="scss">
.weather-widget-burger-icon__rect {
  fill: none;
}
</style>
