<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';
	import { onMounted } from 'vue';

	const loading = ref(false);

	const form = ref();

	const email = ref('');
	const password = ref('');
	const remember = ref(false);


	const emailRules =
	[
		value => { return value ? true : 'Vous devez saisir votre adresse mail.'},
		value => { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? true : "L'adresse email doit être valide"}
	];

	const passwordRules =
	[
		value => {return value ? true : 'Vous devez saisir votre mot de passe'}
	]

	async function validate()
	{
		const { valid } = await form.value.validate();

		if (valid)
		{
			loginUser();
		}
	}

	function loginUser()
	{
		loading.value = true;

		axios.post('/login',
		{
			email: email.value,
			password: password.value,
			remember: remember.value
		})
		.then(response =>
		{
			loading.value = false;
			console.log('Utilisateur connecté avec succès.')
			window.location.href = 'http://localhost:5174/questionnaire';
		})
		.catch(error =>
		{
			loading.value = false;
			console.error("Erreur lors de la connexion de l'utilisateur.", error)
		});
	}

	onMounted(() =>
	{
		axios.get('/sanctum/csrf-cookie').then(response =>
		{
			console.log("crsf-cookie récupéré.");
		})
		.catch(error =>
		{
			console.error("Erreur lors de la récupération du csrf-cookie.")
		});
	});
</script>

<template>
	<v-card title="Bienvenue !" subtitle="Connectez-vous !">
		<v-form ref="form">
			<v-text-field
				v-model="email"
				:rules="emailRules"
				variant="outlined"
				label="Adresse Email *"
				placeholder="johndoe@gmail.com"
				type="email"
				clearable
				required>
			</v-text-field>
			<v-text-field
				v-model="password"
				:rules="passwordRules"
				variant="outlined"
				label="Mot de passe *"
				type="password"
				hint="Attention à vérifier si le caps lock est activé"
				clearable
				required>
			</v-text-field>
			<v-checkbox
				v-model="remember"
				label="Se souvenir de moi">
			</v-checkbox>
			<v-divider></v-divider>
			<p>Vous n'avez pas de compte ? <RouterLink to="/register">S'inscrire</RouterLink></p>
			<v-btn @click.prevent="validate"
				append-icon="mdi-login"
				type="submit"
				:loading="loading"
				block>
				Se connecter
			</v-btn>
		</v-form>
	</v-card>
	<p class="text-red">Les champs marqués d'un astérix (*) sont obligatoires.</p>
</template>

<style scoped>
p
{
	text-align: center;
}
</style>