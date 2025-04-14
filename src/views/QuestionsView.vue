<script setup>
	import axios from '../axios.js';
	import { ref, onMounted } from 'vue';

	const questions = ref([]);

	function fetchQuestions()
	{
		axios.get('/questions')
		.then(response => {
			questions.value = response.data;
			console.log(response);
		})
		.catch(error => {
			console.error('Erreur lors de la récupération des questions :', error);
		});
	}

</script>

<template>
	<div>
	<h1>Liste des Questions</h1>
	<ul>
		<li v-for="question in questions" :key="question.id">{{ question.name }}</li>
	</ul>
	<button @click="fetchQuestions">Cliquer pour lancer la recherche !</button>
	</div>
</template>