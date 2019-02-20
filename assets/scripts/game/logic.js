'use strict'
// game/logic.js
//
// IMPORTANT: Pay attention to whether function param is 'game' (a Game object),
// 'games' (an array of Game objects), or 'cells' (an array of strings) - NOT INTERCHANGEABLE!!
//

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

// takes possibleWins index (result of isWin), converts cells to squares,
// sets background color of those squares to player color
// (complicated way of re-doing winning.checkForWin)
const highlightWinningSquares = (winIndex, bgColor) => {
  const win = possibleWins[winIndex]
  for (let i = 0; i < 3; i++) {
    const sq = indexToSquare(win[i])
    $('#' + sq).css('background-color', bgColor)
  }
}

/* FUNCTIONS THAT TAKE AN ARRAY OF CELLS */

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
// (check for winner first)
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

// takes array of cells, returns true if no cell is empty
const isFull = (cells) => {
  return cells.every(cell => cell !== '')
}

// Takes array of cells, returns true if every cell is empty
const isEmpty = (cells) => {
  return cells.every(cell => cell === '')
}

// takes array of cells, returns true if no blanks AND no winner
const isDraw = (cells) => {
  if (isFull(cells)) {
    return (isWin(cells, 'x') < 0 && isWin(cells, 'o') < 0)
  } else return false
}

/* FUNCTIONS THAT TAKE A SINGLE GAME */

// Takes single game, returns
const isBlank = (game) => {
  return isEmpty(game.cells)
}

// takes single game, returns 'x', 'o', or ''
const whoWon = (game) => {
  if (isWin(game.cells, 'x') >= 0) {
    return 'x'
  } else if (isWin(game.cells, 'o') >= 0) {
    return 'o'
  } else {
    return ''
  }
}

/* FUNCTIONS THAT TAKE AN ARRAY OF GAMES */

// takes array of games, returns filtered list of games won by X
const gamesWonByX = (games) => {
  // game : { id, cells[], over, player_x, player_o }
  return games.filter(game => {
    return (isWin(game.cells, 'x') >= 0)
  })
}

// takes array of games, returns list of games won by O
const gamesWonByO = (games) => {
  return games.filter(game => {
    return (isWin(game.cells, 'o') >= 0)
  })
}

// takes array of games, returns list of blank games
const gamesUnstarted = (games) => {
  return games.filter(isBlank)
}

// return filtered list of games not won by either player
// if initial list is Finished Games, then result is list of ties
// otherwise, may include incomplete games
const gamesNotWon = (games) => {
  return games.filter(game => {
    return (isWin(game.cells, 'x') < 0 && isWin(game.cells, 'o') < 0)
  })
}

// takes list of games, returns list of finished games
// theoretically unnecessary since an API call does the same thing,
// but sometimes that's inconvenient
const gamesFinished = (games) => {
  return games.filter(game => game.over === true)
}

// takes list of games, returns list of unfinished games
const gamesUnfinished = (games) => {
  return games.filter(game => game.over === false)
}

// takes list of games, returns list of explicitly tied games,
// whether or not they are marked 'over' ('tied' means all squares taken & no winner)
const gamesTied = (games) => {
  return games.filter((game) => {
    if (isFull(game.cells)) {
      return (isWin(game.cells, 'x') < 0 && isWin(game.cells, 'o') < 0)
    } else {
      return false
    }
  })
}

// convert square-id (cell-0-0) to array index
const squareIdToIndex = (squareId) => {
  const col = parseInt(squareId[5])
  const row = parseInt(squareId[7])
  return (col * 3) + row
}

// return squareId from index
const indexToSquare = (index) => {
  const row = index % 3
  const col = Math.trunc(index / 3)
  return `cell-${col}-${row}`
}

// TODO: gamesUnwinnable - unfinished games that can't be won by either player
// also, gamesWinnableByX

module.exports = {
  highlightWinningSquares,
  isWin,
  playerTurn,
  isFull,
  isEmpty,
  isDraw,
  isBlank,
  whoWon,
  gamesWonByX,
  gamesWonByO,
  gamesUnstarted,
  gamesNotWon,
  gamesFinished,
  gamesUnfinished,
  gamesTied,
  squareIdToIndex,
  indexToSquare
}
