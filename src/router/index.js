import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import { setDocumentTitle } from '@l/util'
import $store from '../store'
import { getNavigationMenusService } from '@s/navigation-service'
import { getVIPListService } from '@s/login-service'
import { searchListService } from '@s/search-list-service'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const { token, expires } = $store.state

  if ($store.state.navigationsMenus.length === 0) {
    let { rows: rowDatas } = await getNavigationMenusService(10)
    let titles = rowDatas.filter(f => f.name !== '首页')
    titles.forEach(async m => {
      if (m.name !== '首页') {
        const { rows: Datas } = await searchListService({
          keyWord: `^navigationId=${m.id}`,
          page: '1^100',
          date: '',
          sort: '',
          status: [2]
        })
        m.firstItem = Datas[0]
        m.firstUrl = Datas.length === 0 ? '' : Datas[0].fullUrl
        m.ImgId = Datas.length === 0 ? '' : Datas[0].id
      }
    })
    console.log(titles)
    setTimeout(() => {
      $store.commit('setNavigationMenus', titles)
    }, 1000)
  }
  let { rows } = await getVIPListService({
    keyWord: '',
    page: '1^20',
    date: '',
    sort: 'id^asc',
    status: [1]
  })
  $store.commit('setVipList', rows)

  const dateTime = new Date().getTime()
  to.meta && setDocumentTitle(to.meta.title)
  if (expires !== 0 && dateTime - expires >= 0) {
    $store.commit('clearStore')
  }
  if (to.path === '/mine/info') {
    if (!token) {
      router.replace('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
