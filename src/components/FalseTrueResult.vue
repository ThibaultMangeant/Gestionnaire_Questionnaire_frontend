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

const loading = ref(false);

const chartData = ref(null);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels =
[
	"Vrai", "Faux"
];

const chartOptions =
{
	responsive: true,
	indexAxis: 'y',
	plugins:
	{
		title:
		{
			display: true,
			text: 'Réponses'
		}
	},
	scales:
	{
		x:
		{
			beginAtZero: true,
			min: 0,
			ticks:
			{
				stepSize: 1,
				callback: (value) => value + ' réponses'
			}
		}
	}
}

onMounted(() =>
{
	loading.value = true;

	axios.get('/api/result/numberAnswerFalseTrue/' + question.id)
	.then(response =>
	{
		const counts = response.data;

		chartData.value =
		{
			labels: labels,
			datasets:
			[
				{
					label: 'Nombre de réponses par proposition',
					data: counts,
					backgroundColor: '#499ca5'
				}
			]
		};

		loading.value = false;
	})
	.catch(error =>
	{
		console.error("Erreur lors de la récupération des réponses.", error);
		loading.value = false;
	});
});
</script>

<template>
	<v-sheet>
		<h1 class="pl-5">{{ question.name }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>

		<v-divider class="border-opacity-25"></v-divider>

		<Bar v-if="!loading && chartData" :data="chartData" :options="chartOptions" />
	</v-sheet>
</template>