'use strict'

// assets/scripts/app.js
const config = require('./config')
const authUi = require('./auth/ui')
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')

$(() => {
  // bind event handlers
  $('#resetBtn').on('click', () => {
    initBoardBindings()
    gameEvents.onReset()
  })
  // set click events for all .auth-enable buttons
  $('#authPanel .btn').on('click', modalForm)

  $('#statsBtn').on('click', gameEvents.onPlayerStats)

  $('#finishedGamesBtn').on('click', gameEvents.onGetFinishedGames)

  $('#unfinishedGamesBtn').on('click', gameEvents.onGetUnfinishedGames)

  // $('#refreshBtn').on('click', authUi.refreshAuthElements)

  // $('#gameOptionsBtn').on('click', gameEvents.onOptions)

  // // show/hide/disable objects based on auth status
  authUi.refreshAuthElements()
})

const modalForm = (event) => {
  const btn = $(event.target)
  const currentOp = btn.data('operation')
  $('#authOperation').val(currentOp)
  $('#authenticationForm .form-group').hide()

  let target, title
  switch (currentOp) {
    case 'login':
      target = authEvents.onLoginSubmit
      $('#emailFieldEnclosure').show()
      $('#passwordFieldEnclosure').show()
      title = 'Login'
      if (config.testMode) {
        $('#emailField').val('tictactoe@cantimaginewhy.com')
        $('#passwordField').val('password')
      }
      break
    case 'signup':
      target = authEvents.onSignupSubmit
      $('#emailFieldEnclosure').show()
      $('#passwordFieldEnclosure').show()
      $('#passwordConfFieldEnclosure').show()
      title = 'Sign Up'
      break
    case 'changepw':
      target = authEvents.onChangePasswordSubmit
      $('#oldPasswordFieldEnclosure').show()
      $('#newPasswordFieldEnclosure').show()
      title = 'Change Password'
      break
    case 'signout':
      target = authEvents.onSignoutConfirm
      $('#signoutConfirmEnclosure').show()
      title = 'Sign Out'
  }
  $('#authModalTitle').text(title)
  $('#authenticationForm').on('submit', target)

  // make this button submit the modal form and also close the modal
  $('#authSubmitBtn').on('click', () => {
    $('#authenticationForm').submit()
    $('#authModal').modal('hide')
  })

  $('#authModal').modal('show')
}

const initBoardBindings = function () {
  $('#GameBoard .square')
    .on('click', gameEvents.onClickSquare)
    .on('mouseover', gameEvents.onHoverSquare)
    .on('mouseout', gameEvents.onLeaveSquare)
    .css('background-color', gameEvents.SQUARE_BACKGROUND_COLOR)
    .data('enabled', 'true')
}
