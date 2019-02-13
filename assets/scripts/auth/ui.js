'use strict'

const store = require('../store')

const showAuthPanel = () => {
  $('.panel').hide()
  $('#auth-panel').show()
  $('#authentication-form').hide()
  if (store.user) {
    $('#auth-panel .auth-token').show().on('click', showAuthForm)
    $('#auth-panel .no-token').hide()
  } else {
    $('#auth-panel .auth-token').hide()
    $('#auth-panel .no-token').show().on('click', showAuthForm)
  }
}

const showAuthForm = (event) => {
  const btn = event.target.id
  const operation = btn.replace(/-button/, '')
  $('#authentication-form input').hide()

  if (operation !== 'signout') {
    $('#submit-button').show()
    $('#authentication-form').show()
    switch (operation) {
      case 'signup':
        $('#email-field').show()
        $('#password-field').show()
        $('#password-conf-field').show()
        break
      case 'login':
        $('#email-field').show()
        $('#password-field').show()
        break
      case 'changepw':
        $('#old-password-field').show()
        $('#new-password-field').show()
    }
  }
}

module.exports = {
  showAuthPanel,
  showAuthForm
}
