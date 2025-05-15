<script setup>

import { ref, onMounted } from 'vue';
import axios from '../axios.js';

const props = defineProps(
{
	question:
	{
		type: Object,
		required: true,
	}
});

const question = props.question;

const loading = ref(false);

const numberOfAnswers = ref();

const answers = ref([]);

onMounted(() =>
{
	loading.value = true;

	axios.get('/api/result/openEndedAnswers/' + question.id)
	.then(response =>
	{
		loading.value = false;

		numberOfAnswers.value = response.data.numberOfAnswers;

		response.data.answers.forEach(element =>
		{
			answers.value.push(element.answer);
		});
		console.log("Réponses récupérées avec succès.", response);
	})
	.catch(error =>
	{
		loading.value = false;
		console.error("Erreur lors de la récupération des réponses.", error);
	});
});
</script>

<template>
	<v-sheet :loading="loading">
		<h1 class="pl-5">{{ question.name }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>

		<v-divider class="border-opacity-25"></v-divider>

		<div v-if="!loading">
			<v-virtual-scroll v-if="answers.length > 0" class="pt-2"
				:height="100"
				:items="answers">
				<template v-slot:default="{ item }">
					<v-sheet
						color="#EAEAEA"
						width="600"
						height="75"
						elevation="2"
						rounded>{{ item }}</v-sheet>
					<v-spacer class="mt-2"></v-spacer>
				</template>
			</v-virtual-scroll>
			<h2 v-else class="text-center ma-10">Pas de réponses</h2>
		</div>

		<v-divider class="border-opacity-25"></v-divider>

		<p class="text-center">Nombre de réponses : {{ numberOfAnswers }}</p>
	</v-sheet>
</template>