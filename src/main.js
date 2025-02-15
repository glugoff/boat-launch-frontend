import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';  // Импортируем Pinia

const app = createApp(App);

app.use(createPinia());  // Добавляем Pinia

app.mount('#app');