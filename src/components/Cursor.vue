<script setup>
defineProps(
{
	question:
	{
		type: Object,
		required: true,
	}
});
</script>

<template>
	<v-sheet>
		<h1 class="pl-5">{{ question.name }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>
		<v-slider class="pa-3" color="#499ca5"
			:min="question.type.min"
			:max="question.type.max"
			:step="question.type.step"
			show-ticks
			thumb-label>
		</v-slider>
	</v-sheet>
</template>