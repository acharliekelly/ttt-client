#!/bin/bash

curl "https://tic-tac-toe-wdi.herokuapp.com/games/${GAME_ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "game": {
        "cell": {
          "index": '${INDEX}',
          "value": "'"${VALUE}"'"
        },
        "over": '${IS_OVER}'
      }
    }'
