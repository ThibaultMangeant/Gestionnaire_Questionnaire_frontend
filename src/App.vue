<script setup>
	import Account from './components/Account.vue'
	import axios from './axios.js';
	import { onMounted, ref } from 'vue';

	const user = ref('');

	onMounted(() =>
	{
		axios.get('/api/user')
		.then(response => 
		{
			user.value = response.data;
			if (user.value === '' &&
			    window.location.href !== 'http://localhost:5174/login' &&
			    window.location.href !== 'http://localhost:5174/register')
				window.location.href = 'http://localhost:5174/login'
			console.log('Utilisateur récupérée', response.data);
		})
		.catch(error =>
		{
			console.error("Erreur lors de la récupération de l'utilisateur", error);
		});
	});
</script>

<template>
<header v-if="user !== ''">
	<Account :user=user.name />
</header>

<main>
	<RouterView />
</main>

</template>