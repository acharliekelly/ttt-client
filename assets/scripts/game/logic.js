'use strict'
// game/logic.js

const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// Take array of cells

// Public: takes a 9-item string array game representation from API
// if game is won by xo ('x'|'o'), return
// the win method it matched from possibleWins array (0-7)
// if player xo did not win, return -1
const isWin = (cells, xo) => {
  for (let i = 0; i < possibleWins.length; i++) {
    if (possibleWins[i].map(w => cells[w]).every(cell => cell === xo)) {
      return i
    }
  }
  return -1
}

// Takes array of cells, returns whose turn it is, or null if every cell taken
const playerTurn = (cells) => {
  if (isEmpty(cells)) {
    return 'x'
  } else if (isFull(cells)) {
    return null
  } else {
    const xCnt = cells.filter(cell => cell === 'x').length
    const oCnt = cells.filter(cell => cell === 'o').length
    return (xCnt > oCnt ? 'o' : 'x')
  }
}

const isFull = (cells) => {
  return cells.every(cell => cell !== '')
}

// Takes array of cells
const isEmpty = (cells) => {
  return cells.every(cell => cell === '')
}

// Takes single game
const isBlank = (game) => {
  return isEmpty(game.cells)
}

// Take array of games

// take array of games objects, return filtered list of games won by X
const gamesWonByX = (games) => {
  // game : { id, cells[], over, player_x, player_o }
  return games.filter(game => {
    return (isWin(game, 'x') >= 0)
  })
}

const gamesWonByO = (games) => {
  return games.filter(game => {
    return (isWin(game, 'o') >= 0)
  })
}

const gamesUnstarted = (games) => {
  return games.filter(isBlank)
}

const gamesNotWon = (games) => {
  return games.filter(game => {
    return (isWin(game, 'x') < 0 && isWin(game, 'o') < 0)
  })
}

module.exports = {
  playerTurn,
  isEmpty,
  isBlank,
  gamesWonByX,
  gamesWonByO,
  gamesUnstarted,
  gamesNotWon
}
