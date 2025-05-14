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
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"
];

const chartData =
{
	labels: labels,
	datasets:
	[
		{ label: 'Nombre de réponses par proposition', data: [5, 10, 10, 12, 18, 21, 25, 30, 35, 40, 41, 42, 55, 60, 61], backgroundColor: '#499ca5' },
	]
}

const chartOptions =
{
	responsive: true,
	indexAxis: 'x',
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