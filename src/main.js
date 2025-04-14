import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify
(
	{
		components,
		directives
	}
);

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
