<script setup>
	import axios from '../../axios.js';
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const loading = ref(false);

	const form = ref();

	const isUpdate = route.fullPath.includes('update');

	const type = ref(null);
	const name = ref('');
	const content = ref('');
	const order = ref(0);

	const items = ['Question ouverte', 'Question à choix multiple', 'Vrai/Faux', 'Curseur'];

	const typeRules =
	[
		value => { return value ? true : 'Vous devez choisir un type de question.'},
		value => { return items.includes(value) ? true : "Veuillez choisir un type de question parmi ceux disponibles."}
	];

	const contentRules =
	[
		value => { return value ? true : "Vous devez saisir un énoncé de question."}
	];

	const orderRules =
	[
		value => { return value !== undefined && value !== null && value !== '' ? true : "Vous devez saisir un ordre."},
		value => { return value >= 0 ? true : "L'ordre ne peut être négatif"}
	];

	async function validate()
	{
		const { valid } = await form.value.validate();

		if (valid)
		{
			if (!isUpdate)
			{
				addQuestion();
			}
			else
			{
				updateQuestion();
			}
		}
	}

	function addQuestion()
	{
		loading.value = true;

		axios.post('/api/question/' + route.params.idQuestionnaire, {
			// type: type.value,
			name: name.value,
			content: content.value,
			order: order.value
		})
		.then(response => {
			loading.value = false;
			console.log(response);
			window.location.href = "http://localhost:5174/questionnaire/" + route.params.idQuestionnaire;
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la création de la question :', error);
			window.location.href = "http://localhost:5174/questionnaire/" + route.params.idQuestionnaire;
		});
	}

	function updateQuestion()
	{
		loading.value = true;

		axios.put(`/api/question/${route.params.idQuestionnaire}/${route.params.id}/`,
		{
			name: name.value,
			content: content.value,
			order: order.value
		})
		.then(response => {
			loading.value = false;
			console.log(response);
			window.location.href = 'http://localhost:5174/questionnaire/' + route.params.idQuestionnaire;
		})
		.catch(error =>
		{
			loading.value = false;
			console.error('Erreur lors de la mise à jour du questionnaire.', error);
			window.location.href = 'http://localhost:5174/questionnaire/' + route.params.idQuestionnaire;
		});
	}

	onMounted(() =>
	{
		if (isUpdate)
		{
			loading.value = true;

			axios.get(`/api/question/${route.params.idQuestionnaire}/${route.params.id}`)
			.then(response =>
			{
				loading.value = false;
				console.log(response);
				name.value = response.data.name;
				content.value = response.data.content;
				order.value = response.data.order;
			})
			.catch(error =>
			{
				loading.value = false;
				console.error('Erreur lors de la récupération du questionnaire.', error);
				window.location.href = 'http://localhost:5174/questionnaire/' + route.params.idQuestionnaire;
			});
		}
	});
</script>

<template>
	<v-btn icon="mdi-arrow-left" @click="$router.back()"></v-btn>
	<v-card>
		<v-card-title v-if="!isUpdate">Création d'une question</v-card-title>
		<v-card-title v-else>Mise à jour d'une question</v-card-title>
		<v-form ref="form">
			<v-select
				v-model="type"
				:rules="typeRules"
				variant="outlined"
				label="Type de la question *"
				:items="items">
			</v-select>
			<v-text-field
				v-model="name"
				variant="outlined"
				label="Nom de la question"
				placeholder="Question n°1"
				clearable>
			</v-text-field>
			<v-text-field
				v-model="content"
				:rules="contentRules"
				variant="outlined"
				label="Énoncé de la question *"
				placeholder="Quel est la couleur du ciel ?"
				clearable>
			</v-text-field>
			<v-text-field
				v-model="order"
				:rules="orderRules"
				variant="outlined"
				label="Ordre de la question *"
				type="number"
				min="0"
				step="1"
				hint="Le numéro indique la position dans le questionnaire (ex: 0 = Pas d'ordre, 1 = Première position)">
			</v-text-field>
			<v-btn v-if="!isUpdate" @click.prevent="validate()"
				append-icon="mdi-check-circle"
				type="submit"
				:loading="loading"
				block>
				Créer la question
			</v-btn>
			<v-btn v-else @click.prevent="validate()"
				append-icon="mdi-check-circle"
				type="submit"
				:loading="loading"
				block>
				Mettre à jour la question
			</v-btn>
		</v-form>
	</v-card>
	<p class="text-red">Les champs marqués d'un astérix (*) sont obligatoires.</p>
</template>