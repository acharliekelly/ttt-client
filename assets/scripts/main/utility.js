'use strict'
// main/utility.js

const store = require('../store')
const themes = require('./theme.js')

// returns boolean value for whether token exists
const isAuthenticated = () => {
  return (store.user && store.user.token)
}

const userMessage = function (message, alertClass = 'info') {
  // toastMessage(message, 'Message')
  alertMessage(message, alertClass)
}

const successMessage = function (message) {
  // toastMessage(message, 'Success', 'bg-success')
  alertMessage(message, 'success')
}

const failure = function () {
  errorMessage('Something went wrong, please try again.')
}

const errorMessage = function (message) {
  alertMessage(message, 'danger')
}

const alertMessage = function (message, cls = 'info', timeout = 5000) {
  const html = `<div class="alert alert-${cls} fade show" role="alert">${message}</div>`
  $('#userMessage').html(html).alert()
  setTimeout(() => {
    $('#userMessage')
      .alert('close')
      .html('')
  }, timeout)
}

/**  NOT WORKING
 * toastMessage - sends Bootstrap Toast message to #userMessage element
 * @param  {type} message          description
 * @param  {type} title            description
 * @param  {type} type = 'default' description
 * @param  {type} timeout = 5000   description
 * @return {type}                  description
 */
const toastMessage = function (message, title, header = 'bg-info', timeout = 5000) {
  $('#userMessage').load('public/snippets/toast.html', function () {
    if (timeout !== 5000) {
      $('#userMessage .toast').data('delay', timeout)
    }
    if (header !== 'bg-info') {
      $('#userMessage .toast-header').removeClass('bg-info').addClass(header)
    }
    $('#userMessage .toast .mr-auto').text(title)
    $('#userMessage .toast-body').html(message)
    $('#userMessage .toast').toast('show')
  })
}

const getStoreValue = function (propertyName) {
  const value = store[propertyName]
  if (value !== undefined) {
    return value
  } else {
    return null
  }
}

const getCurrentGameId = function () {
  if (store.currentGame && store.currentGame.id) {
    return store.currentGame.id
  } else {
    return 0
  }
}

// easier access to theme from other files
const getTheme = function () {
  return themes.getCurrentTheme()
}

module.exports = {
  isAuthenticated,
  userMessage,
  failure,
  errorMessage,
  successMessage,
  toastMessage,
  getStoreValue,
  getCurrentGameId,
  getTheme
}
