<script setup>
import Welcome from './components/Welcome.vue'

</script>

<template>
<header>
	<RouterLink to="/user/authentificate">
		<v-btn
			icon="mdi-account">
		</v-btn>
	</RouterLink>
	<Welcome user="Thibault" />
</header>

<main>
	<RouterView />
</main>

</template>