'use strict'

// assets/scripts/app.js
const config = require('./config')
const authUi = require('./auth/ui')
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const options = require('./main/options')

const testLogin = {
  email: 'tictactoe@cantimaginewhy.com',
  pw: 'password'
}

$(() => {
  // Event Handlers

  // Game Reset button
  $('#resetBtn').on('click', () => {
    initBoardBindings() // initialize game board
    gameEvents.onReset()
  })

  // set click events for all the modal form buttons
  $('.modal-btn').on('click', modalForm)

  // just sign out, no need to confirm
  $('#signoutBtn').on('click', authEvents.onSignoutConfirm)

  // get player stats
  $('#statsBtn').on('click', gameEvents.onPlayerStats)

  $('#finishedGamesBtn').on('click', gameEvents.onGetFinishedGames)

  $('#unfinishedGamesBtn').on('click', gameEvents.onGetUnfinishedGames)

  // // show/hide/disable objects based on auth status
  authUi.refreshAuthElements()
})

const modalForm = (event) => {
  const btn = $(event.target)
  const form = btn.data('form')
  const formId = form + 'FormContent'
  $('#modalForm').load('public/snippets/forms.html #' + formId)
  let target, title
  switch (form) {
    case 'login':
      target = authEvents.onLoginSubmit
      title = 'Login'
      if (config.testMode) {
        $('#emailField').val(testLogin.email)
        $('#passwordField').val(testLogin.pw)
      }
      break
    case 'signup':
      target = authEvents.onSignupSubmit
      title = 'Sign Up'
      break
    case 'changePassword':
      target = authEvents.onChangePasswordSubmit
      title = 'Change Password'
      break
    case 'options':
      target = options.onOptionSubmit
      title = 'Game Options'
      // options.loadThemeOptions('radio')
      break
  }
  // set the modal title and form target according to which button was clicked
  $('#modalTitle').text(title)
  $('#modalForm').on('submit', target)

  // make the modal submit button submit the form, and also close the modal
  $('#modalSubmitBtn').on('click', () => {
    $('#modalForm').trigger('submit')
    $('#modalFormDialog').modal('hide')
  })

  // finally, display the modal form
  $('#modalFormDialog').modal('show')
}

const initBoardBindings = function () {
  $('#GameBoard .square')
    .on('click', gameEvents.onClickSquare)
    .on('mouseover', gameEvents.onHoverSquare)
    .on('mouseout', gameEvents.onLeaveSquare)
    .css('background-color', gameEvents.SQUARE_BACKGROUND_COLOR)
    .data('enabled', 'true')
}

// const modalAuthForm = (event) => {
//   const btn = $(event.target)
//   const currentOp = btn.data('operation')
//   $('#authOperation').val(currentOp)
//   $('#authenticationForm .form-group').hide()
//
//   let target, title
//   switch (currentOp) {
//     case 'login':
//       target = authEvents.onLoginSubmit
//       $('#emailFieldEnclosure').show()
//       $('#passwordFieldEnclosure').show()
//       title = 'Login'
//       if (config.testMode) {
//         $('#emailField').val(testLogin.email)
//         $('#passwordField').val(testLogin.pw)
//       }
//       break
//     case 'signup':
//       target = authEvents.onSignupSubmit
//       $('#emailFieldEnclosure').show()
//       $('#passwordFieldEnclosure').show()
//       $('#passwordConfFieldEnclosure').show()
//       title = 'Sign Up'
//       break
//     case 'changepw':
//       target = authEvents.onChangePasswordSubmit
//       $('#oldPasswordFieldEnclosure').show()
//       $('#newPasswordFieldEnclosure').show()
//       title = 'Change Password'
//   }
//   $('#authModalTitle').text(title)
//   $('#authenticationForm').on('submit', target)
//
//   // make this button submit the modal form and also close the modal
//   $('#authSubmitBtn').on('click', () => {
//     $('#authenticationForm').submit()
//     $('#authModal').modal('hide')
//   })
//
//   $('#authModal').modal('show')
// }
