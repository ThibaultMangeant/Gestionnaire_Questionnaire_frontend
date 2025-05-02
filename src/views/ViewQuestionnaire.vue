<script setup>
	import { ref, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import axios from '../axios.js';
	import OpenEnded from '../components/OpenEnded.vue';
	import Cursor from '../components/Cursor.vue';
	import QCM from '../components/QCM.vue';
	import FalseTrue from '../components/FalseTrue.vue';


	const route = useRoute();

	const loading = ref(false);

	const questions = ref([]);
	const step = ref(0);

	onMounted(() =>
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
	});
</script>

<template>
	<RouterLink to="/questionnaire/">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card :loading="loading">
		<v-card-title>Prévisualisation du questionnaire</v-card-title>
		<v-divider class="border-opacity-75"></v-divider>

		<OpenEnded v-if="questions.length > 0 && questions[step].question_type_name == 'Question ouverte'"          :question="questions[step]" />
		<Cursor    v-if="questions.length > 0 && questions[step].question_type_name == 'Curseur'"                   :question="questions[step]" />
		<QCM       v-if="questions.length > 0 && questions[step].question_type_name == 'Question à choix multiple'" :question="questions[step]" />
		<FalseTrue v-if="questions.length > 0 && questions[step].question_type_name == 'Vrai/Faux'"                 :question="questions[step]" />

		<div class="d-flex">
			<v-btn v-if="step > 0" @click="step--"
				class="ma-2"
				prepend-icon="mdi-arrow-left">
				Question précèdente
			</v-btn>
			<v-spacer class="ms-16"></v-spacer>
			<v-btn v-if="step < questions.length - 1" @click="step++"
				class="ma-2"
				append-icon="mdi-arrow-right">
				Question suivante
			</v-btn>
		</div>
	</v-card>
</template>