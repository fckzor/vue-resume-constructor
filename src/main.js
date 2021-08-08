import { createApp } from 'vue';
import App from './App.vue';
import AppButton from './components/AppButton.vue';
import AppLoader from './components/AppLoader.vue';
import './theme.css';

const app = createApp(App);
app.component('app-button', AppButton);
app.component('app-loader', AppLoader);
app.mount('#app');