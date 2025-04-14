<script setup>

</script>

<template>
	<v-card>
		<v-form @submit.prevent>
			<v-text-field
				label="Nom de la question"
				clearable>
			</v-text-field>
			<v-text-field
				label="Ennoncé de la question"
				clearable>
			</v-text-field>
			<v-text-field
				label="Ordre de la question"
				hint="1 = première question du questionnaire, 2 = deuxième, etc.">
			</v-text-field>
			<v-btn append-icon="mdi-check-circle" type="submit" block>
				Créer la question
			</v-btn>
		</v-form>
	</v-card>
</template>