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

const numberOfAnswers = ref();

const chartData = ref(null);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions =
{
	responsive: true,
	plugins:
	{
		title:
		{
			display: true,
			text: 'Réponses',
		}
	},
	scales:
	{
		y:
		{
			beginAtZero: true,
			min: 0,
			ticks:
			{
				stepSize: 1,
				callback: (value) => value + ' réponses',
			}
		}
	}
}

onMounted(() =>
{
	loading.value = true;

	axios.get('/api/result/numberAnswerCursor/' + question.id)
	.then(response =>
	{
		numberOfAnswers.value = response.data.numberOfAnswers;
		const labels          = response.data.labels;
		const counts          = response.data.counts;

		chartData.value =
		{
			labels: labels,
			datasets:
			[
				{
					label: 'Nombre de réponses par proposition',
					data: counts,
					backgroundColor: '#499ca5',
				}
			]
		};

		loading.value = false;
	})
	.catch(error =>
	{
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

		<v-divider class="border-opacity-25"></v-divider>

		<p class="text-center">Nombre de réponses : {{ numberOfAnswers }}</p>
	</v-sheet>
</template>