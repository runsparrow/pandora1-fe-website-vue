import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import { setDocumentTitle } from '@l/util'
import $store from '../store'
import { getNavigationMenusService } from '@s/navigation-service'
import { getVIPListService } from '@s/login-service'
import { searchListService } from '@s/search-list-service'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const { token } = $store.state

  if ($store.state.navigationsMenus.length === 0) {
    let { rows: rowDatas } = await getNavigationMenusService(10)
    let titles = rowDatas.filter(f => f.name !== '首页')
    titles.forEach(async (m, index) => {
      if (index === 0) {
        m.firstUrl = process.env.VUE_APP_FE_FILE_URL + '/uploadFiles/video/2021/08/06/妙手丹青.jpg'
      }
      if (index === 1) {
        m.firstUrl = process.env.VUE_APP_FE_FILE_URL + '/uploadFiles/video/2021/08/06/万千组合.jpg'
      }
      if (index === 2) {
        m.firstUrl = process.env.VUE_APP_FE_FILE_URL + '/uploadFiles/video/2021/08/06/生生不息.gif'
      }
      if (index === 3) {
        m.firstUrl = require('../assets/imgs/index_dingshen_banner.jpg')
      }
    })
    setTimeout(() => {
      $store.commit(
        'setNavigationMenus',
        titles.filter(f => f.name !== '视频动画')
      )
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
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
