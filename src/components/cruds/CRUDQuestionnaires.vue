<script setup>
	import axios from '../../axios.js';
	import { ref } from 'vue';

	const questionnaires = ref([]);
	const recherche = ref(false);

	function fetchQuestionnaires()
	{
		recherche.value = true;

		axios.get('/questionnaires')
		.then(response => {
			recherche.value = false;
			questionnaires.value = response.data;
			console.log(response);
		})
		.catch(error => {
			recherche.value = false;
			console.error('Erreur lors de la récupération des questionnaires :', error);
		});
	}
</script>

<template>
	<div class="crud">
		<h1>Questionnaires :</h1>
		<p v-if="recherche">Actualisation en cours...</p>

		<br>

		<button @click="fetchQuestionnaires">Actualiser</button>

		<br>

		<div class="questionnaire" v-if="questionnaires.length > 0" v-for="questionnaire in questionnaires" :key=questionnaire.id>
			{{ questionnaire.name }}<br>{{ questionnaire.description }}
		</div>
		<p v-else>Aucun questionnaire trouvé</p>

		<br>

		<button>+ Ajouter un questionnaire</button>
	</div>
</template>

<style scoped>
.crud
{
	border: solid whitesmoke 1px;
}

.questionnaire
{
	border: solid whitesmoke 1px;
}

button
{
	background-color:hsla(160, 100%, 37%, 1);
	text-align: center;
}
</style>