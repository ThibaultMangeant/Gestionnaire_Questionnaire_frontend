

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
	  redirect: '/questionnaires'
    },
    {
      path: '/questionnaires',
      name: 'questionnaires',
      component: () => import('../views/CRUDQuestionnaires.vue'),
    },
	{
		path: '/questionnaires/:idQuestionnaire',
		name: 'questions',
		component: () => import('../views/CRUDQuestions.vue'),
	},
	{
		path: '/questionnaires/add-questionnaire',
		name: 'add-questionnaire',
		component: () => import('../views/forms/FormQuestionnaire.vue')
	},
	{
		path: '/questionnaires/:idQuestionnaire/add-question',
		name: 'add-question',
		component: () => import('../views/forms/FormQuestion.vue')
	}
  ],
})

export default router
