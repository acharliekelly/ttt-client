'use strict'
// /app.js
//
// Controller for event handlers
//
// const config = require('./config')
const authUi = require('./auth/ui')
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const options = require('./main/options')
const utils = require('./main/utility')

$(() => {
  // Event Handlers

  // Game Reset button
  $('#resetBtn').on('click', (event) => {
    if (utils.watchButtonClicks(event)) {
      utils.warningMessage('How about you lighten up with all the clicking?')
    } else {
      gameEvents.onReset()
    }
  })

  // set click events for all the modal form buttons
  $('.modal-btn').on('click', modalForm)

  // just sign out, no need to confirm
  $('#signoutBtn').on('click', authEvents.onSignoutConfirm)

  // get player stats
  $('#statsBtn').on('click', gameEvents.onPlayerStats)

  $('#pastGames').on('click', 'button', gameEvents.onShowGame)

  $('#finishedGamesBtn').on('click', gameEvents.onGetFinishedGames)

  $('#unfinishedGamesBtn').on('click', gameEvents.onGetUnfinishedGames)

  $('#gameOptionsBtn').on('click', options.onOptionsClick)
  $('#optionsForm').on('submit', options.onOptionSubmit)
  $('#optionSubmitBtn').on('click', () => {
    $('#optionsForm').trigger('submit')
  })

  utils.refreshTheme()
  // // show/hide/disable objects based on auth status
  authUi.refreshAuthElements()

  initBoardBindings() // initialize game board
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
      if (utils.isTestMode()) {
        $('#emailField').val(utils.getTestLogin().email)
        $('#passwordField').val(utils.getTestLogin().pw)
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
    case 'options': // removed
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
    $('#modalForm').html('') // remove form content
  })

  // finally, display the modal form
  $('#modalFormDialog').modal('show')
}

// set bindings, but disable board until game started
const initBoardBindings = function () {
  $('#GameBoard .square')
    .on('click', gameEvents.onClickSquare)
    .on('mouseover', gameEvents.onHoverSquare)
    .on('mouseout', gameEvents.onLeaveSquare)
    .css('background-color', utils.getTheme().disableSquare)
    .data('enabled', 'false')
}
