<script setup>
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels =
[
	"Vrai", "Faux"
];

const chartData =
{
	labels: labels,
	datasets:
	[
		{ label: 'Nombre de réponses par proposition', data: [10, 12], backgroundColor: '#499ca5' },
	]
}

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
	}
}
</script>

<template>
	<v-sheet>
		<h1 class="pl-5">{{ question.name }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>

		<v-divider class="border-opacity-25"></v-divider>

		<Bar :data="chartData" :options="chartOptions" />
	</v-sheet>
</template>