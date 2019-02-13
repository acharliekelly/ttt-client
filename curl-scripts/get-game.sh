#!/bin/bash

curl --include "https://tic-tac-toe-wdi.herokuapp.com/games/${GAME_ID}" \
  --header "Authorization: Token token=${TOKEN}"

echo
