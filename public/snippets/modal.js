
const modalForm = (event) => {
  const btn = $(event.target)
  const form = btn.data('form')
  const formId = form + 'FormContent'
  $('#modalForm').load('public/snippets/forms.html #' + formId)
  let target, title
  switch (form) {
    case 'login':
      target = authEvents.onLoginSubmit
      title = 'Login'
      if (utils.isTestMode()) {
        $('#emailField').val(utils.getTestLogin().email)
        $('#passwordField').val(utils.getTestLogin().pw)
      }
      break
    case 'signup':
      target = authEvents.onSignupSubmit
      title = 'Sign Up'
      break
    case 'changePassword':
      target = authEvents.onChangePasswordSubmit
      title = 'Change Password'
      break
    case 'options': // removed
      target = options.onOptionSubmit
      title = 'Game Options'
      // options.loadThemeOptions('radio')
      break
  }
  // set the modal title and form target according to which button was clicked
  $('#modalTitle').text(title)
  $('#modalForm').on('submit', target)

  // make the modal submit button submit the form, and also close the modal
  $('#modalSubmitBtn').on('click', () => {
    $('#modalForm').trigger('submit')
    $('#modalFormDialog').modal('hide')
    $('#modalForm').html('') // remove form content
  })

  // finally, display the modal form
  $('#modalFormDialog').modal('show')
}
