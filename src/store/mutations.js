export default {
  setUserInfoMutation(state, payload) {
    state.userName = payload.userName
    state.token = payload.token
  }
}
