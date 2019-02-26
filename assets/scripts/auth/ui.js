'use strict'

// auth/ui.js

/*****************************
 * Auth UI - should be sole source
 * of display for Auth Panel &
 * modal Auth Form
 *
 *
 *
 *****************************/

const store = require('../store')
// const authEvents = require('./events') // circular reference
const utils = require('../main/utility')
const gameUi = require('../game/ui')

// Public: check for token, update all elements
const refreshAuthElements = () => {
  const token = utils.isAuthenticated()
  if (token) {
    // logged in
    $('.auth-token').show()
    $('.no-token').hide()
    $('.auth-enable').prop('disabled', false)
  } else {
    // not logged in
    $('.auth-token').hide()
    $('.no-token').show()
    $('.auth-enable').prop('disabled', true)
    clearUserData()
    gameUi.clearBoard(false) // disable squares
  }
}

const clearUserData = () => {
  if (store.currentGame) store.currentGame = null
  $('#userEmail').html('')
  // Clear stats
  $('#playerStats li span').text('')
  $('#pastGames').children().empty()
}

// Public
const authFail = () => {
  utils.errorMessage('Unable to log in')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
  refreshAuthElements()
}

// Public
const loginSuccess = (responseData) => {
  const email = responseData.user.email
  const name = email[0].toUpperCase() + email.substring(1, email.indexOf('@'))
  const msg = `Welcome back, ${name}!`
  store.user = responseData.user
  utils.successMessage(msg)
  $('#userEmail').text(store.user.email)
  refreshAuthElements()
  $('#statsBtn').trigger('click')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

// Public
const authenticationError = () => {
  utils.errorMessage('Unable to authenticate')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

// Public
const changePasswordSuccess = () => {
  utils.userMessage('Password changed.')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

// Public
const signUpSuccess = (responseData) => {
  utils.userMessage(`Account created for "${responseData.user.email}".`)
  // TODO: automatically login after account creation
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
}

// Public
const signOutSuccess = () => {
  store.user = null
  utils.userMessage('You are signed out')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
  refreshAuthElements()
}

// Public
const signOutFail = () => {
  store.user = null
  utils.userMessage('OK, technically the sign-out failed, but the effect is the same.', 'warning')
  $('#modalFormDialog').modal('hide')
  $('#modalForm').html('')
  refreshAuthElements()
}

module.exports = {
  refreshAuthElements,
  authFail,
  authenticationError,
  loginSuccess,
  changePasswordSuccess,
  signUpSuccess,
  signOutSuccess,
  signOutFail
}
