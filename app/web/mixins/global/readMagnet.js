export default {
  mounted () {
    document.addEventListener('paste', this.handlePaste)
  },

  beforeDestroy () {
    document.removeEventListener('paste', this.handlePaste)
  },

  computed: {
    isClientPage () {
      return this.$route.path === '/torrenting'
    }
  },

  methods: {
    handlePaste (e) {
      const text = e.clipboardData.getData('text')

      if (/magnet:\?/.test(text)) {
        e.preventDefault()

        if (this.isClientPage) {
          this.$store.dispatch('torrents/addTorrent', text)
        } else {
          this.$store.commit('streaming/play', {
            show: true,
            link: {
              link: text
            }
          })
        }
      }
    }
  }
}
