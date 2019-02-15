'use strict'

// auth/events.js
// Controller for Authentication requests

const authApi = require('./api')
const authUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const utils = require('../main/utility')

const onLoginSubmit = (event) => {
  const formData = getFormData(event)
  authApi.signIn(formData)
    .then(function (responseData) {
      // because loginSuccess isn't working
      const msg = 'Login successful'
      console.log(msg)
      store.user = responseData.user
      utils.userMessage(msg)
      $('#userEmail').text(store.user.email)
      // authUi.loginSuccess
    })
    .catch(authUi.authFail)
}

const onSignupSubmit = (event) => {
  const formData = getFormData(event)
  authApi.signUp(formData)
    .then(authUi.signUpSuccess)
    .catch(authUi.authFail)
}

const onChangePasswordSubmit = (event) => {
  const formData = getFormData(event)
  authApi.changePassword(formData)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.authenticationError)
}

const onSignoutConfirm = (event) => {
  event.preventDefault()
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.authenticationError)
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
