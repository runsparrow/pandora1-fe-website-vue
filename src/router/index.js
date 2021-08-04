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
    console.log(45, titles)
    titles.forEach(async m => {
      if (m.name !== '首页') {
        const { rows: Datas } = await searchListService({
          keyWord: `^navigationId=${m.id}`,
          page: '1^100',
          date: '',
          sort: '',
          status: [2]
        })
        console.log(111111111, Datas)
        m.firstItem = Datas[0]

        if (
          m.firstItem.fullUrl.indexOf('mp4') !== -1 ||
          m.firstItem.fullUrl.indexOf('mkv') !== -1 ||
          m.firstItem.fullUrl.indexOf('mov') !== -1 ||
          m.firstItem.fullUrl.indexOf('m4v') !== -1 ||
          m.firstItem.fullUrl.indexOf('wmv') !== -1 ||
          m.firstItem.fullUrl.indexOf('avi') !== -1 ||
          m.firstItem.fullUrl.indexOf('flv') !== -1
        ) {
          m.firstUrl = '../assets/imgs/play.png'
        } else {
          m.firstUrl = Datas.length === 0 ? '' : Datas[0].fullUrl
        }

        m.ImgId = Datas.length === 0 ? '' : Datas[0].id
      }
    })
    setTimeout(() => {
      $store.commit(
        'setNavigationMenus',
        titles.filter(f => f.name !== '其他' && f.name !== '视频动画')
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
