'use strict'
// main/options.js

const themes = require('./theme.js')

const onOptionsClick = function (event) {
  $('#optionsFormDialog').modal('show')
}

const onOptionSubmit = function (event) {
  event.preventDefault()
  // don't actually need formData since currently only one option,
  // which does not require any API calls
  const newThemeId = $('#themeSelect').val()
  console.log('new theme id: ' + newThemeId)

  if (newThemeId !== themes.getCurrentTheme().id) {
    changeTheme(newThemeId)
  }

  $('#optionsFormDialog').modal('hide')
}

// not used - just use HTML for now
const loadThemeOptions = function (optionType) {
  $('#themeSelect').html('')
  const themeOptions = themes.availableThemes
  themeOptions.forEach((item) => {
    $('#themeSelect').append(themeOptionHtml(optionType, item))
  })
}

const themeOptionHtml = function (optionType, theme) {
  let html
  switch (optionType) {
    case 'select':
      html = `<option value="${theme.id}">${theme.name}</option>`
      break
    case 'radio':
      html = '<div class="form-check">'
      html += `<input class="form-check-input" type="radio" name="theme" id="theme${theme.name}" value="${theme.id}">`
      html += `<label class="form-check-label" for="theme${theme.name}">${theme.name}</label>`
      html += '</div>'
      break
  }
  return html
}

const restoreThemeButtons = function () {
  $('#optionsForm .theme-button').removeClass('active')
  $('#optionsForm .theme-text').removeClass('active')
}

const onPrimaryThemeClick = function () {
  restoreThemeButtons()
  $(this).addClass('active')
  $('.primary-text').addClass('active')
  if (themes.getCurrentTheme().id !== 0) {
    changeTheme(0)
  }
}

const onMinimalThemeClick = function () {
  restoreThemeButtons()
  $(this).addClass('active')
  $('.minimal-text').addClass('active')
  if (themes.getCurrentTheme().id !== 1) {
    changeTheme(1)
  }
}

const onGothicThemeClick = function () {
  restoreThemeButtons()
  $(this).addClass('active')
  $('.goth-text').addClass('active')
  if (themes.getCurrentTheme().id !== 2) {
    changeTheme(2)
  }
}

const changeTheme = function (themeId) {
  console.log('changing theme: ' + themeId)

  const oldTheme = themes.getCurrentTheme().className
  $('body').removeClass(oldTheme)
  themes.setCurrentTheme(themeId)
  themes.initTheme()
}

module.exports = {
  onOptionsClick,
  onOptionSubmit,
  loadThemeOptions,
  changeTheme,
  onPrimaryThemeClick,
  onMinimalThemeClick,
  onGothicThemeClick
}
