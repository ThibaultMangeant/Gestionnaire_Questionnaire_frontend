<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const loading = ref(false);

	const type = ref('');
	const name = ref('');
	const content = ref('');
	const order = ref(0);

	function addQuestion($idQuestionnaire)
	{
		loading.value = true;

		loading.value = false;
	}
</script>

<template>
	<v-card>
		<v-form @submit.prevent="addQuestion($route.params.$idQuestionnaire)">
			<v-select
				v-model="type"
				variant="outlined"
				label="Type de la question"
				:items="['Question ouverte', 'Question à choix multiple', 'Vrai/Faux', 'Curseur']">
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
				variant="outlined"
				label="Ennoncé de la question"
				placeholder="Quel est la couleur du ciel ?"
				clearable>
			</v-text-field>
			<v-text-field
				v-model="order"
				variant="outlined"
				label="Ordre de la question"
				type="number"
				hint="1 = première question du questionnaire, 2 = deuxième, etc.">
			</v-text-field>
			<v-btn append-icon="mdi-check-circle" type="submit" :loading="loading" block>
				Créer la question
			</v-btn>
		</v-form>
	</v-card>
</template>