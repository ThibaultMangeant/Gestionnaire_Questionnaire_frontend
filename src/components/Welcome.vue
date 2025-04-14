<script setup>
defineProps({
  user: {
    type: String,
    required: false,
  }
})
</script>

<template>
	<h1>Bienvenue {{ user }} sur votre gestionnaire de questionnaire</h1>

	<h2>Cette page vous permet de voir, créer, modifier et supprimer vos questionnaires !</h2>
</template>