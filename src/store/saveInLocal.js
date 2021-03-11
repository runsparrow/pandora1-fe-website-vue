export default store => {
  if (localStorage.state) {
    store.replace(JSON.parse(localStorage.state))
  }
  store.subscribe((mutation, state) => {
    localStorage.state = JSON.stringify(state)
  })
}
