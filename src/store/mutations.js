export default {
  setUserInfoMutation(state, payload) {
    state.userName = payload.userName
    state.memberId = payload.memberId
    state.token = payload.token
    state.expires = payload.expires
    state.levelDeadline = payload.levelDeadline
  },
  setActiveTab(state, payload) {
    state.activeTab = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setNavigationId(state, payload) {
    state.navigationId = payload
  },
  setNavigationMenus(state, payload) {
    state.navigationsMenus = payload
  },
  setKeyWords(state, payload) {
    state.keywords = payload
  },
  setVipList(state, payload) {
    state.vipList = payload
  },
  clearStore(state, payload) {
    state.userName = ''
    state.token = ''
    state.expires = 0
    state.activeTab = 1
  }
}
