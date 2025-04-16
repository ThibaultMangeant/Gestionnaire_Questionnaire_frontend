<script setup>

</script>

<template>
	<v-card>
		<v-form @submit.prevent>
			<v-select
				label="Type de la question"
				:items="['Question ouverte', 'Question à choix multiple', 'Vrai/Faux', 'Curseur']">
			</v-select>
			<v-text-field
				label="Nom de la question"
				placeholder="Question n°1"
				clearable>
			</v-text-field>
			<v-text-field
				label="Ennoncé de la question"
				placeholder="Quel est la couleur du ciel ?"
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