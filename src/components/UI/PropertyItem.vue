<template>
  <div
    :class="[
      'weather-widget-property-item',
      { 'weather-widget-property-item--on': isShow }
    ]"
    @transitionend="transitionendItem"
  >
    <div class="weather-widget-property-item-container">
      <burger-icon class="weather-widget-property-item__drag" />
      <div class="weather-widget-property-item__title"><slot></slot></div>
      <delete-icon
        class="weather-widget-property-item__delete"
        @click="deleteItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';
// eslint-disable-next-line import/no-unresolved
import { BurgerIcon, DeleteIcon } from '@/components/Icons/index';

export default defineComponent({
  name: 'PropertyItem',
  components: {
    BurgerIcon,
    DeleteIcon,
  },
  emits: ['deleteItem'],
  setup(_, { emit }) {
    const isShow = ref(false);

    const transitionendItem = () => {
      if (!isShow.value) {
        emit('deleteItem');
      }
    };

    const deleteItem = () => {
      isShow.value = false;
    };

    return {
      isShow,
      transitionendItem,
      deleteItem,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true;
    }, 100);
  },
});
</script>

<style scoped lang="scss">
@import "@/css/colors";

.weather-widget-property-item {
  background: $bg-items-color;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  margin: 20px;

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
  }

  &:not(&--on) {
    pointer-events: none;
  }

  &--on {
    opacity: 1;
  }

  &__drag,
  &__delete {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }

  &__title {
    height: 25px;
  }
}
</style>
