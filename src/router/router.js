import $store from '../store'
import $router from './index'
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "home-view" */ '@v/Index.vue')
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "login-view" */ '@v/Login.vue')
  },
  {
    path: '/company_intro',
    meta: { title: '公司介绍' },
    component: () => import(/* webpackChunkName: "company-intro-view" */ '@v/companyIntro.vue')
  },
  {
    path: '/card_activate',
    meta: { title: '邀请码登录' },
    component: () => import(/* webpackChunkName: "card-activate-view" */ '@v/CardActivate.vue')
  },
  {
    path: '/forgot',
    meta: { title: '找回密码' },
    component: () => import(/* webpackChunkName: "login-view" */ '@v/ForgotPwd.vue')
  },

  {
    path: '/search',
    meta: { title: '查询' },
    component: () => import(/* webpackChunkName: "search-view" */ '@v/SearchList.vue')
  },
  {
    path: '/search_detail/:id',
    meta: { title: '查询' },
    component: () => import(/* webpackChunkName: "search-view" */ '@v/SearchDetail.vue')
  },
  {
    path: '/mine/info',
    beforeEnter: (to, from, next) => {
      if ($store.state.token === '') {
        $router.replace('/home')
      }
      next()
    },
    meta: { title: '我的信息' },
    component: () => import(/* webpackChunkName: "my-info-view" */ '@v/mine/MyInfo.vue')
  },
  {
    path: '*',
    meta: { title: '404页' },
    component: () => import(/* webpackChunkName: "not-found-view" */ '@v/NotFound.vue')
  }
]
