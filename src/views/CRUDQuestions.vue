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
		{ title: 'Actions', key: 'actions', align: 'center', sortable: false}
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
		axios.delete(`/api/question/${route.params.idQuestionnaire}/${question.id}`)
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
	});
</script>

<template>
	<RouterLink to="/questionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<h1>Questions</h1>
	<div class="text-right my-4">
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
					<RouterLink :to="'/questionnaire/' + $route.params.idQuestionnaire + '/update/' + item.id">
						<v-icon icon="mdi-pencil"></v-icon>
					</RouterLink>

					<v-icon color="red" icon="mdi-delete" @click="deleteQuestion(item)"></v-icon>
				</div>
			</template>
			<template v-slot:no-data>
				<p>Aucune question trouvée</p>
			</template>
		</v-data-table>
	</div>
</template>