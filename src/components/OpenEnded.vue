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
		<v-textarea
			rows="1"
			variant="outlined"
			placeholder="Votre réponse"
			auto-grow
			counter
			clearable>
		</v-textarea>
	</v-sheet>
</template>