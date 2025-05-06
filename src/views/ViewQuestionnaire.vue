<script setup>
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import axios from '../axios.js';
	import OpenEnded from '../components/OpenEnded.vue';
	import Cursor from '../components/Cursor.vue';
	import QCM from '../components/QCM.vue';
	import FalseTrue from '../components/FalseTrue.vue';


	const route = useRoute();

	const isPreview = route.fullPath.includes('preview');

	const title = ref('');
	const loading = ref(false);

	const questions = ref([]);
	const step = ref(0);

	onMounted(() =>
	{
		loading.value = true;

		if (isPreview)
		{
			title.value = 'Prévisualisation du questionnaire';
			axios.get('/api/question/id/' + route.params.idQuestionnaire)
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
		else if (!isPreview)
		{
			title.value = 'Visualisation du questionnaire';
			axios.get('/api/question/token/' + route.params.token)
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
	});
</script>

<template>
	<RouterLink v-if="isPreview" to="/questionnaire/">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card :loading="loading" :title="title" width="600">
		<v-divider class="border-opacity-75"></v-divider>

		<OpenEnded v-if="questions.length > 0 && questions[step].question_type_name == 'Question ouverte'"          :question="questions[step]" />
		<Cursor    v-if="questions.length > 0 && questions[step].question_type_name == 'Curseur'"                   :question="questions[step]" />
		<QCM       v-if="questions.length > 0 && questions[step].question_type_name == 'Question à choix multiple'" :question="questions[step]" />
		<FalseTrue v-if="questions.length > 0 && questions[step].question_type_name == 'Vrai/Faux'"                 :question="questions[step]" />

		<v-card-actions>
			<v-btn v-if="step > 0" @click="step--"
				elevation="1"
				class="ma-2"
				prepend-icon="mdi-arrow-left">
				Question précèdente
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn v-if="step < questions.length - 1" @click="step++"
				elevation="1"
				class="ma-2"
				append-icon="mdi-arrow-right">
				Question suivante
			</v-btn>
		</v-card-actions>
	</v-card>
</template>