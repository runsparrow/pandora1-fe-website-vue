export default {
  setUserInfoMutation(state, payload) {
    state.userName = payload.userName
    state.memberId = payload.memberId
    state.token = payload.token
    state.expires = payload.expires
    state.avatarUrl = payload.avatarUrl
    state.levelDeadline = payload.levelDeadline
    state.level = payload.level
  },
  setActiveTab(state, payload) {
    state.activeTab = payload
  },
  setlevelDeadline(state, payload) {
    state.levelDeadline = payload
  },
  setAvatarUrl(state, payload) {
    state.avatarUrl = payload
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
  setimgIndex(state, payload) {
    state.imgIndex = payload
  },
  setVipList(state, payload) {
    state.vipList = payload
  },
  setminePageIndex(state, payload) {
    state.outer_tabIndex = payload
  },
  clearStore(state, payload) {
    state.userName = ''
    state.token = ''
    state.expires = 0
    state.activeTab = 1
  }
}
