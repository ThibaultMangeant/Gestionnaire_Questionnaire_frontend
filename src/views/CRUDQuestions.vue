<script setup>
	import axios from '../axios.js';
	import { ref, onMounted } from 'vue'
	import { useRoute } from 'vue-router'

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

	function fetchQuestions()
	{
		loading.value = true;

		axios.get('/api/question/' + route.params.idQuestionnaire)
		.then(response => {
			loading.value = false;
			questions.value = response.data;
			console.log(response);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la récupération des questions.', error);
		});
	}

	function deleteQuestion(question)
	{
		loading.value = true;

		axios.delete(`/api/question/${route.params.idQuestionnaire}/${question.id}`)
		.then(response => {
			loading.value = false;
			console.log('Question supprimée avec succès.', response.data)
			questions.value = questions.value.filter(q => q.id !== question.id)
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la suppression.', error)
		});
	}

	onMounted(() =>
	{
		fetchQuestions()
	});
</script>

<template>
	<v-btn icon="mdi-arrow-left" @click="$router.back()"></v-btn>
	<h1>Questions</h1>

	<!-- Bouton Add -->
	<div class="text-right my-4">
		<RouterLink :to="'/questionnaire/add/' + $route.params.idQuestionnaire">
			<v-btn prepend-icon="mdi-plus" size="small" variant="outlined">
				Ajouter une question
			</v-btn>
		</RouterLink>
	</div>

	<!-- Table Data -->
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
						<v-tooltip location="top" text="Modifier">
							<template v-slot:activator="{ props }">
								<v-icon v-bind="props" icon="mdi-pencil"></v-icon>
							</template>
						</v-tooltip>
					</RouterLink>

					<v-tooltip location="top" text="Supprimer">
						<template v-slot:activator="{ props }">
							<v-icon v-bind="props" color="red" icon="mdi-delete" @click="deleteQuestion(item)"></v-icon>
						</template>
					</v-tooltip>
				</div>
			</template>
			<template v-slot:no-data>
				<p>Aucune question trouvée</p>
			</template>
		</v-data-table>
	</div>
</template>