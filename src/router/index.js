import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import { setDocumentTitle } from '@l/util'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const HAS_LOGINED = true

router.beforeEach((to, from, next) => {
  to.meta && setDocumentTitle(to.meta.title)
  if (to.path !== '/login') {
    if (HAS_LOGINED) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (HAS_LOGINED) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
