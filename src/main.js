import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createVuetify } from 'vuetify'
import { fr } from 'vuetify/locale';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify
(
	{
		components,
		directives,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi
			}
		},
		locale:
		{
			locale: 'fr',
			messages: { fr },
		},
	}
);

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
