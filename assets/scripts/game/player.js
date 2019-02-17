'use strict'
// game/player.js

// TODO: simplify - color & image are handled by theme

const Player = function (mark) {
  this.name = mark.toUpperCase()
  this.turnClass = mark + '-turn'
  this.winClass = mark + '-win'
  this.squareClass = mark
  this.xo = mark
}

Player.prototype.getImage = function (theme) {
  return theme.path + this.xo + '.png'
}

Player.prototype.getColor = function (theme) {
  return (this.xo === 'x' ? theme.xColor : theme.oColor)
}

const playerX = new Player('x')
const playerO = new Player('o')
const gamePlayers = [playerX, playerO]

let _currentPlayerIndex = 0

const getCurrentPlayer = function () {
  return gamePlayers[_currentPlayerIndex]
}

const nextPlayerTurn = function () {
  _currentPlayerIndex = (_currentPlayerIndex + 1) % 2
  return getCurrentPlayer()
}

module.exports = {
  getCurrentPlayer,
  nextPlayerTurn
}
