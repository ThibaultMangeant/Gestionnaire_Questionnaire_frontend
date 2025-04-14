<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const questions = ref([]);
	const searching = ref(false);

	const loading = ref(false)

	function fetchQuestions()
	{
		searching.value = true;
		loading.value = true;

		axios.get('/questions')
		.then(response => {
			searching.value = false;
			loading.value = false;
			questions.value = response.data;
			console.log(response);
		})
		.catch(error => {
			searching.value = false
			loading.value = false;
			console.error('Erreur lors de la récupération des questions :', error);
		});

		
	}
</script>

<template>
	
	<div class="crud">
		<h1>Questions :</h1>
		<p v-if="searching">Actualisation en cours...</p>
		<br>

		<v-btn append-icon="mdi-refresh" :loading="loading" size="small" @click="fetchQuestions">Actualiser</v-btn>

		<br>

		<v-card
			v-for="question in questions" :key="question.id"
			v-if="questions.length > 0"
			:title="question.name"
			:text="question.content"
			variant="tonal">
		</v-card>
		<p v-else>Aucune question trouvée</p>

		<br>

		<v-btn prepend-icon="mdi-plus" size="small">Ajouter une question</v-btn>
	</div>
</template>