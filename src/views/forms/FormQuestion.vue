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

	const min  = ref(0);
	const max  = ref(1);
	const step = ref(1);

	const prop1 = ref('');
	const prop2 = ref('');
	const prop3 = ref('');
	const prop4 = ref('');
	const prop5 = ref('');

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

	const minRules =
	[
		value => { return value !== undefined && value !== null && value !== '' ? true : "Vous devez saisir un minimum."}
	];

	const maxRules =
	[
		value => { return value !== undefined && value !== null && value !== '' ? true : "Vous devez saisir un maximum."},
		value => { return value > min.value ? true : "Le maximum doit être supérieur au minimum"}
	];

	const stepRules =
	[
		value => { return value !== undefined && value !== null && value !== '' ? true : "Vous devez saisir un pas."}
	];

	const propsRules =
	[
		value => { return value ? true : "Vous devez mettre cette proposition (au moins deux)"}
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
			type: type.value,
			name: name.value,
			content: content.value,
			order: order.value,
			min: min.value,
			max: max.value,
			step: step.value,
			prop1: prop1.value,
			prop2: prop2.value,
			prop3: prop3.value,
			prop4: prop4.value,
			prop5: prop5.value
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
			type: type.value,
			name: name.value,
			content: content.value,
			order: order.value,
			prop1: prop1.value,
			prop2: prop2.value,
			prop3: prop3.value,
			prop4: prop4.value,
			prop5: prop5.value,
			min: min.value,
			max: max.value,
			step: step.value
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

	function changeType()
	{
		prop1.value = '';
		prop2.value = '';
		prop3.value = '';
		prop4.value = '';
		prop5.value = '';
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
				type.value = response.data.question_type_shortcut;
				name.value = response.data.name;
				content.value = response.data.content;
				order.value = response.data.order;
				prop1.value = response.data.prop1;
				prop2.value = response.data.prop2;
				prop3.value = response.data.prop3;
				prop4.value = response.data.prop4;
				prop5.value = response.data.prop5;
				min.value = response.data.min;
				max.value = response.data.max;
				step.value = response.data.step;
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
	<RouterLink :to="'/questionnaire/' + route.params.idQuestionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card class="mt-3">
		<v-card-title v-if="!isUpdate">Création d'une question</v-card-title>
		<v-card-title v-else>Mise à jour d'une question</v-card-title>
		<v-form ref="form">
			<v-select v-if="!isUpdate"  @click="changeType()"
				v-model="type"
				:rules="typeRules"
				variant="outlined"
				label="Type de la question *"
				:items="items">
			</v-select>

			<!-- Type Cursor -->
			<div class="d-flex ga-3">
				<v-text-field v-if="type == 'Curseur'"
					v-model="min"
					:rules="minRules"
					variant="outlined"
					label="Minimum du curseur"
					type="number"
					step="1">
				</v-text-field>
				<v-text-field v-if="type == 'Curseur'"
					v-model="max"
					:rules="maxRules"
					variant="outlined"
					label="Maximum du curseur"
					type="number"
					step="1">
				</v-text-field>
				<v-text-field v-if="type == 'Curseur'"
					v-model="step"
					:rules="stepRules"
					variant="outlined"
					label="Pas du curseur"
					type="number"
					step="1">
				</v-text-field>
			</div>

			<!-- Type QCM -->
			<div class="d-flex ga-3">
				<v-text-field v-if="type == 'Question à choix multiple'"
					v-model="prop1"
					:rules="propsRules"
					variant="outlined"
					label="Proposition 1 *"
					clearable>
				</v-text-field>
				<v-text-field v-if="type == 'Question à choix multiple'"
					v-model="prop2"
					:rules="propsRules"
					variant="outlined"
					label="Proposition 2 *"
					clearable>
				</v-text-field>
			</div>
			<div class="d-flex ga-3">
				<v-text-field v-if="type == 'Question à choix multiple'"
					v-model="prop3"
					variant="outlined"
					label="Proposition 3"
					clearable>
				</v-text-field>
				<v-text-field v-if="type == 'Question à choix multiple'"
					v-model="prop4"
					variant="outlined"
					label="Proposition 4"
					clearable>
				</v-text-field>
			</div>
			<v-text-field v-if="type == 'Question à choix multiple'"
				v-model="prop5"
				variant="outlined"
				label="Proposition 5"
				clearable>
			</v-text-field>

			<!-- Any type -->
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