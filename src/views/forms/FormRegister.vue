<script setup>
	import axios from '../../axios.js';
	import { ref, onMounted } from 'vue';

	const loading = ref(false);

	const form = ref();

	const name = ref('');
	const email = ref('');
	const password = ref('');
	const confirmPassword = ref('');

	const showPassword = ref(false);


	const nameRules =
	[
		value => { return value ? true : "Vous devez saisir un nom d'utilisateur"}
	]
	const emailRules =
	[
		value => { return value ? true : 'Vous devez saisir une adresse mail.'},
		value => { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? true : "L'adresse email doit être valide"}
	];

	const passwordRules =
	[
		value => {return value ? true : 'Vous devez saisir un mot de passe'}
	]

	const confirmPasswordRules =
	[
		value => {return value === password.value ? true : "Le mot de passe n'est pas identique."}
	]

	async function validate()
	{
		const { valid } = await form.value.validate();

		if (valid)
		{
			registerUser();
		}
	}

	function registerUser()
	{
		loading.value = true;

		axios.post('/register',
		{
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: confirmPassword.value
		})
		.then(response =>
		{
			loading.value = false;
			console.log('Utilisateur enregistré avec succès.', response.data);
			window.location.href = 'http://localhost:5174/questionnaire';
		})
		.catch(error =>
		{
			loading.value = false;
			console.error("Erreur lors de l'enregistrement de l'utilisateur.", error)
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
	<v-card title="Inscription">
		<v-form ref="form">
			<v-text-field
				v-model="name"
				:rules="nameRules"
				variant="outlined"
				label="Nom d'utilisateur *"
				prepend-inner-icon="mdi-account"
				placeholder="John doe"
				clearable
				required>
			</v-text-field>
			<v-text-field
				v-model="email"
				:rules="emailRules"
				variant="outlined"
				label="Adresse Email *"
				prepend-inner-icon="mdi-email"
				placeholder="johndoe@gmail.com"
				type="email"
				clearable
				required>
			</v-text-field>
			<v-text-field @click:append-inner="showPassword = !showPassword"
				v-model="password"
				:rules="passwordRules"
				variant="outlined"
				label="Mot de passe *"
				prepend-inner-icon="mdi-lock"
				:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPassword ? 'text' : 'password'"
				hint="Attention à vérifier si le caps lock est activé"
				required>
			</v-text-field>
			<v-text-field
				v-model="confirmPassword"
				:rules="confirmPasswordRules"
				variant="outlined"
				label="Confirmation du mot de passe *"
				prepend-inner-icon="mdi-lock-check"
				type="password"
				hint="Vérifier si le caps lock est activé !"
				clearable
				required>
			</v-text-field>
			<v-divider></v-divider>
			<p>Vous avez déjà un compte ? <RouterLink to="/login">Se connecter</RouterLink></p>
			<v-btn @click.prevent="validate"
				append-icon="mdi-login-variant"
				type="submit"
				:loading="loading"
				block>
				S'inscrire
			</v-btn>
		</v-form>
	</v-card>
	<p class="text-red">Les champs marqués d'un astérix (*) sont obligatoires.</p>
</template>