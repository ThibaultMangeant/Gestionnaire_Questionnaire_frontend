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
		<v-checkbox v-if="question.type.prop1 !== null"
			:label="question.type.prop1"
			color="#499ca5">
		</v-checkbox>
		<v-checkbox v-if="question.type.prop2 !== null"
			:label="question.type.prop2"
			color="#499ca5">
		</v-checkbox>
		<v-checkbox v-if="question.type.prop3 !== null"
			:label="question.type.prop3"
			color="#499ca5">
		</v-checkbox>
		<v-checkbox v-if="question.type.prop4 !== null"
			:label="question.type.prop4"
			color="#499ca5">
		</v-checkbox>
		<v-checkbox v-if="question.type.prop5 !== null"
			:label="question.type.prop5"
			color="#499ca5">
		</v-checkbox>
	</v-sheet>
</template>