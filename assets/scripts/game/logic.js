'use strict'

const EVAL_X_WIN = 10
const EVAL_O_WIN = -10

// board is 2D array of n units each: board[n][n], containing
// something representing X, O, or blank
// evaluate current position for win by either player
const heuristic = function (board, nSize) {
  let vic = rowVictoryCondition(board, nSize)
  if (vic !== 0) return vic

  vic = columnVictoryCondition(board, nSize)
  if (vic !== 0) return vic

  vic = diagonalVictoryLeft(board, nSize)
  if (vic !== 0) return vic

  vic = diagonalVictoryRight(board, nSize)
  return vic
}

const rowVictoryCondition = function (board, nSize) {
  for (let row = 0; row < nSize; row++) {
    let rowScore = 0
    board[row].forEach(square => {
      rowScore += checkSquare(square)
    })
    const result = winEval(rowScore, nSize)
    if (result !== 0) return result
  }
  return 0
}

const columnVictoryCondition = function (board, nSize) {
  for (let col = 0; col < nSize; col++) {
    let colScore = 0
    for (let row = 0; row < nSize; row++) {
      const cell = board[row][col]
      colScore += checkSquare(cell)
    }
    const result = winEval(colScore, nSize)
    if (result !== 0) return result
  }
  return 0
}

const diagonalVictoryLeft = function (board, nSize) {
  let score = 0
  for (let index = 0; index < nSize; index++) {
    score += checkSquare(board[index][index])
  }
  return winEval(score, nSize)
}

const diagonalVictoryRight = function (board, nSize) {
  let score = 0
  for (let index = 0; index < nSize; index++) {
    const opp = nSize - (index + 1)
    score += checkSquare(board[index][opp])
  }
  return winEval(score, nSize)
}

// takes whatever we're using to represent a square,
// checks for whatever we're using to represent each
// player. Returns 1 for X, -1 for O, or 0 for empty
const checkSquare = function (square) {
  if (square === 'x') {
    return 1
  } else if (square === 'o') {
    return -1
  } else {
    return 0
  }
}

const winEval = function (score, nSize) {
  if (score === nSize) {
    return EVAL_X_WIN
  } else if (score + nSize === 0) {
    return EVAL_O_WIN
  } else {
    return 0
  }
}

module.exports = {
  heuristic
}
