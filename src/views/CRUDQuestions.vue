<script setup>
	import axios from '../axios.js';
	import { onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { ref } from 'vue';

	const route = useRoute();

	const questions = ref([]);

	const loading = ref(false);

	function fetchQuestions(idQuestionnaire)
	{
		loading.value = true;

		axios.get('/api/question/' + idQuestionnaire)
		.then(response => {
			loading.value = false;
			questions.value = response.data;
			console.log(response);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la récupération des questions :', error);
		});
	}

	function updateQuestion(question)
	{

	}

	function deleteQuestion(question)
	{
		axios.delete(`/api/question/${question.id}`)
		.then(response => {
			console.log('Question supprimée avec succès', response.data)
			questions.value = questions.value.filter(q => q.id !== question.id)
		})
		.catch(error => {
			console.error('Erreur lors de la suppression', error)
		});
	}

	onMounted(() =>
	{
		fetchQuestions(route.params.idQuestionnaire)
	})
</script>

<template>
	<RouterLink to="/questionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card>
		<v-toolbar>
			<v-toolbar-title>Questions</v-toolbar-title>
			<v-btn append-icon="mdi-refresh" :loading="loading" size="small" @click="fetchQuestions($route.params.idQuestionnaire)">
				Rafraîchir
			</v-btn>
		</v-toolbar>
		<v-list lines="two" variant="tonal">
			<v-list-item
				v-for="question in questions" :key="question.id"
				v-if="questions.length > 0">
				<v-list-item-title>{{ question.name }}</v-list-item-title>
				<v-list-item-subtitle>{{ question.content }}</v-list-item-subtitle>
				<template v-slot:append>
					<v-btn @click="updateQuestion(question)"
						icon="mdi-pencil"
						variant="text"
					></v-btn>
					<v-btn @click="deleteQuestion(question)"
						color="red"
						icon="mdi-close-circle"
						variant="text"
					></v-btn>
				</template>
				<v-divider></v-divider>
			</v-list-item>
			<v-list-item v-else>
				<v-list-item-title>Aucune question trouvée</v-list-item-title>
			</v-list-item>
		</v-list>

		<RouterLink :to="'/questionnaire/add/' + $route.params.idQuestionnaire">
			<v-btn prepend-icon="mdi-plus" size="small">
				Ajouter une question
			</v-btn>
		</RouterLink>
	</v-card>
</template>