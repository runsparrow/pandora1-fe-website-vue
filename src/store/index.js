import Vue from 'vue'
import Vuex from 'vuex'
import state from '@x/state'
import getters from '@x/getters'
import mutations from '@x/mutations'
import actions from '@x/actions'
import user from '@x/modules/user-module'
import VuexPersistence from 'vuex-persist'

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
  plugins: [vuexLocal.plugin]
})
