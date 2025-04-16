<script setup>
defineProps({
  user: {
    type: String,
    required: false,
  }
})
</script>

<template>
	<v-sheet
		elevation="4"
		rounded>
		<h1>Bienvenue <span id="userwelcome">{{ user }}</span></h1>

		<br>

		<h2>Cette page vous permet de voir, créer, modifier et supprimer vos questionnaires !</h2>
	</v-sheet>
</template>