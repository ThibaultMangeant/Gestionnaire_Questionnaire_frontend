<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const loading = ref(false);

	const form = ref();

	const name = ref('');
	const description = ref('');

	const nameRules =
	[
		value => { return value ? true : "Vous devez saisir un nom de questionnaire."}
	]

	async function validate()
	{
		const { valid } = await form.value.validate();

		if (valid)
			addQuestionnaire();
	}

	function addQuestionnaire()
	{
		loading.value = true;

		axios.post('/api/questionnaire',
		{
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
	<RouterLink to="/questionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card>
		<v-form ref="form">
			<v-text-field
				v-model="name"
				:rules="nameRules"
				variant="outlined"
				label="Nom du questionnaire *"
				clearable
				required>
			</v-text-field>
			<v-textarea
				v-model="description"
				variant="outlined"
				label="Description du questionnaire"
				clearable>
			</v-textarea>
			<v-btn @click.prevent="validate"
				append-icon="mdi-check-circle"
				type="submit"
				:loading="loading"
				block>
				Créer le questionnaire
			</v-btn>
		</v-form>
	</v-card>
	<p class="text-red">Les champs marqués d'un astérix (*) sont obligatoires.</p>
</template>