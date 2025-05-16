<script setup>
	import axios from '../axios.js';


	defineProps(
	{
		user:
		{
			type: String,
			required: false,
		}
	});

	function logout()
	{
		axios.post('/logout')
		.then(response =>
		{
			window.location.href = '/login'
		})
		.catch(error =>
		{

		});
	}
</script>

<template>
	<div id="account">
		<h1>Bonjour <span>{{ user }}</span></h1>
		<v-menu>
			<template v-slot:activator="{ props }">
			<v-btn
				icon
				v-bind="props">
				<v-avatar image="src/assets/1723015480__Carole_compressé.jpg"></v-avatar>
			</v-btn>
			</template>
				<v-card>
					<v-card-text>
						<div class="mx-auto text-center">
							<v-avatar image="src/assets/1723015480__Carole_compressé.jpg" size="64"></v-avatar>

							<v-divider class="my-3"></v-divider>

							<RouterLink to="/login">
								<v-btn
									append-icon="mdi-login"
									variant="text"
									rounded>
									Connexion
								</v-btn>
							</RouterLink>

							<v-divider class="my-3"></v-divider>

							<RouterLink to="/register">
								<v-btn
									append-icon="mdi-login-variant"
									variant="text"
									rounded>
									Inscription
								</v-btn>
							</RouterLink>

							<v-divider class="my-3"></v-divider>

							<span>
								<v-btn @click="logout"
									append-icon="mdi-logout"
									variant="text"
									rounded>
										Déconnexion
								</v-btn>
							</span>
						</div>
					</v-card-text>
				</v-card>
		</v-menu>
	</div>
</template>

<style scoped>
#account
{
	display: flex;
	flex-direction: row;
}

h1
{
	margin-right: 15px;
}

span
{
	color: #499ca5;
}
</style>