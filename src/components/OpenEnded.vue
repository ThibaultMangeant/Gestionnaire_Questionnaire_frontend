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
		<v-textarea
			v-model="answer"
			rows="1"
			variant="outlined"
			placeholder="Votre réponse"
			auto-grow
			counter
			clearable>
		</v-textarea>
	</v-sheet>
</template>