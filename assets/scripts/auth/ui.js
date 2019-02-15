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
  const token = utils.isAuthenticated()
  console.log('refreshing auth with ' + (token ? '' : 'no') + ' token')
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
  $('#authenticationForm .form-group').hide()

  let target, title
  switch (currentOp) {
    case 'login':
      target = authEvents.onLoginSubmit
      $('#emailFieldEnclosure').show()
      $('#passwordFieldEnclosure').show()
      title = 'Login'
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

// Public
const authFail = () => {
  utils.errorMessage('Unable to authenticate')
  refreshAuthElements()
}

// Public
const loginSuccess = (responseData) => {
  const msg = 'Authentication successful'
  console.log(msg)
  store.user = responseData.user
  utils.userMessage(msg)
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
  modalForm,
  authFail,
  authenticationError,
  loginSuccess,
  changePasswordSuccess,
  signUpSuccess,
  signOutSuccess
}
