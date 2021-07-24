import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import state from '@x/state'
import getters from '@x/getters'
import mutations from '@x/mutations'
import actions from '@x/actions'
import user from '@x/modules/user-module'

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 0.08
    })
})

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [vuexCookie.plugin, vuexLocal.plugin]
})
