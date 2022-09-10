<template>
  <button class="weather-widget-button"
    @click="addItemButtonHandler"
  ><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PropertyButton',
  emits: ['addItemButtonHandler'],
  setup(_, { emit }) {
    const addItemButtonHandler = () => {
      emit('addItemButtonHandler');
    };

    return {
      addItemButtonHandler,
    };
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/css/colors";

.weather-widget-button {
  display: inline-block;
  box-sizing: border-box;
  height: 36px;
  background-color: $bg-button-color;
  color: $text-button-color;
  font: inherit;
  box-shadow: 0 0 10px 2px $default-shadow-lighten-color;
  border: 0;
  outline: 0;
  padding: 5px 12px;
  transition: all 200ms ease-in;
  border-radius: 2px;
  cursor: pointer;
  text-transform: uppercase;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: color.adjust($bg-button-color, $lightness: 10%);
      box-shadow: inset 0 0 10px 2px $default-shadow-darkness-color;
    }
  }

  &:active {
    background: #7f8ff4;
    box-shadow: inset 0 0 10px 2px $default-shadow-darkness-color;
  }
}
</style>
