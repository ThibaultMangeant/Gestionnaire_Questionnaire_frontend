<script setup>
	import axios from '../../axios.js';
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const isUpdate = route.fullPath.includes('update');

	const loading = ref(false);

	const form = ref();

	const name        = ref('');
	const description = ref('');


	const nameRules =
	[
		value => { return value ? true : "Vous devez saisir un nom de questionnaire."}
	]


	async function validate()
	{
		const { valid } = await form.value.validate();

		if (valid)
		{
			if (!isUpdate)
			{
				addQuestionnaire();
			}
			else
			{
				updateQuestionnaire();
			}
		}
	}

	function addQuestionnaire()
	{
		loading.value = true;

		axios.post('/api/questionnaire',
		{
			name:        name.value,
			description: description.value,
		})
		.then(response =>
		{
			loading.value = false;
			console.log(response.data);
			window.location.href = '/questionnaire';
		})
		.catch(error =>
		{
			loading.value = false;
			console.error('Erreur lors de la création du questionnaire.', error);
			window.location.href = '/questionnaire';
		});
	}
	
	function updateQuestionnaire()
	{
		loading.value = true;

		axios.put(`/api/questionnaire/${route.params.idQuestionnaire}`,
		{
			name:        name.value,
			description: description.value,
		})
		.then(response =>
		{
			loading.value = false;
			console.log(response);
			window.location.href = '/questionnaire';
		})
		.catch(error =>
		{
			loading.value = false;
			console.error('Erreur lors de la mise à jour du questionnaire.', error);
			window.location.href = '/questionnaire';
		});
	}

	onMounted(() =>
	{
		if (isUpdate)
		{
			loading.value = true;

			axios.get(`/api/questionnaire/${route.params.idQuestionnaire}`)
			.then(response =>
			{
				loading.value = false;
				console.log(response);

				name.value        = response.data.name;
				description.value = response.data.description;
			})
			.catch(error =>
			{
				loading.value = false;
				console.error('Erreur lors de la récupération du questionnaire.', error);
				window.location.href = '/questionnaire';
			});
		}
	});
</script>

<template>
	<RouterLink to="/questionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>

	<v-card>
		<v-card-title v-if="!isUpdate">Création d'un questionnaire</v-card-title>
		<v-card-title v-else>Mise à jour d'un questionnaire</v-card-title>

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

			<v-btn v-if="!isUpdate" @click.prevent="validate"
				append-icon="mdi-check-circle"
				type="submit"
				:loading="loading"
				block>
				Créer le questionnaire
			</v-btn>
			<v-btn v-else @click.prevent="validate"
				append-icon="mdi-check-circle"
				type="submit"
				:loading="loading"
				block>
				Mettre à jour le questionnaire
			</v-btn>

		</v-form>
	</v-card>
	<p class="text-red">Les champs marqués d'un astérix (*) sont obligatoires.</p>
</template>