export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home-view" */ '../views/Index.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search-view" */ '../views/SearchList.vue')
  }
]
