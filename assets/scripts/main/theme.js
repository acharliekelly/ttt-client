'use strict'
// main/theme.js
//

const Theme = function (id, themeName, folder, xColor, oColor, bsColor, bsBackground) {
  this.id = id
  this.name = themeName
  this.short = folder
  this.className = folder + '-theme'
  this.path = 'public/images/' + folder + '/'
  this.background = this.path + 'bkg.png'
  this.xColor = xColor
  this.oColor = oColor
  this.bsColor = bsColor
  this.bsBackground = bsBackground
}

Theme.prototype.getImage = function (img) {
  const src = this.path + img + '.png'
  return `<img src="${src}" alt="${img}">`
}

const primaryTheme = new Theme(0, 'Primary', 'primary', '#f00', '#00f', 'text-primary', 'bg-primary')
const bwTheme = new Theme(1, 'B+W', 'bw', '#333', '#ccc', 'text-black', 'bg-white')
const gothicTheme = new Theme(2, 'Gothic', 'gothic', '#000', '#999', 'text-white', 'bg-black')

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
