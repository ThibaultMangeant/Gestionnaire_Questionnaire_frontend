<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const loading = ref(false);

	const form = ref();

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
		value => { return value ? true : "Vous devez saisir un ordre."},
		value => { return value >= 0 ? true : "L'ordre ne peut être négatif"}
	];

	async function validate($idQuestionnaire)
	{
		const { valid } = await form.value.validate();

		if (valid)
			addQuestion($idQuestionnaire);
	}

	function addQuestion(idQuestionnaire)
	{
		loading.value = true;

		axios.post('/questions/' + idQuestionnaire, {
			// type: type.value,
			name: name.value,
			content: content.value,
			order: order.value
		})
		.then(response => {
			loading.value = false;
			console.log(response);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la création de la question :', error);
		});
	}
</script>

<template>
	<RouterLink :to="'/questionnaires/' + $route.params.idQuestionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card>
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
			<v-btn @click.prevent="validate($route.params.idQuestionnaire)"
				append-icon="mdi-check-circle"
				type="submit"
				:loading="loading"
				block>
				Créer la question
			</v-btn>
		</v-form>
	</v-card>
	<p class="text-red">Les champs marqués d'un astérix (*) sont obligatoires.</p>
</template>