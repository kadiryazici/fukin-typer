import '/src/styles/global.scss';

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
