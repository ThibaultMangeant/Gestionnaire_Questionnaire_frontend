<script setup>
	import axios from '../axios.js';
	import { ref, onMounted } from 'vue'
	import { useRoute } from 'vue-router'

	const route = useRoute();

	const links = ref([]);

	const copiedToClipboard = ref('Copier le lien dans le presse papier');

	const loading = ref(false);

	const headers =
	[
		{ title: 'Token', key: 'token'},
		{ title: 'Mail associé', key: 'usermail' },
		{ title: 'État', key: 'state'},
		{ title: 'Date de création', key: 'created_at'},
		{ title: 'Actions', key: 'actions', align: 'center', sortable: false}
	];

	function fetchLinks()
	{
		loading.value = true;

		axios.get('/api/link/' + route.params.idQuestionnaire)
		.then(response => {
			loading.value = false;
			links.value = response.data;
			console.log(response);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la récupération des liens.', error);
		});
	}

	function addLink()
	{
		loading.value = true;

		axios.post('/api/link/add/' + route.params.idQuestionnaire,
		{
			usermail: 'soldat.inconnu@gmail.com'
			
		})
		.then(response => {
			loading.value = false;
			links.value.push(response.data);
			console.log(response.data);
		})
		.catch(error => {
			loading.value = false;
			console.error('Erreur lors de la création du lien.', error);
		});
	}

	function deleteLink(link)
	{
		axios.delete(`/api/link/${route.params.idQuestionnaire}/${link.id}`)
		.then(response => {
			console.log('Lien supprimée avec succès.', response.data)
			links.value = links.value.filter(l => l.id !== link.id)
		})
		.catch(error => {
			console.error('Erreur lors de la suppression.', error)
		});
	}

	function copyToClipboard(link)
	{
		const text = 'http://localhost:5174/view/' + link.token;

		navigator.clipboard.writeText(text);
		copiedToClipboard.value = 'Copié !';

		setTimeout(function() {copiedToClipboard.value = 'Copier le lien dans le presse papier'}, 2000);
	}

	onMounted(() =>
	{
		fetchLinks();
	});
</script>

<template>
	<RouterLink to="/questionnaire">
		<v-btn icon="mdi-arrow-left"></v-btn>
	</RouterLink>
	<h1>Liens</h1>
	<div class="text-right my-4">
		<v-btn @click="addLink()"
			:loading="loading"
			prepend-icon="mdi-link-variant-plus"
			size="small"
			variant="outlined">
			Générer un lien
		</v-btn>
	</div>
	<div class="mt-4 position-relative">
		<v-data-table :items="links" :loading="loading" :headers="headers">
			<template v-slot:item.token="{ value }">
				<v-chip
					:text="value"
					border="thin opacity-25"
					prepend-icon="mdi-link-variant"
					label>
				</v-chip>
			</template>
			<template v-slot:item.actions="{ item }">
				<div class="d-flex ga-2 justify-end">
					<v-tooltip location="top" text="Supprimer le lien">
						<template v-slot:activator="{ props }">
							<v-icon v-bind="props" color="red" icon="mdi-delete" @click="deleteLink(item)"></v-icon>
						</template>
					</v-tooltip>

					<v-tooltip location="top" :text="copiedToClipboard">
						<template v-slot:activator="{ props }">
							<v-icon v-bind="props" icon="mdi-clipboard-multiple" @click="copyToClipboard(item)"></v-icon>
						</template>
					</v-tooltip>
				</div>
			</template>
			<template v-slot:no-data>
				<p>Aucun lien trouvé</p>
			</template>
		</v-data-table>
	</div>
</template>