'use strict'
// game/player.js

const Player = function (mark, color, imageFile) {
  this.name = mark.toUpperCase()
  this.turnClass = mark + '-turn'
  this.winClass = mark + '-win'
  this.squareClass = mark
  this.xo = mark
  this.color = color
  this.image = imageFile
}

const playerX = new Player('x', '#f00', 'public/images/x.png')
const playerO = new Player('o', '#00f', 'public/images/o.png')
const gamePlayers = [playerX, playerO]

let currentPlayerIndex = 0

const getCurrentPlayer = function () {
  return gamePlayers[currentPlayerIndex]
}

const nextPlayerTurn = function () {
  currentPlayerIndex = (currentPlayerIndex + 1) % 2
  return getCurrentPlayer()
}

const getPlayer = function (mark) {
  return (mark === 'x') ? playerX : playerO
}

module.exports = {
  getCurrentPlayer,
  nextPlayerTurn,
  getPlayer
}
