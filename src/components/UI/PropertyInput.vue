<template>
  <input
    class="weather-widget-input"
    type="text"
    aria-label="Search"
    :placeholder="'City, Country'"
    v-model.trim="currentValue"
    @keydown="addItemKeydownHandler"
    @input="addItemInputHandler"
  />
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';

export default defineComponent({
  name: 'PropertyInput',
  emits: ['addItem', 'update:modelValue'],
  setup(_, { emit }) {
    const currentValue = ref('');

    const addItemKeydownHandler = ({ key }: KeyboardEvent) => {
      if (key === 'Enter') {
        emit('addItem', currentValue.value.toLocaleLowerCase());
      }
    };

    const addItemInputHandler = ({ target }: Event) => {
      emit('update:modelValue', (target as HTMLInputElement).value ?? 0);
    };

    return {
      currentValue,
      addItemKeydownHandler,
      addItemInputHandler,
    };
  },
});
</script>

<style scoped lang="scss">
@use "sass:color";
@import "@/css/colors";

.weather-widget-input {
  box-sizing: border-box;
  width: 160px;
  background-color: $bg-input-color;
  font: inherit;
  box-shadow: none;
  border: 0;
  outline: 0;
  padding: 8px 18px;
  height: 36px;
  transition: all 200ms ease-in;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: 0 6px 10px 0 $default-shadow-lighten-color;
    }
  }

  &:focus {
    background-color: color.adjust($bg-input-color, $blackness: 5%);
    box-shadow: 0 6px 10px 0 $default-shadow-lighten-color;
  }
}
</style>
