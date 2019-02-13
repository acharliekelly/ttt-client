'use strict'

const store = require('../store')

const showAuthPanel = () => {
  $('.panel').hide()
  $('#auth-panel').show()
  $('#authentication-form').hide()
  $('#auth-panel .auth-token').toggle(store.user)
  $('#auth-panel .no-token').toggle(!store.user)
  $('#auth-panel .auth-buttons button').on('click', showAuthForm)
}

const showAuthForm = (event) => {
  const btn = event.target.id
  const operation = btn.replace(/-button/, '')
  $('#authentication-form .field-enclosure').hide()

  if (operation !== 'signout') {
    $('#submit-button').show()
    $('#authentication-form').show()
    switch (operation) {
      case 'signup':
        $('#email-field-enclosure').show()
        $('#password-field-enclosure').show()
        $('#password-conf-field-enclosure').show()
        break
      case 'login':
        $('#email-field-enclosure').show()
        $('#password-field-enclosure').show()
        break
      case 'changepw':
        $('#old-password-field-enclosure').show()
        $('#new-password-field-enclosure').show()
    }
  }
}

module.exports = {
  showAuthPanel,
  showAuthForm
}
