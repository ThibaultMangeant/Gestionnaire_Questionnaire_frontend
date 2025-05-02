import { createRouter, createWebHistory } from 'vue-router';

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
		},

		{
			path: '/questionnaire/add',
			name: 'add-questionnaire',
			component: () => import('../views/forms/FormQuestionnaire.vue')
		},
		{
			path: '/questionnaire/update/:idQuestionnaire',
			name: 'update-questionnaire',
			component: () => import('../views/forms/FormQuestionnaire.vue')
		},

		{
			path: '/questionnaire/link/:idQuestionnaire',
			name: 'questionnaire_link',
			component: () => import('../views/cruds/CRUDLink.vue')
		},


		{
			path: '/questionnaire/:idQuestionnaire',
			name: 'question',
			component: () => import('../views/cruds/CRUDQuestions.vue'),
		},

		{
			path: '/questionnaire/add/:idQuestionnaire',
			name: 'add-question',
			component: () => import('../views/forms/FormQuestion.vue')
		},
		{
			path: '/questionnaire/:idQuestionnaire/update/:id',
			name: 'update-question',
			component: () => import('../views/forms/FormQuestion.vue')
		},


		{
			path: '/preview/:idQuestionnaire',
			name: 'preview-questionnaire',
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