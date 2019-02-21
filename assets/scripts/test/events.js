'use strict'

// /test/events.js

const authApi = require('../auth/api')
const authUi = require('../auth/ui')
// const gameUi = require('../game/ui')
// const store = require('../store')

const TEST_EMAIL = 'tictactoe@cantimaginewhy.com'
const TEST_PW = 'password'

const testCredentials = {
  email: TEST_EMAIL,
  password: TEST_PW
}

const testSignUp = () => {
  // console.log('Testing SignUp')
  const formData = {
    credentials: {
      email: TEST_EMAIL,
      password: TEST_PW,
      password_confirmation: TEST_PW
    }
  }
  authApi.signUp(formData)
    .then(authUi.authenticationSuccess)
    .catch(function () {
      // console.log('Test Login failed')
      authUi.authenticationError()
    })
}

const testSignIn = () => {
  // console.log('Testing Login')
  const formData = {
    credentials: {
      email: TEST_EMAIL,
      password: TEST_PW
    }
  }
  authApi.signIn(formData)
    .then(authUi.authenticationSuccess)
    .catch(function () {
      // console.log('Test Login failed')
      authUi.authFail()
    })
}

module.exports = {
  testSignIn,
  testSignUp,
  testCredentials
}
