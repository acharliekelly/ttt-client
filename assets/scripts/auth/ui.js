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

// Public: check for token, update all elements
const refreshAuthElements = () => {
  const token = utils.isAuthenticated()
  // console.log('refreshing auth with ' + (token ? '' : 'no') + ' token')
  $('.auth-token').toggle(token)
  $('.no-token').toggle(!token)
  $('.auth-enable').prop('disabled', !token)
  if (!token) {
    clearUserData()
  }
}

const clearUserData = () => {
  $('#userEmail').html('')
  // Clear stats
  $('#playerStats li span').text('')
  $('#pastGames').children().empty()
}

// Public
const authFail = () => {
  utils.errorMessage('Unable to authenticate')
  refreshAuthElements()
}

// Public
const loginSuccess = (responseData) => {
  const msg = 'Authentication successful'
  store.user = responseData.user
  utils.successMessage(msg)
  $('#userEmail').text(store.user.email)
  refreshAuthElements()
}

// Public
const authenticationError = () => {
  utils.errorMessage('Unable to authenticate')
}

// Public
const changePasswordSuccess = () => {
  utils.userMessage('Password changed.')
}

// Public
const signUpSuccess = (responseData) => {
  utils.userMessage(`Account created for "${responseData.user.email}".`)
  // TODO: automatically login after account creation
}

// Public
const signOutSuccess = () => {
  store.user = null
  utils.userMessage('You are signed out')
  refreshAuthElements()
}

module.exports = {
  refreshAuthElements,
  authFail,
  authenticationError,
  loginSuccess,
  changePasswordSuccess,
  signUpSuccess,
  signOutSuccess
}
