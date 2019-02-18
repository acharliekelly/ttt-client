'use strict'

const TEST_MODE = true

let testMode

let apiUrl
const apiUrls = {
  development: 'https://tic-tac-toe-wdi.herokuapp.com',
  production: 'https://tic-tac-toe-wdi-production.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
  testMode = TEST_MODE
} else {
  apiUrl = apiUrls.production
  testMode = false
}

module.exports = {
  apiUrl,
  testMode
}
