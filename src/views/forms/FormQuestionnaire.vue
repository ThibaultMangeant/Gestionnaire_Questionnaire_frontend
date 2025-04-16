<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const loading = ref(false);

	const usermail = ref('');
	const name = ref('');
	const description = ref('');

	function addQuestionnaire()
	{
		loading.value = true;

		axios.post('/questionnaires',
		{
			usermail: usermail.value,
			name: name.value,
			description: description.value
		})
		.then(response => {
			loading.value = false;
			console.log(response);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la création du questionnaire :', error);
		});;
	}
</script>

<template>
	<RouterLink to="/questionnaires">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card>
		<v-form @submit.prevent="addQuestionnaire">
			<v-text-field
				v-model="usermail"
				variant="outlined"
				label="Adresse Email"
				placeholder="johndoe@gmail.com"
				type="email"
				clearable>
			</v-text-field>
			<v-text-field
				v-model="name"
				variant="outlined"
				label="Nom du questionnaire"
				clearable>
			</v-text-field>
			<v-textarea
				v-model="description"
				variant="outlined"
				label="Description du questionnaire"
				clearable>
			</v-textarea>
			<v-btn append-icon="mdi-check-circle" type="submit" :loading="loading" block>
				Créer le questionnaire
			</v-btn>
		</v-form>
	</v-card>
</template>