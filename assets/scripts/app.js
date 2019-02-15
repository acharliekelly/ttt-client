'use strict'

// assets/scripts/app.js

const authUi = require('./auth/ui')
const gameEvents = require('./game/events')
const test = require('./test/events')

$(() => {
  // bind event handlers
  $('#resetBtn').on('click', gameEvents.onReset)
  // set click events for all .auth-enable buttons
  $('#authPanel .btn').on('click', authUi.modalForm)

  // $('#gameOptionsBtn').on('click', gameEvents.onOptions)

  // // show/hide/disable objects based on auth status
  authUi.refreshAuthElements()

  $('#test-signup').on('click', test.testSignUp)
  $('#test-login').on('click', test.testLogin)
})
