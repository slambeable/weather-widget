<template>
  <svg class="weather-widget-compass-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 28 28" style="enable-background:new 0 0 28 28;" xml:space="preserve">
    <g>
      <g>
        <path
          d="M14,0C6.268,0,0,6.268,0,14s6.268,14,14,14s14-6.268,14-14S21.732,0,14,0z M14,26    C7.373,26,2,20.627,2,14S7.373,2,14,2s12,5.373,12,12S20.627,26,14,26z"/>
          <path
          d="M6.222,21.777c0,0,8.838-3.183,10.606-4.949c1.768-1.768,4.949-10.606,4.949-10.606    s-8.838,3.183-10.605,4.95S6.222,21.777,6.222,21.777z M12.586,12.586l2.828,2.828c0.707,0.707-6.363,3.535-6.363,3.535    S11.879,11.879,12.586,12.586z"/>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CompassIcon',
});
</script>

<style scoped lang="scss">
.weather-widget-compass-icon {
  & path {
    fill: #030104;
  }
}
</style>
