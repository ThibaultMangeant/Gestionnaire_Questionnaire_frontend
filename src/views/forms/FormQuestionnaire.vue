<script setup>

</script>

<template>
	<v-card>
		<v-form @submit.prevent>
			<v-text-field
				label="Adresse Email"
				placeholder="johndoe@gmail.com"
				type="email"
				clearable>
			</v-text-field>
			<v-text-field
				label="Nom du questionnaire"
				clearable>
			</v-text-field>
			<v-textarea
				label="Description du questionnaire"
				clearable>
			</v-textarea>
			<v-btn append-icon="mdi-check-circle" type="submit" block>
				Créer le questionnaire
			</v-btn>
		</v-form>
	</v-card>
</template>