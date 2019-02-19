'use strict'
// main/theme.js
//

const Theme = function (id, themeName, folder, xColor, oColor, bsColor, bsBackground, disabledSquare, readySquare) {
  this.id = id
  this.name = themeName
  this.short = folder
  this.className = folder + '-theme'
  this.path = 'public/images/' + folder + '/'
  this.xColor = xColor
  this.oColor = oColor
  this.bsColor = bsColor
  this.bsBackground = bsBackground
  this.disableSquare = disabledSquare
  this.readySquare = readySquare
}

Theme.prototype.getImageTag = function (img) {
  const src = this.path + img + '.png'
  return `<img src="${src}" alt="${img}">`
}

const primaryTheme = new Theme(0, 'Primary', 'primary', '#f00', '#00f', 'text-primary', 'bg-primary', '#000', '#fff')
const minimalTheme = new Theme(1, 'Minimalist', 'minimal', '#666', '#ccc', 'text-black', 'bg-white', '#000', '#fff')
const gothicTheme = new Theme(2, 'Gothic', 'gothic', '#dedede', '#020202', 'text-white', 'bg-black', '#333', '#bbb')
// More Theme ideas:
// Valenties (hearts & arrows, pinks and reds)
// StPatricks (shamrocks & celtic crosses, greens)
// Pets (cats & dogs, orange & brown)

const availableThemes = [
  primaryTheme,
  minimalTheme,
  gothicTheme
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

module.exports = {
  availableThemes,
  getCurrentTheme,
  setCurrentTheme
}
