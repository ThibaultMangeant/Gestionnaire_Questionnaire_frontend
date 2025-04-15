

import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

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
		path: '/questionnaires/ajouter-questionnaire',
		name: 'ajouter-questionnaire',
		component: () => import('../views/forms/FormQuestionnaire.vue')
	},
	{
		path: '/questionnaires/:id/ajouter-question',
		name: 'ajouter-question',
		component: () => import('../views/forms/FormQuestion.vue')
	}
  ],
})

export default router
