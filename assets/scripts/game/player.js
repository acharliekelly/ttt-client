'use strict'

const Player = function (name, color, imageFile) {
  this.name = name.toUpperCase()
  this.turnClass = name + '-turn'
  this.winClass = name + '-win'
  this.squareClass = name
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

module.exports = {
  getCurrentPlayer,
  nextPlayerTurn
}
