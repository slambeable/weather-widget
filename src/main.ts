import { createApp } from 'vue';
import { Sortable } from 'sortablejs-vue3';
import Vue3Lottie from 'vue3-lottie';
import App from './App.vue';
import store from './store';
import 'vue3-lottie/dist/style.css';

const app = createApp(App)
  .use(store)
  .use(Vue3Lottie, { name: 'lottie-animation' });

app.config.globalProperties.$store = store;
app
  // eslint-disable-next-line vue/multi-word-component-names
  .component('sortable', Sortable);

app.mount('weather-widget');
