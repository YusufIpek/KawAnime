export default {
  set (state, data) {
    state.torrents = data
  },
  setClient (state, data) {
    state.client = data
  },
  setPath (state, data) {
    state.cllient.path = data
  }
}
