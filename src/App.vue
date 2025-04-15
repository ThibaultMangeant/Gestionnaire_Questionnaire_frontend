<script setup>
import Welcome from './components/Welcome.vue'
import CRUDQuestionnaires from './views/CRUDQuestionnaires.vue';

</script>

<template>
<!-- <header>
	<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

	<div class="wrapper">
	<HelloWorld msg="You did it!" />

	<nav>
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/about">About</RouterLink>
		<RouterLink to="/questions">Questions</RouterLink>
	</nav>
	</div>
</header>

<RouterView /> -->

<header>
	<Welcome user="Thibault" />
</header>

<main>
	<p>{{ $route.fullPath }}</p>
	<RouterView />
</main>

</template>