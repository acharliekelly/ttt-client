#!/bin/bash

curl --include "https://tic-tac-toe-wdi.herokuapp.com/games?over=true" \
    --header "Authorization: Token token=${TOKEN}"

echo
