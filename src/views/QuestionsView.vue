<script>
	// Importation de l'instance Axios configurée
	import axios from '../axios.js';

	export default
	{
		data()
		{
			return {
			questions: [],  // Tableau pour stocker les questions
			};
		},
		mounted()
		{
			axios.get('/questions')
			.then(response => {
				this.questions = response.data;
				console.log(this.questions);
			})
			.catch(error => {
				console.error('Erreur lors de la récupération des questions :', error);
			});
		},
};
</script>

<template>
	<div>
	<h1>Liste des Questions</h1>
	<ul>
		<li v-for="question in questions" :key="question.id">{{ question.title }}</li>
	</ul>
	</div>
</template>