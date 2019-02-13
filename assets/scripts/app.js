'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./tic/events')
const authUi = require('./auth/ui')
const options = require('./tic/options')

$(() => {
  // $('.panel').hide() // hidden by CSS
  // show login form if no token exists

  $('#auth-btn').on('click', authUi.showAuthPanel)
  $('#game-btn').on('click', events.onShowGameBoard)
  $('#options-btn').on('click', options.onOptions)

  // put this somewhere else
  $('#reset-button').on('click', events.onReset)
})
