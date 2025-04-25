<script setup>
	import { onMounted } from 'vue'
	import axios from '../axios.js';
	import { ref } from 'vue';


	const questionnaires = ref([]);

	const loading = ref(false);

	const headers =
	[
		{ title: 'Nom', key: 'name'},
		{ title: 'Description', key: 'description' },
		{ title: 'Actions', key: 'actions', align: 'center', sortable: false}
	]

	function fetchQuestionnaires()
	{
		loading.value = true;

		axios.get('/api/questionnaire')
		.then(response => {
			loading.value = false;
			questionnaires.value = response.data;
			console.log(response);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la récupération des questionnaires :', error);
		});
	}
	
	function updateQuestionnaire(questionnaire)
	{

	}

	function deleteQuestionnaire(questionnaire)
	{
		axios.delete(`/api/questionnaire/${questionnaire.id}`)
		.then(response => {
			console.log('Questionnaire supprimé avec succès', response.data)
			questionnaires.value = questionnaires.value.filter(q => q.id !== questionnaire.id)
		})
		.catch(error => {
			console.error('Erreur lors de la suppression', error)
		});
	}

	onMounted(() =>
	{
		fetchQuestionnaires();
	});
</script>

<template>
	<h1>Questionnaires</h1>
	<div class="text-right my-4">
		<RouterLink to="/questionnaire/add">
			<v-btn prepend-icon="mdi-plus" size="small" variant="outlined">
				Ajouter un questionnaire
			</v-btn>
		</RouterLink>
	</div>
	<div class="mt-4 position-relative">
		<v-data-table :items="questionnaires" :loading="loading" :headers="headers">
			<template v-slot:item.name="{ item }">
				<RouterLink :to="'/questionnaire/' + item.id">
					<v-chip
						:text="item.name"
						border="thin opacity-25"
						prepend-icon="mdi-file-document"
						label>
					</v-chip>
				</RouterLink>
			</template>
			<template v-slot:item.actions="{ item }">
				<div class="d-flex ga-2 justify-end">
					<RouterLink :to="'/questionnaire/update/' + item.id">
						<v-icon icon="mdi-pencil"></v-icon>
					</RouterLink>

					<v-icon color="red" icon="mdi-delete" @click="deleteQuestionnaire(item)"></v-icon>

					<RouterLink :to="'/questionnaire/link/' + item.id">
						<v-icon color="black" icon="mdi-share-variant"></v-icon>
					</RouterLink>
				</div>
			</template>
			<template v-slot:no-data>
				<p>Aucun questionnaire trouvé</p>
			</template>
		</v-data-table>
	</div>
</template>