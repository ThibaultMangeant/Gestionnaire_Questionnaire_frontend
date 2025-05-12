<script setup>
	import { ref, watch } from 'vue';

	defineProps(
	{
		question:
		{
			type: Object,
			required: true,
		}
	});

	const answer = ref('');

	const emit = defineEmits(['update:answer']);

	watch(answer, (newVal) => {
		emit('update:answer', newVal)
	})
</script>

<template>
	<v-sheet>
		<h1 class="pl-5">{{ question.name }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>
		<v-slider class="pa-3" color="#499ca5"
			v-model="answer"
			:min="question.type.min"
			:max="question.type.max"
			:step="question.type.step"
			tick-size="4"
			show-ticks="always"
			thumb-label>
		</v-slider>
	</v-sheet>
</template>