'use strict'
// main/options.js

const themes = require('./theme.js')
// const getFormFields = require('../../../lib/get-form-fields')

const onOptionSubmit = function (event) {
  event.preventDefault()
  // const formData = getFormFields(event.target)
  // don't actually need formData since currently only one option,
  // which does not require any API calls
  const newThemeId = $('#themeSelect').val()
  if (newThemeId !== themes.getCurrentTheme().id) {
    changeTheme(newThemeId)
  }

  $('#modalForm').modal('hide')
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
      html = `<option value="${theme.short}">${theme.name}</option>`
      break
    case 'radio':
      html = '<div class="form-check">'
      html += `<input class="form-check-input" type="radio" name="theme" id="theme${theme.name}" value="${theme.short}">`
      html += `<label class="form-check-label" for="theme${theme.name}">${theme.name}</label>`
      html += '</div>'
      break
  }
  return html
}

const changeTheme = function (themeId) {
  console.log('changing theme: ' + themeId)

  const oldTheme = themes.getCurrentTheme().className
  $('body').removeClass(oldTheme)
  themes.setCurrentTheme(themeId)
  initTheme()
}

// display themed items
const initTheme = function () {
  const currentTheme = themes.getCurrentTheme()
  const titleImgSrc = currentTheme.path + 'title.png'
  $('header .page-title img').attr('src', titleImgSrc)
  $('body').addClass(currentTheme.className)
  $('#GameBoard .square.x img').attr('src', currentTheme.path + 'x.png')
  $('#GameBoard .square.o img').attr('src', currentTheme.path + 'o.png')
}

module.exports = {
  onOptionSubmit,
  loadThemeOptions,
  changeTheme,
  initTheme
}
