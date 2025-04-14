<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const questions = ref([]);
	const recherche = ref(false);

	function fetchQuestions()
	{
		recherche.value = true;

		axios.get('/questions')
		.then(response => {
			recherche.value = false;
			questions.value = response.data;
			console.log(response);
		})
		.catch(error => {
			recherche.value = false;
			console.error('Erreur lors de la récupération des questions :', error);
		});

		
	}
</script>

<template>
	
	<div class="crud">
		<h1>Questions :</h1>
		<p v-if="recherche">Actualisation en cours...</p>
		<br>

		<button @click="fetchQuestions">Actualiser</button>

		<br>

		<div class="question" v-if="questions.length > 0" v-for="question in questions" :key=question.id>
			{{ question.name }}<br>{{ question.description }}
		</div>
		<p v-else>Aucune question trouvée</p>

		<br>

		<button>+ Ajouter une question</button>
	</div>
</template>

<style scoped>
.crud
{
	border: solid whitesmoke 1px;
}

.question
{
	border: solid whitesmoke 1px;
}

button
{
	background-color:hsla(160, 100%, 37%, 1);
	text-align: center;
}
</style>