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

const onThemeClick = function (event) {
  restoreThemeButtons()
  const key = $(event.target).className()
  $(`#optionsFormDialog .${key}-text`).addClass('active')
  $(event.target).parent('.theme-button').addClass('active')
  const id = themes.getTheme(key).id
  changeTheme(id)
}

const restoreThemeButtons = function () {
  $('#optionsFormDialog .theme-button').removeClass('active')
  $('#optionsFormDialog .theme-text').removeClass('active')
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

const onCircuitThemeClick = function () {
  restoreThemeButtons()
  $(this).addClass('active')
  $('.circuit-text').addClass('active')
  if (themes.getCurrentTheme().id !== 3) {
    changeTheme(3)
  }
}

const onSteampunkThemeClick = function () {
  restoreThemeButtons()
  $(this).addClass('active')
  $('.steampunk-text').addClass('active')
  if (themes.getCurrentTheme().id !== 4) {
    changeTheme(4)
  }
}

const changeTheme = function (themeId) {
  const oldTheme = themes.getCurrentTheme().className
  $('body').removeClass(oldTheme)
  themes.setCurrentTheme(themeId)
  themes.initTheme()
}

module.exports = {
  onOptionsClick,
  onOptionSubmit,
  changeTheme,
  onThemeClick,
  onPrimaryThemeClick,
  onMinimalThemeClick,
  onGothicThemeClick,
  onCircuitThemeClick,
  onSteampunkThemeClick
}
