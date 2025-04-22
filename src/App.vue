<script setup>
	import Welcome from './components/Welcome.vue'
	import axios from './axios.js';
	import { onMounted, ref } from 'vue';

	const user = ref('');

	function logout()
	{
		axios.post('/logout')
		.then(response =>
		{
			window.location.href = 'http://localhost:5174/user/authentificate'
			console.log('Déconnexion réussi.');
		})
		.catch(error =>
		{
			console.error('Erreur lors de la déconnexion.', error);
		});
	}

	onMounted(() =>
	{
		axios.get('/api/user')
		.then(response => 
		{
			user.value = response.data;
			if (user.value === '' &&
			    window.location.href !== 'http://localhost:5174/user/authentificate' &&
			    window.location.href !== 'http://localhost:5174/user/register')
				window.location.href = 'http://localhost:5174/user/authentificate'
			console.log('Utilisateur récupérée', response.data);
		})
		.catch(error =>
		{
			console.error("Erreur lors de la récupération de l'utilisateur", error);
		});
	});
</script>

<template>
<header>
	<RouterLink to="/user/authentificate">
		<v-btn
			icon="mdi-account">
		</v-btn>
	</RouterLink>
	<RouterLink to="/user/register">
		<v-btn
			icon="mdi-account-plus">
		</v-btn>
	</RouterLink>
	<v-btn @click="logout"
		icon="mdi-logout">
	</v-btn>
	<Welcome :user=user.name />
</header>

<main>
	<RouterView />
</main>

</template>