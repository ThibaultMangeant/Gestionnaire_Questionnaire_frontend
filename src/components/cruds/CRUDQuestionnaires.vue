<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const questionnaires = ref([]);
	const searching = ref(false);

	const loading = ref(false);

	function fetchQuestionnaires()
	{
		searching.value = true;
		loading.value = true;

		axios.get('/questionnaires')
		.then(response => {
			searching.value = false;
			loading.value = false;
			questionnaires.value = response.data;
			console.log(response);
		})
		.catch(error => {
			searching.value = false;
			loading.value = false;
			console.error('Erreur lors de la récupération des questionnaires :', error);
		});
	}
</script>

<template>
	<div class="crud">
		<h1>Questionnaires :</h1>
		<p v-if="searching">Actualisation en cours...</p>

		<br>

		<v-btn append-icon="mdi-refresh" :loading="loading" size="small" @click="fetchQuestionnaires">Rafraîchir</v-btn>

		<br>

		<v-card
			v-for="questionnaire in questionnaires" :key="questionnaire.id"
			v-if="questionnaires.length > 0"
			:title="questionnaire.name"
			:text="questionnaire.description"
			variant="tonal">
		</v-card>
		<p v-else>Aucun questionnaire trouvé</p>

		<br>

		<v-btn prepend-icon="mdi-plus" size="small">+ Ajouter un questionnaire</v-btn>
	</div>
</template>