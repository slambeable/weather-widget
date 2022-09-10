<template>
  <div class="weather-widget-property">
    <sortable
      v-if="$store.state.citiesWeatherInfo"
      :list="$store.state.citiesWeatherInfo"
      item-key="id"
      :options="{
        handle: '.weather-widget-property-item__drag',
        animation: 150,
      }"
      @end="moveItemInArray($store.state.citiesWeatherInfo, $event.oldIndex, $event.newIndex)"
    >
      <template #item="{ element }">
        <property-item-vue
          class="weather-widget-property__item"
          @deleteItem="deleteItem(element.id, `${element.city}, ${element.country}`)"
        >{{ `${element.city}, ${element.country}` }}</property-item-vue>
      </template>
    </sortable>
    <div class="weather-widget-property-container">
      <property-input-vue
        class="weather-widget-property-container__input"
        v-model="cityAndCountyInputText"
        @addItem="addItemInputHandler"
      />
      <property-button
        class="weather-widget-property-container__button"
        @addItemButtonHandler="addItemButtonHandler"
      >{{ 'Add city' }}</property-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PropertyInputVue from '../UI/PropertyInput.vue';
import PropertyItemVue from '../UI/PropertyItem.vue';
import PropertyButton from '../UI/PropertyButton.vue';

export default defineComponent({
  name: 'PropertyScreen',
  emits: ['deleteItem', 'addItem', 'moveItem'],
  components: {
    PropertyInputVue,
    PropertyItemVue,
    PropertyButton,
  },
  setup(_, { emit }) {
    const cityAndCountyInputText = ref('');

    const deleteItem = (id: string, cityWithCountry: string) => {
      emit('deleteItem', id, cityWithCountry);
    };

    const addItemInputHandler = (cityWithCountry: string) => {
      emit('addItem', cityWithCountry);
    };

    const addItemButtonHandler = () => {
      emit('addItem', cityAndCountyInputText.value);
    };

    const moveItemInArray = <T, >(items: T[], from: number, to: number) => {
      const item = items.splice(from, 1)[0];
      items.splice(to, 0, item);

      emit('moveItem');
    };

    return {
      cityAndCountyInputText,
      deleteItem,
      addItemInputHandler,
      moveItemInArray,
      addItemButtonHandler,
    };
  },
});
</script>

<style scoped lang="scss">
.weather-widget-property {
  &-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
