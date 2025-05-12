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

const answer = ref(null);

const emit = defineEmits(['update:answer']);

watch(answer, (newVal) => {
	emit('update:answer', newVal)
})
</script>

<template>
	<h1 class="pl-5">{{ question.name }}</h1>
	<h2 class="pl-2">{{ question.content }}</h2>
	<v-radio-group color="#499ca5" inline v-model="answer">
		<v-radio
			label="Vrai"
			:value="true">
		</v-radio>
		<v-radio
			label="Faux"
			:value="false">
		</v-radio>
	</v-radio-group>
</template>