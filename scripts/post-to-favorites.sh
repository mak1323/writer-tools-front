#!/bin/bash

API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/favorites"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "favorite": {
      "adjective": "'"${ADJECTIVE}"'",
      "noun": "'"${NOUN}"'",
      "user_id": "'"${USERID}"'",
      "comment": "'"${COMMENT}"'"
    }
  }'

echo
