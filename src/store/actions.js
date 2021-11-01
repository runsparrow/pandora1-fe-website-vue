import router from '@/router/index'
const actions = {
  logout({ commit }) {
    commit('clearStore')
    localStorage.clear()
    router.push('/home')
  }
}
export default actions
