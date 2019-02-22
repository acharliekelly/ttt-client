'use strict'
// main/theme.js
//

const Theme = function (id, themeName, folder, xColor, oColor, disabledSquare, readySquare) {
  this.id = id
  this.name = themeName
  this.short = folder
  this.className = folder + '-theme'
  this.path = 'public/images/' + folder + '/'
  this.xColor = xColor
  this.oColor = oColor
  this.disableSquare = disabledSquare
  this.readySquare = readySquare
}

Theme.prototype.getImageTag = function (img) {
  const src = this.path + img + '.png'
  return `<img src="${src}" alt="${img}">`
}

const primaryTheme = new Theme(0, 'Primary', 'primary', '#f00', '#00f', '#000', '#fff')
const minimalTheme = new Theme(1, 'Minimalist', 'minimal', '#ddd', '#333', '#000', '#fff')
const gothicTheme = new Theme(2, 'Gothic', 'goth', '#000', '#fff', '#333', '#bbb')
const circuitTheme = new Theme(3, 'Circuit', 'circuit', '#bb0', '#090', '#000', '#fff')
const steampunkTheme = new Theme(4, 'Steampunk', 'steampunk', '#ffd700', '#c0c0c0', '#000', '#fff')

const availableThemes = [
  primaryTheme,
  minimalTheme,
  gothicTheme,
  circuitTheme,
  steampunkTheme
]

let _currentThemeIndex = 0

const getCurrentTheme = function () {
  if (isNaN(_currentThemeIndex)) {
    _currentThemeIndex = 0
  }
  return availableThemes[_currentThemeIndex]
}

const setCurrentTheme = function (index) {
  _currentThemeIndex = index
}

const setTheme = function (idOrKey) {
  if (isNaN(idOrKey)) {
    const theme = availableThemes.find(theme => theme.short === idOrKey)
    if (!theme) {
      return false
    } else {
      _currentThemeIndex = theme.id
      return true
    }
  } else if (idOrKey < availableThemes.length) {
    _currentThemeIndex = idOrKey
    return true
  }
  return false
}

const getTheme = function (idOrKey) {
  if (isNaN(idOrKey)) {
    const theme = availableThemes.find(theme => theme.short === idOrKey)
    if (theme) {
      return theme
    }
  } else if (idOrKey < availableThemes.length) {
    return availableThemes[idOrKey]
  }
  return false
}

// display themed items
const initTheme = function () {
  const currentTheme = getCurrentTheme()
  const titleImgSrc = currentTheme.path + 'title.png'
  $('header .page-title img').attr('src', titleImgSrc)
  $('body').addClass(currentTheme.className)
  $('#GameBoard .square.x img').attr('src', currentTheme.path + 'x.png')
  $('#GameBoard .square.o img').attr('src', currentTheme.path + 'o.png')
  // set empty square bkg color
  const status = $('#gameStatus').text()
  if (status === 'In Progress') {
    $('#GameBoard .square:empty').css('background-color', currentTheme.readySquare)
    // set current player color
    const player = $('#currentTurn').text()
    $('.turn-status').css('background-color', (player === 'X') ? currentTheme.xColor : currentTheme.oColor)
  } else {
    $('#GameBoard .square:empty').css('background-color', currentTheme.disableSquare)
  }
}

const generateThemeButton = function (theme) {
  return `<button id="${theme.short}ThemeBtn" class="btn btn-default theme-button col" data-theme="${theme.short}" data-tid="${theme.id}">
    <img src="public/images/${theme.short}/o.png" alt="${theme.name} Theme" class="${theme.short}">
  </button>`
}

const generateThemeLabel = function (theme) {
  return `<div class="col text-center theme-text primary-text">${theme.name}</div>`
}

module.exports = {
  availableThemes,
  getCurrentTheme,
  setCurrentTheme,
  getTheme,
  setTheme,
  initTheme,
  generateThemeLabel,
  generateThemeButton
}
