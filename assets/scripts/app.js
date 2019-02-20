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
      utils.warningMessage('How about you relax with all the clicking?')
      $('#resetBtn').attr('diabled', true)
      setTimeout(() => {
        $('#resetBtn').attr('disabled', false)
      }, 5000)
    } else {
      gameEvents.onReset()
    }
  })

  // ALL EXPLICIT!!!
  //
  // // set click events for all the modal form buttons
  // $('.modal-btn').on('click', function (event) {
  //   $(this).data('target').modal('show')
  // })

  $('#modalLoginForm').on('submit', authEvents.onLoginSubmit)
  $('#modalSignupForm').on('submit', authEvents.onSignupSubmit)
  $('#modalChangePasswordForm').on('submit', authEvents.onChangePasswordSubmit)

  $('#modalLoginSubmitBtn').on('click', () => {
    $('#modalLoginForm').trigger('submit')
    $('#modalLoginFormDialog').modal('hide')
  })

  $('#modalSignupSubmitBtn').on('click', () => {
    $('#modalSignupForm').trigger('submit')
    $('#modalSignupFormDialog').modal('hide')
  })

  $('#modalChangePasswordSubmitBtn').on('click', () => {
    $('#modalChangePasswordForm').trigger('submit')
    $('#modalChangePasswordFormDialog').modal('hide')
  })

  // $('.modal-submit').on('click', function (event) {
  //   $(this).data('target').trigger('submit')
  //   $(this).parent('modal').modal('hide')
  // })

  // just sign out, no need to confirm
  $('#signoutBtn').on('click', authEvents.onSignoutConfirm)

  // get player stats
  $('#statsBtn').on('click', gameEvents.onPlayerStats)

  $('#pastGames').on('click', 'button', gameEvents.onShowGame)

  $('#finishedGamesBtn').on('click', gameEvents.onGetFinishedGames)

  $('#unfinishedGamesBtn').on('click', gameEvents.onGetUnfinishedGames)

  $('#gameOptionsBtn').on('click', options.onOptionsClick)
  $('#primaryThemeBtn').on('click', options.onPrimaryThemeClick)
  $('#minimalThemeBtn').on('click', options.onMinimalThemeClick)
  $('#gothicThemeBtn').on('click', options.onGothicThemeClick)

  utils.refreshTheme()
  // // show/hide/disable objects based on auth status
  authUi.refreshAuthElements()

  initBoardBindings() // initialize game board
})

// set bindings, but disable board until game started
const initBoardBindings = function () {
  $('#GameBoard .square')
    .on('click', gameEvents.onClickSquare)
    .on('mouseover', gameEvents.onHoverSquare)
    .on('mouseout', gameEvents.onLeaveSquare)
    .css('background-color', utils.getTheme().disableSquare)
    .data('enabled', 'false')
}
