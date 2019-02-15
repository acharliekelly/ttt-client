'use strict'
// game/api.js
// method calls for Single-Player Game API

const config = require('../config')
const store = require('../store')

const myGames = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const myFinishedGames = function () {
  return $.ajax({
    url: config.apiUrl + '/games?over=true',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const myUnfinishedGames = function () {
  return $.ajax({
    url: config.apiUrl + '/games?over=false',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createGame = function () {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cells': [],
        'over': false,
        'player_x': {
          'id': store.user.id,
          'email': `${store.user.email}`
        },
        'player_o': null
      }
    }
  })
}

const showGame = function (gameId) {
  return $.ajax({
    url: `${config.apiUrl}/games/${gameId}`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGame = function (mark, index, isFinal) {
  const gameId = store.game.id
  return $.ajax({
    url: `${config.apiUrl}/games/${gameId}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': index,
          'value': mark
        },
        'over': isFinal
      }
    }
  })
}

const watchGame = function (gameId) {
  return $.ajax({
    url: `${config.apiUrl}/games/${gameId}/watch`,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  myGames,
  myFinishedGames,
  myUnfinishedGames,
  createGame,
  showGame,
  updateGame,
  watchGame
}
