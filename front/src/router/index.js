import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Module from "../views/Module";
import Storage from "../views/Storage";

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
  },
  {
    path: '/storage/:name',
    name: 'storage',
    component: Storage,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
