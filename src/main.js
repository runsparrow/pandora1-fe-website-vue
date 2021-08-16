import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@a/css/index.scss'
import 'swiper/swiper-bundle.css'
import VueMessage from 'vue-messages'

Vue.config.productionTip = false
Vue.use(VueMessage, {
  content: '',
  duration: 1, // unit: s
  themes: 'blackGold', // classic or classicBold
  styles: {
    top: 24, // unit: px
    fontWeight: 'normal' // normal or bold
  },
  before() {
    console.log('custom before hook')
  },
  done() {
    console.log('custom done hook')
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
