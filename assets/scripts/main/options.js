'use strict'
// main/options.js

const events = require('./events')
const gameUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onOptionsButton = function (event) {
  console.log('options button clicked')
  // TODO: show options
}

const onOptionSubmit = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log('submitting options form', formData)
  // gameUi.drawBoard()
  // gameUi.showGameBoard()
  gameUi.initGame()
  events.onInitBoard()
}

module.exports = {
  onOptionsButton,
  onOptionSubmit
}
