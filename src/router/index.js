import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import axios from '../axios.js';

async function canAccess(to)
{
	const auth = await isAuthenticated();

	if (!auth && to.name !== 'user-login')
	{
		return { name: 'user-login' }
	}
}

function isAuthenticated()
{
	const user = ref();

	return axios.get('/api/user')
		.then(response => 
		{
			user.value = response.data;
			return (user.value !== '')
		})
		.catch(error =>
		{
			console.error("Erreur lors de la récupération de l'utilisateur", error);
		});
}

const router = createRouter(
{
	history: createWebHistory(import.meta.env.BASE_URL),
	routes:
	[
		{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/questionnaire',
			name: 'questionnaire',
			component: () => import('../views/cruds/CRUDQuestionnaires.vue'),
			beforeEnter: canAccess,
		},

		{
			path: '/questionnaire/add',
			name: 'add-questionnaire',
			component: () => import('../views/forms/FormQuestionnaire.vue'),
			beforeEnter: canAccess,
		},
		{
			path: '/questionnaire/update/:idQuestionnaire',
			name: 'update-questionnaire',
			component: () => import('../views/forms/FormQuestionnaire.vue'),
			beforeEnter: canAccess,
		},

		{
			path: '/questionnaire/link/:idQuestionnaire',
			name: 'questionnaire_link',
			component: () => import('../views/cruds/CRUDLink.vue'),
			beforeEnter: canAccess,
		},


		{
			path: '/questionnaire/:idQuestionnaire',
			name: 'question',
			component: () => import('../views/cruds/CRUDQuestions.vue'),
			beforeEnter: canAccess,
		},

		{
			path: '/questionnaire/add/:idQuestionnaire',
			name: 'add-question',
			component: () => import('../views/forms/FormQuestion.vue'),
			beforeEnter: canAccess,
		},
		{
			path: '/questionnaire/:idQuestionnaire/update/:id',
			name: 'update-question',
			component: () => import('../views/forms/FormQuestion.vue'),
			beforeEnter: canAccess,
		},


		{
			path: '/preview/:idQuestionnaire',
			name: 'preview-questionnaire',
			component: () => import('../views/ViewQuestionnaire.vue'),
			beforeEnter: canAccess,
		},
		{
			path: '/view/:token',
			name: 'view-questionnaire',
			component: () => import('../views/ViewQuestionnaire.vue')
		},


		{
			path: '/login',
			name: 'user-login',
			component: () => import('../views/forms/FormLogin.vue')
		},
		{
			path: '/register',
			name: 'user-register',
			component: () => import('../views/forms/FormRegister.vue')
		}
	],
});

export default router;