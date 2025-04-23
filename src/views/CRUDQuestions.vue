<script setup>
	import axios from '../axios.js';
	import { onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { ref } from 'vue';

	const route = useRoute();

	const questions = ref([]);

	const loading = ref(false);

	const headers =
	[
		{ title: 'Nom', key: 'name'},
		{ title: 'Énoncé', key: 'content' },
		{ title: 'Ordre', key: 'order'},
		{ title: 'Actions', key: 'actions', sortable: false}
	]

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

<!-- <template>
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
</template> -->

<template>
	<h1>Questions</h1>
	<div class="text-right my-4">
		<RouterLink to="/questionnaire">
			<v-btn icon="mdi-arrow-left"></v-btn>
		</RouterLink>
		<RouterLink :to="'/questionnaire/add/' + $route.params.idQuestionnaire">
			<v-btn prepend-icon="mdi-plus" size="small" variant="outlined">
				Ajouter une question
			</v-btn>
		</RouterLink>
	</div>
	<div class="mt-4 position-relative">
		<v-data-table :items="questions" :loading="loading" :headers="headers">
			<template v-slot:item.name="{ value }">
				<v-chip
					:text="value"
					border="thin opacity-25"
					prepend-icon="mdi-file-question"
					label>
				</v-chip>
			</template>
			<template v-slot:item.actions="{ item }">
				<div class="d-flex ga-2 justify-end">
					<v-icon style="color:#499ca5" icon="mdi-pencil" @click="updateQuestion(item)"></v-icon>

					<v-icon color="red" icon="mdi-delete" @click="deleteQuestion(item)"></v-icon>
				</div>
			</template>
			<template v-slot:no-data>
				<p>Aucune question trouvée</p>
			</template>
		</v-data-table>
	</div>
</template>