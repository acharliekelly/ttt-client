'use strict'
// test/anti.js
// Anti-Tester features

// ButtonId: [timestamp, timestamp, timestamp]
const _btnCounters = {
  'btnId': []
}

const MAXIMUM_CLICKS = 5
const MINIMUM_SECONDS = 3

const incrementButtonCounter = function (event, timestamp) {
  const buttonId = event.target.id
  if (!_btnCounters[buttonId]) {
    _btnCounters[buttonId] = []
  }
  const cntrs = _btnCounters[buttonId]
  cntrs.push(timestamp)
  return tooManyClicks(buttonId)
}

// check for too many clicks in too few seconds
const tooManyClicks = function (buttonId) {
  if (_btnCounters[buttonId].length < MAXIMUM_CLICKS) {
    return false
  } else {
    const clicks = _btnCounters[buttonId].slice(-MAXIMUM_CLICKS)
    const diff = clicks.slice(-1) - clicks[0]
    console.log('Element ' + buttonId + ' has been clicked 5 times in ' + (diff / 1000) + ' seconds')
    return (diff < (MINIMUM_SECONDS * 1000))
  }
}

module.exports = {
  incrementButtonCounter,
  tooManyClicks
}
