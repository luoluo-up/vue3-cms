import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { constRoutes } from '@/router/routes'


const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes
})


export default router
