'use strict'

// auth/events.js
// Controller for Authentication requests

const authApi = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const utils = require('../main/utility')

const onLoginSubmit = (event) => {
  const formData = getFormData(event)
  // authApi.signIn(formData)
  //   .then(authUi.loginSuccess)
  //   .catch(authUi.authFail)
  // if authUi.loginSuccess not working,
  authApi.signIn(formData)
    .then((responseData) => {
      const msg = 'Login successful'
      console.log(msg)
      store.user = responseData.user
      utils.userMessage(msg)
      $('#userEmail').text(store.user.email)
    }).catch(ui.authFail)
}

const onSignupSubmit = (event) => {
  const formData = getFormData(event)
  authApi.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.authFail)
}

const onChangePasswordSubmit = (event) => {
  const formData = getFormData(event)
  authApi.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.authenticationError)
}

const onSignoutConfirm = (event) => {
  event.preventDefault()
  authApi.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.authenticationError)
}

const getFormData = (event) => {
  event.preventDefault()
  return getFormFields(event.target)
}

module.exports = {
  onSignupSubmit,
  onLoginSubmit,
  onChangePasswordSubmit,
  onSignoutConfirm
}
