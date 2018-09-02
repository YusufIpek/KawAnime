<template lang="pug">
  div {{ info.progress }}
</template>

<script>
export default {
  name: 'Torrent-Bar',

  props: {
    info: Object
  },

  methods: {
    toggleTorrent (id) {

    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
