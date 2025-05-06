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
	<h1 class="pl-5">{{ question.name }}</h1>
	<h2 class="pl-2">{{ question.content }}</h2>
	<v-radio-group color="#499ca5" inline>
		<v-radio
			label="Vrai"
			value="vrai">
		</v-radio>
		<v-radio
			label="Faux"
			value="faux">
		</v-radio>
	</v-radio-group>
</template>