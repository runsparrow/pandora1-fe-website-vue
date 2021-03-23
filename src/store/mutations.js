export default {
  setUserInfoMutation(state, payload) {
    state.userName = payload.userName
    state.token = payload.token
    state.expires = payload.expires
  },
  setActiveTab(state, payload) {
    state.activeTab = payload
  },
  clearStore(state, payload) {
    state.userName = ''
    state.token = ''
    state.expires = 0
    state.activeTab = 1
  }
}
