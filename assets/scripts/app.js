'use strict'

// assets/scripts/app.js

const authUi = require('./auth/ui')
const gameEvents = require('./game/events')

$(() => {
  // bind event handlers
  $('#resetBtn').on('click', gameEvents.onReset)
  // set click events for all .auth-enable buttons
  $('#authPanel .btn').on('click', authUi.modalForm)
  $('#GameBoard .square')
    .on('click', gameEvents.onClickSquare)
    .on('mouseover', gameEvents.onHoverSquare)
    .on('mouseout', gameEvents.onLeaveSquare)

  $('#refreshBtn').on('click', authUi.refreshAuthElements)

  // $('#gameOptionsBtn').on('click', gameEvents.onOptions)

  // // show/hide/disable objects based on auth status
  authUi.refreshAuthElements()
})
