export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home-view" */ '@v/Index.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search-view" */ '@v/SearchList.vue')
  }
]
