<script setup>

import axios from '../../axios.js';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import OpenEndedResult from '../../components/OpenEndedResult.vue';
import CursorResult from '../../components/CursorResult.vue';
import QCMResult from '../../components/QCMResult.vue';
import FalseTrueResult from '../../components/FalseTrueResult.vue';

const route = useRoute();

const title = ref('');
const loading = ref(false);

const questions = ref([]);
const step = ref(0);

onMounted(() =>
{
	loading.value = true;

	title.value = 'Résultats du questionnaire';
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
});
</script>

<template>
	<RouterLink to="/questionnaire/">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>

	<v-card :loading="loading" :title="title" width="600">
		<v-divider class="border-opacity-75"></v-divider>

		<OpenEndedResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Question ouverte'"
			:question="questions[step]"/>
		<CursorResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Curseur'"
			:question="questions[step]"/>
		<QCMResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Question à choix multiple'"
			:question="questions[step]"/>
		<FalseTrueResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Vrai/Faux'"
			:question="questions[step]" />

		<v-card-actions v-if="!loading">
			<v-btn v-if="step > 0 && questions.length > 0" @click="step--"
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