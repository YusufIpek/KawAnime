'use strict'

const _ = require('lodash')

const generateEnv = require('./generateEnv.js')

const isServer = process.env.KAWANIME_SERVER === 'true'

const setup = (app) => {
  generateEnv()

  let routes = []

  const features = {
    config: require('./config'),
    env: require('./env'),
    history: require('./history'),
    local: require('./local'),
    mal: require('./mal'),
    news: require('./news'),
    nyaa: require('./nyaa'),
    openExternal: isServer ? () => {} : require('./openExternal'),
    seasons: require('./seasons'),
    torrent: require('./torrent'),
    video: require('./video'),
    search: require('./search'),
    wl: require('./watchList')
  }

  _.each(features, (feature) => {
    _.each(feature, (route) => routes.push(route))
  })

  // auto update
  /* istanbul ignore next */
  if (!['KawAnime-test', 'development'].includes(process.env.NODE_ENV) && !(process.env.KAWANIME_SERVER === 'true')) {
    routes = require('./updater')(app, routes)
  }

  _.each(routes, (route) => route(app))
}

module.exports = setup
