<script setup>
	import { ref, watch } from 'vue';


	const props = defineProps(
	{
		question:
		{
			type: Object,
			required: true,
		}
	});

	const question = props.question

	const answer = ref(
	[
		question.type.prop1 ? false : null,
		question.type.prop2 ? false : null,
		question.type.prop3 ? false : null,
		question.type.prop4 ? false : null,
		question.type.prop5 ? false : null,
	]);


	const emit = defineEmits(['update:answer']);

	watch(answer, (newVal) =>
	{
		emit('update:answer', newVal)
	}, {deep: true});
</script>

<template>
	<v-sheet>
		<h1 class="pl-5">{{ question.name    }}</h1>
		<h2 class="pl-2">{{ question.content }}</h2>

		<div class="d-flex ga-6">
			<v-checkbox v-if="question.type.prop1 !== null"
				v-model="answer[0]"
				:label="question.type.prop1"
				color="#499ca5">
			</v-checkbox>

			<v-checkbox v-if="question.type.prop2 !== null"
				v-model="answer[1]"
				:label="question.type.prop2"
				color="#499ca5">
			</v-checkbox>

			<v-checkbox v-if="question.type.prop3 !== null"
				v-model="answer[2]"
				:label="question.type.prop3"
				color="#499ca5">
			</v-checkbox>

			<v-checkbox v-if="question.type.prop4 !== null"
				v-model="answer[3]"
				:label="question.type.prop4"
				color="#499ca5">
			</v-checkbox>

			<v-checkbox v-if="question.type.prop5 !== null"
				v-model="answer[4]"
				:label="question.type.prop5"
				color="#499ca5">
			</v-checkbox>
		</div>
	</v-sheet>
</template>