<script setup>
	import { onMounted } from 'vue'
	import axios from '../axios.js';
	import { ref } from 'vue';


	const questionnaires = ref([]);

	const loading = ref(false);

	function fetchQuestionnaires()
	{
		loading.value = true;

		axios.get('/questionnaire')
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
		axios.delete(`/questionnaire/${questionnaire.id}`)
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
	<v-card>
		<v-toolbar>
			<v-toolbar-title>Questionnaires</v-toolbar-title>
			<v-btn append-icon="mdi-refresh" :loading="loading" size="small" @click="fetchQuestionnaires">Rafraîchir</v-btn>
		</v-toolbar>
		<v-list lines="two" variant="tonal">
			<v-list-item
				v-for="questionnaire in questionnaires" :key="questionnaire.id"
				v-if="questionnaires.length > 0">
				<RouterLink :to="'/questionnaire/' + questionnaire.id">
					<v-list-item-title>{{ questionnaire.name }}</v-list-item-title>
					<v-list-item-subtitle>{{ questionnaire.description }}</v-list-item-subtitle>
				</RouterLink>
				<template v-slot:append>
					<RouterLink :to="'/questionnaire/update/' + questionnaire.id">
						<v-btn @click="updateQuestionnaire(questionnaire)"
							icon="mdi-pencil"
							variant="text"
						></v-btn>
					</RouterLink>
					<v-btn @click="deleteQuestionnaire(questionnaire)"
						color="red"
						icon="mdi-close-circle"
						variant="text"
					></v-btn>
				</template>
				<v-divider></v-divider>
			</v-list-item>
			<v-list-item v-else>
				<v-list-item-title>Aucun questionnaire trouvé</v-list-item-title>
			</v-list-item>
		</v-list>

		<RouterLink to="/questionnaire/add">
			<v-btn prepend-icon="mdi-plus" size="small">
				Ajouter un questionnaire
			</v-btn>
		</RouterLink>
		
	</v-card>
</template>