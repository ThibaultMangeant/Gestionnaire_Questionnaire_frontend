<script setup>

import axios from '../../axios.js';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import OpenEndedResult from '../../components/OpenEndedResult.vue';
import CursorResult from '../../components/CursorResult.vue';
import QCMResult from '../../components/QCMResult.vue';
import FalseTrueResult from '../../components/FalseTrueResult.vue';


const route = useRoute();

const breadcrumbsItems = ['Questionnaires', 'Résultats'];

const title   = ref('');
const loading = ref(false);

const numberPeopleInvited = ref();

const questions = ref([]);
const step      = ref(0);


onMounted(() =>
{
	loading.value = true;
	title.value   = 'Résultats du questionnaire';

	axios.get('/api/result/numberPeopleInvited/' + route.params.idQuestionnaire)
	.then(response =>
	{
		numberPeopleInvited.value = response.data;
	})
	.catch(error =>
	{

	});

	axios.get('/api/question/id/' + route.params.idQuestionnaire)
	.then(response =>
	{
		loading.value   = false;
		questions.value = response.data;
	})
	.catch(error =>
	{
		loading.value = false;
	});
});
</script>

<template>
	<v-breadcrumbs :items="breadcrumbsItems"></v-breadcrumbs>
	<RouterLink to="/questionnaire/">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>

	<v-card :loading="loading" :title="title" width="600" class="mt-5">

		<v-divider class="border-opacity-75"></v-divider>
			<p v-if="numberPeopleInvited > 0" class="pl-2">Nombre de personnes invités à répondre : {{ numberPeopleInvited }}</p>
		<v-divider class="border-opacity-75"></v-divider>

		<OpenEndedResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Question ouverte'"
			:question="questions[step]"
			:key="questions[step].id"/>
		<CursorResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Curseur'"
			:question="questions[step]"
			:key="questions[step].id"/>
		<QCMResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Question à choix multiple'"
			:question="questions[step]"
			:key="questions[step].id"/>
		<FalseTrueResult
			v-if="questions.length > 0 && questions[step].question_type_name == 'Vrai/Faux'"
			:question="questions[step]"
			:key="questions[step].id"/>

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