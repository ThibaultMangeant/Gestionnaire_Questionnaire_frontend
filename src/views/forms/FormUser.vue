<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

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
			
		}
	}
</script>

<template>
	<RouterLink to="/questionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card>
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