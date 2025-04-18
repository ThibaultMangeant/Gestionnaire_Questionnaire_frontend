import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter(
{
	history: createWebHistory(import.meta.env.BASE_URL),
	routes:
	[
		{
			path: '/',
			redirect: '/questionnaire'
		},
		{
			path: '/questionnaire',
			name: 'questionnaire',
			component: () => import('../views/CRUDQuestionnaires.vue'),
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
			path: '/questionnaire/:idQuestionnaire',
			name: 'question',
			component: () => import('../views/CRUDQuestions.vue'),
		},

		{
			path: '/questionnaire/add/:idQuestionnaire',
			name: 'add-question',
			component: () => import('../views/forms/FormQuestion.vue')
		},


		{
			path: '/user/authentificate',
			name: 'user-authentificate',
			component: () => import('../views/forms/FormUser.vue')
		}
	],
});

export default router;