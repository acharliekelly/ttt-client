'use strict'

const events = require('./events')
const gameUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

const onOptions = function (event) {
  $('.panel').hide()
  $('#game-options-panel').show()

  $('#opt-players-both').on('click', function () {
    $('#human-player-select').hide()
  })
  $('#opt-players-computer').on('click', function () {
    $('#human-player-select').show()
  })

  $('#optionsForm').on('submit', events.onOptionSubmit)
}

const onOptionSubmit = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log('submitting options form', formData)
  gameUi.drawBoard()
  gameUi.showGameBoard()
  gameUi.initGame()
  events.onInitBoard()
}

module.exports = {
  onOptions,
  onOptionSubmit
}
