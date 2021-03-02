import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home-view" */ '../views/Index.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search-view" */ '../views/SearchList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
