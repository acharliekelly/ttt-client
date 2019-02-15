'use strict'
// main/utility.js

const store = require('../store')

// returns boolean value for whether token exists
const isAuthenticated = () => {
  if (store.user && store.user.token) return true
  return false
}

const userMessage = function (message) {
  $('#user-feedback').html(message).addClass('message')

  setTimeout(() => {
    $('#user-feedback').html('').removeClass('message')
  }, 5000)
}

const failure = function () {
  $('#user-feedback')
    .html('Something went wrong, please try again.')
    .addClass('error')

  setTimeout(() => {
    $('#user-feedback').html('').removeClass('error')
  }, 5000)
}

const errorMessage = function (message) {
  $('#user-feedback')
    .html('Error: ' + message)
    .addClass('error')

  setTimeout(() => {
    $('#user-feedback').html('').removeClass('error')
  }, 5000)
}

module.exports = {
  isAuthenticated,
  userMessage,
  failure,
  errorMessage
}
