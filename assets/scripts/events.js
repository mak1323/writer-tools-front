'use strict'

const authEvents = require('./auth/authevents')
const store = require('./store')
const ui = require('./auth/ui')
const getFormFields = require('../../lib/get-form-fields')

let noun
let adjective
let comment
let id
let userFavorites = []

// function to test input integer
const testID = function (id) {
  if (Number.isInteger(id)) {
    return id
  }
}

// creating a new array to check if user is editing own favorites
const checkFavoritesArray = function (array) {
  for (let i = 0; i < array.length; ++i) {
    if (array[i].user.id === store.user.id) {
      userFavorites.push(array[i])
    }
  }
}

const checkFavorites = function (id) {
  const favorites = store.favorites
  checkFavoritesArray(favorites)
  for (let i = 0; i < userFavorites.length; i++) {
    if (userFavorites[i].id === id) {
      return id
    }
  }
}

// displays the name we created
const nameDisplay = function (str) {
  $('.generated-name').text(str)
}
// This creates a random number based off the size of tables. Right now, this is
// set manually
const randomizeWord = function () {
  return Math.random() * (154 - 1) + 1
}

const generateName = function (event) {
  event.preventDefault()
  noun = store.nouns[parseInt(randomizeWord())].word
  adjective = store.adjectives[parseInt(randomizeWord())].word
  const currentName = 'The ' + adjective + ' ' + noun
  nameDisplay(currentName)
}

const postFavorite = function (event) {
  event.preventDefault()

  comment = document.getElementById('message-text').value
  const data = {
    "favorite": {
      "adjective": adjective,
      "noun": noun,
      "user_id": store.user.id,
      "comment": comment
    }
  }
  if (data.noun === undefined) {
    alert('You must generate a name first')
    return
  }
  authEvents.onCreateFavorite(event, data)
}

const patchFavorite = function (event) {
  event.preventDefault()
  const idInitial = parseInt(document.getElementById('id-text').value)
  const adjective = document.getElementById('adjective-text').value
  const noun = document.getElementById('noun-text').value
  const comment = document.getElementById('comment-text').value
  const idCheckOne = parseInt(idInitial)
  const idCheckTwo = testID(idCheckOne)
  id = checkFavorites(idCheckTwo)
  const data = {
    "favorite": {
      "id": id,
      "adjective": adjective,
      "noun": noun,
      "user_id": store.user.id,
      "comment": comment
    }
  }
  authEvents.onUpdate(event, data)
}

const deleteFavorite = function (event) {
  event.preventDefault()
  const idInitial = parseInt(document.getElementById('id-text').value)
  const adjective = document.getElementById('adjective-text').value
  const noun = document.getElementById('noun-text').value
  const comment = document.getElementById('comment-text').value
  const idCheckOne = parseInt(idInitial)
  const idCheckTwo = testID(idCheckOne)
  id = checkFavorites(idCheckTwo)
  const data = {
    "favorite": {
      "id": id,
      "adjective": adjective,
      "noun": noun,
      "user_id": store.user.id,
      "comment": comment
    }
  }

  authEvents.onUpdate(event, data)
  authEvents.onDestroyFavorite(event, data, id)
}

module.exports = {
  generateName,
  postFavorite,
  patchFavorite,
  deleteFavorite
}
