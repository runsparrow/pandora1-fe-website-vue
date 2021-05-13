export default {
  setUserInfoMutation(state, payload) {
    state.userName = payload.userName
    state.memberId = payload.memberId
    state.token = payload.token
    state.expires = payload.expires
  },
  setActiveTab(state, payload) {
    state.activeTab = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  clearStore(state, payload) {
    state.userName = ''
    state.token = ''
    state.expires = 0
    state.activeTab = 1
  }
}
