'use strict'

// when this many squares are filled, there are no more moves
const MAX_MOVES = 9

// all possible win combinations
const WINS = [
  '#cell-0-0.PLAYER, #cell-0-1.PLAYER, #cell-0-2.PLAYER', // Col 1
  '#cell-1-0.PLAYER, #cell-1-1.PLAYER, #cell-1-2.PLAYER', // Col 2
  '#cell-2-0.PLAYER, #cell-2-1.PLAYER, #cell-2-2.PLAYER', // Col 3
  '#cell-0-0.PLAYER, #cell-1-0.PLAYER, #cell-2-0.PLAYER', // Row 1
  '#cell-0-1.PLAYER, #cell-1-1.PLAYER, #cell-2-1.PLAYER', // Row 2
  '#cell-0-2.PLAYER, #cell-1-2.PLAYER, #cell-2-2.PLAYER', // Row 3
  '#cell-0-0.PLAYER, #cell-1-1.PLAYER, #cell-2-2.PLAYER', // diagonal 1
  '#cell-0-2.PLAYER, #cell-1-1.PLAYER, #cell-2-0.PLAYER' // diagonal 2
]

/**
 * checkForWin (Player)
 * checks for win by player
 * via string replacement/jQuery search
 */
const checkForWin = (player) => {
  for (let i = 0; i < WINS.length; i++) {
    const selector = WINS[i].replace(/PLAYER/g, player.squareClass)
    if ($(selector).length === 3) {
      $(selector).css('background-color', player.color)
      // player has won
      return true
    }
  }
  return false
}

const checkForDraw = () => {
  const squares = $('#GameBoard .x').add('#GameBoard .o')
  return (squares.length === MAX_MOVES)
}

module.exports = {
  checkForWin,
  checkForDraw
}
