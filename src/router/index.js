import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { checkIfAuthenticated } from '@/lib/secret'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    params: true
  },
  {
    path: '/guests',
    name: 'guests',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "guests" */ '../views/GuestList.vue')
  },
  {
    path: '/guests/add',
    name: 'add-guest',
    component: () => import(/* webpackChunkName: "add-guest" */ '../views/AddGuest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  if (!checkIfAuthenticated() && to.name!=="home")
      return {name: "home"}
})

export default router
