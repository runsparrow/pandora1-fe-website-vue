export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home-view" */ '@v/Index.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search-view" */ '@v/SearchList.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "not-found-view" */ '@v/NotFound.vue')
  }
]
