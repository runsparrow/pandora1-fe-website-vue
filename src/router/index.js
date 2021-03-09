import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import { setDocumentTitle } from '@l/util'
import $store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const { token } = $store.state
  to.meta && setDocumentTitle(to.meta.title)
  if (to.path === '/forgot') {
    next()
  } else if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (token) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
