'use strict'

const optimalScore = function (scores) {
  const n = scores.length
  const height = log2(n)
  const result = minimaxImpl(0, 0, true, scores, height)
  return result
}

/**
 * Minimax
 *  JS implementation of minimax algorithm
 * @param  {number} depth     current depth in Game tree
 * @param  {number} nodeIndex index of current node in scores
 * @param  {boolean} isMax    true if current move is Maximizer
 * @param  {array[n]} scores  leaves of Game tree
 * @param  {number} height    maximum height of Game tree
 * @return {number}           optimal value a Maximizer can obtain
 */
const minimaxImpl = function (depth, nodeIndex, isMax, scores, height) {
  // test for terminating condition
  if (depth === height) {
    return scores[nodeIndex]
  }

  // if current move is Maximizder, find maximum attainable value;
  // otherwise, find minimum value
  if (isMax) {
    return Math.max(
      minimaxImpl(depth + 1, nodeIndex * 2, false, scores, height),
      minimaxImpl(depth + 1, nodeIndex * 2 + 1, false, scores, height)
    )
  } else {
    return Math.min(
      minimaxImpl(depth + 1, nodeIndex * 2, true, scores, height),
      minimaxImpl(depth + 1, nodeIndex * 2 + 1, true, scores, height)
    )
  }
}

const log2 = function (num) {
  return (num === 1) ? 0 : log2(num / 2)
}

module.exports = {
  optimalScore
}
