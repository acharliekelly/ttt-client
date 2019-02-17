'use strict'

// when this many squares are filled, there are no more moves
const maximumMoves = 9

// all possible win combinations
const jQueryWins = [
  '#cell-0-0.PLAYER, #cell-0-1.PLAYER, #cell-0-2.PLAYER', // Col 1
  '#cell-1-0.PLAYER, #cell-1-1.PLAYER, #cell-1-2.PLAYER', // Col 2
  '#cell-2-0.PLAYER, #cell-2-1.PLAYER, #cell-2-2.PLAYER', // Col 3
  '#cell-0-0.PLAYER, #cell-1-0.PLAYER, #cell-2-0.PLAYER', // Row 1
  '#cell-0-1.PLAYER, #cell-1-1.PLAYER, #cell-2-1.PLAYER', // Row 2
  '#cell-0-2.PLAYER, #cell-1-2.PLAYER, #cell-2-2.PLAYER', // Row 3
  '#cell-0-0.PLAYER, #cell-1-1.PLAYER, #cell-2-2.PLAYER', // diagonal 1
  '#cell-0-2.PLAYER, #cell-1-1.PLAYER, #cell-2-0.PLAYER' // diagonal 2
]

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

// Public: takes a 9-item string array game representation from API
// if game is won by xo ('x'|'o'), return
// the win method it matched from possibleWins array (0-7)
// if player xo did not win, return -1
const isWin = (game, xo) => {
  for (let i = 0; i < possibleWins.length; i++) {
    if (possibleWins[i].map(w => game[w]).every(cell => cell === xo)) {
      return i
    }
  }
  return -1
}

/** Public
 * checkForWin (Player)
 * checks for win by player
 * via string replacement/jQuery search
 */
const checkForWin = (player) => {
  for (let i = 0; i < jQueryWins.length; i++) {
    const selector = jQueryWins[i].replace(/PLAYER/g, player.squareClass)
    if ($(selector).length === 3) {
      $(selector).css('background-color', player.color)
      // player has won
      return true
    }
  }
  return false
}

// Public: check for stalemate via jquery search
const checkForDraw = () => {
  const squares = $('#GameBoard .x').add('#GameBoard .o')
  return (squares.length === maximumMoves)
}

module.exports = {
  checkForWin,
  checkForDraw,
  isWin
}
