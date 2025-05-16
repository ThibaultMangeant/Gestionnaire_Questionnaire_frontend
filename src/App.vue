<script setup>
	import Account from './components/Account.vue'
	import axios from './axios.js';
	import { onMounted, ref } from 'vue';


	const user = ref('');

	const rail   = ref(true);
	const drawer = ref(true);

	onMounted(() =>
	{
		axios.get('/api/user')
		.then(response => 
		{
			user.value = response.data;
			console.log("Utilisateur récupérée", response.data);
		})
		.catch(error =>
		{
			console.error("Erreur lors de la récupération de l'utilisateur.", error);
		});
	});
</script>

<template>
<!-- Header horizontale en haut -->
<v-toolbar density="compact" class="border position-fixed d-flex left-0 top-0" color="white" style="height:97px">
	<template v-slot:append>
		<div class="d-flex flex-fill ga-6">
			<v-btn
				icon="mdi-chat"
				color="grey">
			</v-btn>

			<v-btn
				icon="mdi-bell"
				color="grey">
			</v-btn>

			<v-divider vertical></v-divider>

			<Account v-if="user !== ''" :user=user.name />
		</div>
	</template>
</v-toolbar>

<!-- Barre de navigation verticale à gauche -->
<v-card>
	<v-layout>
		<v-navigation-drawer class="border" style="background-color:#499ca5" v-model="drawer" :rail="rail" permanent>
			<v-list density="compact" nav>
				<v-list-item prepend-icon="mdi-home"></v-list-item>
				<v-list-item prepend-icon="mdi-forum"></v-list-item>
				<v-list-item prepend-icon="mdi-file-document-check"></v-list-item>
				<v-list-item prepend-icon="mdi-map-marker"></v-list-item>
				<v-list-item prepend-icon="mdi-chart-bar"></v-list-item>
			</v-list>
		</v-navigation-drawer>
	</v-layout>
</v-card>

<main>
	<RouterView />
</main>

</template>