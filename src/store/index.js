import Vue from 'vue'
import Vuex from 'vuex'
import state from '@x/state'
import mutations from '@x/mutations'
import actions from '@x/actions'
import user from '@x/modules/user-module'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user
  }
})
