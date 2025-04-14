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
	<v-card>
		<v-toolbar>
			<v-toolbar-title>Questions</v-toolbar-title>
			<v-btn append-icon="mdi-refresh" :loading="loading" size="small" @click="fetchQuestions">Rafraîchir</v-btn>
		</v-toolbar>
		<v-list lines="two" rounded="xl" variant="tonal">
			<v-list-item
				v-for="question in questions" :key="question.id"
				v-if="questions.length > 0">
				<v-list-item-title>{{ question.name }}</v-list-item-title>
				<v-list-item-subtitle>{{ question.content }}</v-list-item-subtitle>
				<v-divider></v-divider>
			</v-list-item>
			<v-list-item v-else>
				<v-list-item-title>Aucune question trouvée</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-btn prepend-icon="mdi-plus" size="small">Ajouter une question</v-btn>
	</v-card>
</template>