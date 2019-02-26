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

Player.prototype.getImagePath = function (theme) {
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

const resetGame = function () {
  _currentPlayerIndex = 0
}

const nextPlayerTurn = function () {
  _currentPlayerIndex = (_currentPlayerIndex + 1) % 2
  return getCurrentPlayer()
}

const getPlayer = function (mark) {
  if (mark.toLowerCase() === 'x') {
    return playerX
  } else if (mark.toLowerCase() === 'o') {
    return playerO
  } else {
    return null
  }
}

module.exports = {
  resetGame,
  getCurrentPlayer,
  nextPlayerTurn,
  getPlayer
}
