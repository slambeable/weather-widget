<template>
  <div class="weather-widget-error-pop-up">{{ keyForErrorText }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ErrorTextForTemplateEnum from '@/constants/errors/ErrorTextForTemplateEnum';

export default defineComponent({
  name: 'ErrorPopUp',
  props: {
    keyForErrorText: {
      require: true,
      type: String as PropType<ErrorTextForTemplateEnum>,
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/css/colors";

.weather-widget-error-pop-up {
  position: absolute;
  top: 205px;
  left: 50%;
  transform: translate(-50%);
  padding: 8px;
  border-radius: 12px;
  background-color: $bg-error-color;
  pointer-events: none;
  color: $text-error-color;
}
</style>
