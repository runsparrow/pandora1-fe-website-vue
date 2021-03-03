export default [
  {
    path: '/',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "home-view" */ '@v/Index.vue')
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import(/* webpackChunkName: "login-view" */ '@v/Login.vue')
  },
  {
    path: '/search',
    meta: { title: '查询' },
    component: () => import(/* webpackChunkName: "search-view" */ '@v/SearchList.vue')
  },
  {
    path: '*',
    meta: { title: '404页' },
    component: () => import(/* webpackChunkName: "not-found-view" */ '@v/NotFound.vue')
  }
]
