<template>
  <svg class="weather-widget-delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <g data-name="weather-widget-delete-icon-layer" id="weather-widget-delete-icon-layer">
      <path d="M20,29H12a5,5,0,0,1-5-5V12a1,1,0,0,1,2,0V24a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V12a1,1,0,0,1,2,0V24A5,5,0,0,1,20,29Z"/>
      <path d="M26,9H6A1,1,0,0,1,6,7H26a1,1,0,0,1,0,2Z"/>
      <path d="M20,9H12a1,1,0,0,1-1-1V6a3,3,0,0,1,3-3h4a3,3,0,0,1,3,3V8A1,1,0,0,1,20,9ZM13,7h6V6a1,1,0,0,0-1-1H14a1,1,0,0,0-1,1Z"/>
      <path d="M14,23a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v7A1,1,0,0,1,14,23Z"/>
      <path d="M18,23a1,1,0,0,1-1-1V15a1,1,0,0,1,2,0v7A1,1,0,0,1,18,23Z"/>
    </g>
    <g id="frame">
      <rect class="weather-widget-delete-icon__rect" height="32" width="32"/>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteIcon',
});
</script>

<style scoped lang="scss">
@import "@/css/colors";

.weather-widget-delete-icon {
  &__rect {
    fill: none;
  }

  & path {
    fill: $icon-delete-color !important;
  }
}
</style>
