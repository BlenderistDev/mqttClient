import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Module from "../views/Module";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/module/:name',
    name: 'module',
    component: Module,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
