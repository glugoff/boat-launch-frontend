import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';  // Импортируем Pinia
import 'leaflet/dist/leaflet.css';

const app = createApp(App);

app.use(createPinia());  // Добавляем Pinia

app.mount('#app');