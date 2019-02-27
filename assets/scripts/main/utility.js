'use strict'
// main/utility.js

const config = require('../config')
const store = require('../store')
const themes = require('./theme')
// const test = require('../test/events')
const anti = require('../test/anti')

const ALLOW_ANTI_TEST = false

const watchButtonClicks = function (event, timestamp = Date.now()) {
  if (!ALLOW_ANTI_TEST) return false
  if (anti.incrementButtonCounter(event, timestamp)) {
    warningMessage('How\'s about you lighten up with all the clicking?')
  }
}

const getUserName = function (emailAddress) {
  let email = emailAddress
  if (!emailAddress) email = store.user.email
  if (!email) {
    return null
  } else {
    return email[0].toUpperCase() + email.substring(1, email.indexOf('@'))
  }
}

const getTestLogin = function () {
  // if (isTestMode()) {
  //   return test.testCredentials
  // } else {
  //
  // }
  return false
}

const isTestMode = function () {
  return (config.testMode === true)
}

// returns boolean value for whether token exists
const isAuthenticated = () => {
  return (store.user && store.user.token)
}

const userMessage = function (message, alertClass = 'info') {
  // toastMessage(message, 'Message')
  alertMessage(message, alertClass)
}

const warningMessage = function (message) {
  alertMessage(message, 'warning')
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

const fatalError = function () {
  alertMessage('You know what? Go fuck yourself!', 'danger', 5000)
}

const alertMessage = function (message, cls = 'info', timeout = 5000) {
  const html = `<div class="alert alert-${cls} fade show" role="alert" height="80%">${message}</div>`
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
  try {
    return parseInt(store.currentGame.id)
  } catch (e) {
    return 0
  }
}

// easier access to theme from other files
const getTheme = function () {
  return themes.getCurrentTheme()
}

const getMarkImage = function (mark) {
  const theme = themes.getCurrentTheme()
  const src = theme.path + mark.toLowerCase() + '.png'
  return `<img src="${src}" alt="${mark}" class="${mark}">`
}

const getMarkColor = function (mark) {
  const theme = themes.getCurrentTheme()
  return (mark === 'x' ? theme.xColor : theme.oColor)
}

// disallow game reset if new game started and no squares used
const allowReset = function () {
  if (!ALLOW_ANTI_TEST) return true
  const squaresUsed = $('#GameBoard .squares img').length
  const currentGame = $('#currentGame').text() // means old game was replayed
  const gameStatus = $('#gameStatus').text()
  if (currentGame !== '' ||
    gameStatus === 'Not Started' ||
    getCurrentGameId() === 0 ||
    squaresUsed > 0) {
    return true
  } else {
    // if none of those are true,
    // then there's already a new game created
    // and the user hasn't make a move yet,
    // is just clicking Reset for fun
    return false
  }
}

const refreshTheme = function () {
  themes.initTheme()
}

module.exports = {
  watchButtonClicks,
  getUserName,
  isTestMode,
  getTestLogin,
  isAuthenticated,
  userMessage,
  failure,
  errorMessage,
  warningMessage,
  successMessage,
  fatalError,
  toastMessage,
  getStoreValue,
  getCurrentGameId,
  getTheme,
  getMarkImage,
  getMarkColor,
  allowReset,
  refreshTheme
}
