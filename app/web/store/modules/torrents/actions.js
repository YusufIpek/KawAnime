import {axios} from 'store/utils'

export default {
  async getData ({commit}) {
    try {
      const { data: { client, torrents }, status } = await axios.get('torrent/info')

      if (status === 200) {
        commit('set', torrents)
        commit('setClient', client)
      }
    } catch (e) { void e }
  },

  async addTorrent ({state}, torrent) {
    // torrent should either be a object with a path and a torrent keys
    // or simply a torrent type to feed the client.
    const params = typeof torrent === 'object'
      ? torrent
      : {
        magnet: torrent,
        path: state.client.path
      }

    const { status } = await axios.get('torrent/add', { params })

    if (status !== 200) {
      // TODO handle error
    }
  },

  async toggle ({state}, params) {
    try {
      await this.$axios.get('torrent/toggle', {
        params
      })
    } catch (e) { void e }
  }
}
