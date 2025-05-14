<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios.js';

import
{
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale
} from 'chart.js'

import { Bar } from 'vue-chartjs';

const props = defineProps(
{
	question:
	{
		type: Object,
		required: true,
	}
});

const question = props.question;

const loaded = ref(false);

const counts = ref([]);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels =
[
	question.type.prop1 ? question.type.prop1 : null,
	question.type.prop2 ? question.type.prop2 : null,
	question.type.prop3 ? question.type.prop3 : null,
	question.type.prop4 ? question.type.prop4 : null,
	question.type.prop5 ? question.type.prop5 : null,
];

const chartData =
{
	labels: labels,
	datasets:
	[
		{ label: 'Nombre de réponses par proposition', data: counts.value, backgroundColor: '#499ca5' },
	]
}

const chartOptions =
{
	responsive: true,
	plugins:
	{
		title:
		{
			display: true,
			text: 'Réponses'
		}
	}
}

onMounted(() =>
{
	loaded.value = false;

	axios.get('/api/result/numberAnswerQCM/' + question.id)
	.then(response =>
	{
		loaded.value = true;

		counts.value = response.data;

		console.log("Réponses récupérées avec succès.", response);
	})
	.catch(error =>
	{
		loaded.value = true;
		console.error("Erreur lors de la récupération des réponses.", error);
	});
});
</script>

<template>
	<v-sheet>
		<h1 class="pl-5">{{ question.name }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>

		<v-divider class="border-opacity-25"></v-divider>

		<Bar v-if="loaded" :data="chartData" :options="chartOptions" />
	</v-sheet>
</template>