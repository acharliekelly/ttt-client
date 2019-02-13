'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const gameEvents = require('./game/events')
const authUi = require('./auth/ui')
// const players = require('./game/player')

$(() => {
  $('.panel').hide()

  $('#options-btn').on('click', function () {
    $('.panel').hide()
    $('#game-options-panel').show()
  })
  $('#auth-btn').on('click', authUi.showAuthPanel)
  $('#game-btn').on('click', gameEvents.onShowGameBoard)

  $('#opt-players-both').on('click', function () {
    $('#human-player-select').hide()
  })
  $('#opt-players-computer').on('click', function () {
    $('#human-player-select').show()
  })

  $('#optionsForm').on('submit', gameEvents.onOptionSubmit)
  //
  $('#reset-button').on('click', function () {
    const size = $('#GameBoard').attr('data-size')
    gameEvents.onReset(size)
  })

  $('#options-button').on('click', gameEvents.onOptions)
})
