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
	const token = route.params.token;

	const title = ref('');
	const loading = ref(false);
	const alreadyAnswered = ref(false);

	const questions = ref([]);
	const step = ref(0);

	const answer = ref();

	function sendAnswer()
	{
		axios.post('/api/answer/add/' + questions.value[step.value].id,
		{
			answer: answer.value,
		})
		.then(response =>
		{
			console.log(response.data);
		})
		.catch(error =>
		{
			console.error(error);
		});

		axios.put('/api/link/update/' + token,
		{
			state: 'En cours',
		})
		.then(response =>
		{
			console.log(response.data);
		})
		.catch(error =>
		{
			console.error(error);
		});
	}

	function resetAnswer()
	{
		const currentQuestion = questions.value[step.value];

		switch (currentQuestion.question_type_name)
		{
			case 'Question ouverte':
				answer.value = '';
				break;
			case 'Curseur':
				answer.value = 0;
				break;
			case 'Question à choix multiple':
				answer.value = [false, false, false, false, false];
				break;
			case 'Vrai/Faux':
				answer.value = null;
				break;
			default:
				answer.value = null;
		}
	}

	function endQuestionnaire()
	{
		axios.put('/api/link/update/' + token,
		{
			state: 'Terminé',
		})
		.then(response =>
		{
			window.location.href="http://localhost:5174/questionnaire/";
			console.log(response.data);
		})
		.catch(error =>
		{
			console.error(error);
		});
	}

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
			axios.get('/api/question/token/' + token)
			.then(response => {
				loading.value = false;
				questions.value = response.data;
				console.log(response);
			})
			.catch(error => {
				loading.value = false;
				console.error('Erreur lors de la récupération des questions.', error);
				if (error.response.status === 403)
				{
					alreadyAnswered.value = true;
				}
			});

			axios.put('/api/link/update/' + token,
			{
				state: 'Consulté',
			})
			.then(response =>
			{
				console.log(response.data);
			})
			.catch(error =>
			{
				console.error(error);
			});
		}
	});
</script>

<template>
	<RouterLink v-if="isPreview" to="/questionnaire/">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<v-card v-if="!alreadyAnswered" :loading="loading" :title="title" width="600">
		<v-divider class="border-opacity-75"></v-divider>

		<OpenEnded
			v-if="questions.length > 0 && questions[step].question_type_name == 'Question ouverte'"
			:question="questions[step]"
			v-model:answer="answer"/>

		<Cursor
			v-if="questions.length > 0 && questions[step].question_type_name == 'Curseur'"
			:question="questions[step]"
			v-model:answer="answer"/>
		<QCM
			v-if="questions.length > 0 && questions[step].question_type_name == 'Question à choix multiple'"
			:question="questions[step]"
			v-model:answer="answer"/>
		<FalseTrue
			v-if="questions.length > 0 && questions[step].question_type_name == 'Vrai/Faux'"
			:question="questions[step]"
			v-model:answer="answer"/>

		<v-card-actions v-if="!loading">
			<v-spacer></v-spacer>
			<v-btn v-if="step < questions.length - 1" @click="sendAnswer(); step++; resetAnswer();"
				elevation="1"
				class="ma-2"
				append-icon="mdi-arrow-right">
				Question suivante
			</v-btn>
			<v-btn v-else @click="sendAnswer(); endQuestionnaire();"
				elevation="1"
				class="ma-2"
				append-icon="mdi-check-circle">
				Terminer le questionnaire
			</v-btn>
		</v-card-actions>
	</v-card>
	<h1 v-else>Vous avez déjà répondu à ce questionnaire</h1>
</template>