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

/** Public
 * checkForWin (Player)
 * checks for win by player
 * via string replacement/jQuery search
 */
const checkForWin = (player, theme) => {
  for (let i = 0; i < jQueryWins.length; i++) {
    const selector = jQueryWins[i].replace(/PLAYER/g, player.squareClass)
    if ($(selector).length === 3) {
      $(selector).css('background-color', player.getColor(theme))
      // player has won
      return true
    }
  }
  return false
}

// Public: check for stalemate (all squares contain images)
const checkForDraw = () => {
  const squares = $('#GameBoard .square:has(img)')
  return (squares.length === maximumMoves)
}

// Convert board state to Game API array
const toGameArray = () => {
  const cells = []
  $('#GameBoard .squares').each(() => {
    if ($(this).hasClass('x')) {
      cells.push('x')
    } else if ($(this).hasClass('o')) {
      cells.push('o')
    } else {
      cells.push('')
    }
  })
  return cells
}

module.exports = {
  checkForWin,
  checkForDraw,
  toGameArray
}
