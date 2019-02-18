'use strict'
// main/theme.js
//

const Theme = function (themeName, folder, xColor, oColor, bsColor, bsBackground) {
  this.name = themeName
  this.path = 'public/images/' + folder + '/'
  this.background = this.path + 'bkg.png'
  this.xColor = xColor
  this.oColor = oColor
  this.bsColor = bsColor
  this.bsBackground = bsBackground
}

const primaryTheme = new Theme('Primary', 'primary', '#f00', '#00f', 'text-primary', 'bg-primary')
const bwTheme = new Theme('B+W', 'bw', '#333', '#ccc', 'text-black', 'bg-white')
const gothicTheme = new Theme('Gothic', 'gothic', '#000', '#999', 'text-white', 'bg-black')

const availableThemes = [
  primaryTheme,
  bwTheme,
  gothicTheme
]

let _currentThemeIndex = 0

const getCurrentTheme = function () {
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
