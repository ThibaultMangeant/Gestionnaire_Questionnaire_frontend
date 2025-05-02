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
		<v-radio-group color="#499ca5">
			<v-radio
				label="Vrai"
				value="vrai">
			</v-radio>
			<v-radio
				label="Faux"
				value="faux">
			</v-radio>
		</v-radio-group>
	</v-sheet>
</template>