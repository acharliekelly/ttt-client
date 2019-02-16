'use strict'
// main/utility.js

const store = require('../store')

// returns boolean value for whether token exists
const isAuthenticated = () => {
  if (store.user) {
    console.log('User #' + store.user.id)
    if (store.user.token) {
      console.log('Token: ' + store.user.token)
      return true
    }
  }
  return false
}

const userMessage = function (message) {
  $('#userMessage').html(message).addClass('message')

  setTimeout(() => {
    $('#userMessage').html('').removeClass('message')
  }, 5000)
}

const failure = function () {
  $('#userMessage')
    .html('Something went wrong, please try again.')
    .addClass('error')

  setTimeout(() => {
    $('#userMessage').html('').removeClass('error')
  }, 5000)
}

const errorMessage = function (message) {
  $('#userMessage')
    .html('Error: ' + message)
    .addClass('error')

  setTimeout(() => {
    $('#userMessage').html('').removeClass('error')
  }, 5000)
}

module.exports = {
  isAuthenticated,
  userMessage,
  failure,
  errorMessage
}
