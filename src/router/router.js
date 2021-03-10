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
    path: '/search_detail',
    meta: { title: '查询' },
    component: () => import(/* webpackChunkName: "search-view" */ '@v/SearchDetail.vue')
  },
  {
    path: '*',
    meta: { title: '404页' },
    component: () => import(/* webpackChunkName: "not-found-view" */ '@v/NotFound.vue')
  }
]
