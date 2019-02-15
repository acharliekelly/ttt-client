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
const authEvents = require('./events')
const utils = require('../main/utility')

// Public: check for token, update all elements
const refreshAuthElements = () => {
  const token = authEvents.isAuthenticated()
  $('.auth-token').toggle(token)
  $('.no-token').toggle(!token)
  $('.auth-enable').prop('disabled', !token)
  if (!token) {
    clearUserData()
  }
}

const clearUserData = () => {
  $('#userEmail').html('')
  $('#playerStats').html('')
}

// Public: set fields and target of modal auth form; show form
const modalForm = (event) => {
  const btn = $(event.target)
  const currentOp = btn.data('operation')
  $('#authOperation').val(currentOp)
  $('#authenticationForm .field-enclosure').hide()

  let target
  switch (currentOp) {
    case 'login':
      target = authEvents.onLoginSubmit
      $('#emailFieldEnclosure').show()
      $('#passwordFieldEnclosure').show()
      break
    case 'signup':
      target = authEvents.onSignupSubmit
      $('#emailFieldEnclosure').show()
      $('#passwordFieldEnclosure').show()
      $('#passwordConfFieldEnclosure').show()
      break
    case 'changepw':
      target = authEvents.onChangePasswordSubmit
      $('#oldPasswordFieldEnclosure').show()
      $('#newPasswordFieldEnclosure').show()
      break
    case 'signout':
      target = authEvents.onSignoutConfirm
      $('#signoutConfirmEnclosure').show()
  }
  $('#authenticationForm').on('submit', target)
  $('authSubmitBtn').on('click', () => {
    $('#authenticationForm').submit()
  })

  $('#authModal').modal('show')
}

// Public
const authFail = () => {
  utils.errorMessage('Unable to authenticate')
  refreshAuthElements()
}

// Public
const authenticationSuccess = (responseData) => {
  const msg = 'Authentication successful'
  console.log(msg)
  store.user = responseData.user
  utils.userMessage(msg)
  refreshAuthElements()
  $('#authForm').modal('hide')
  $('#userEmail').text(store.user.email)
}

// Public
const authenticationError = () => {
  utils.errorMessage('Unable to authenticate')
}

// Public
const changePasswordSuccess = () => {
  utils.userMessage('Password changed.')

  $('#authForm').modal('hide')
}

// Public
const signUpSuccess = (responseData) => {
  utils.userMessage(`Account created for "${responseData.user.email}".`)
  // TODO: automatically login after account creation
  $('#authForm').modal('hide')
}

// Public
const signOutSuccess = () => {
  store.user = null
  utils.userMessage('You are signed out')
  $('#authForm').modal('hide')
  refreshAuthElements()
}

module.exports = {
  refreshAuthElements,
  modalForm,
  authFail,
  authenticationError,
  authenticationSuccess,
  changePasswordSuccess,
  signUpSuccess,
  signOutSuccess
}
