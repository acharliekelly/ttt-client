'use strict'

const store = require('../store')
const config = require('../config')
const authApi = require('./api')
const authUi = require('./ui')

const onLoad = () => {
  $('.panel').hide()
  authUi.showAuthPanel()
}

const isAuthenticated = () => {
  return (store.user)
}

module.exports = {
  onLoad,
  isAuthenticated
}
