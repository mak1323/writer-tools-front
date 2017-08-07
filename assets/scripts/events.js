'use strict'

const authEvents = require('./auth/authevents')
const store = require('./store')
const ui = require('./auth/ui')
const getFormFields = require('../../lib/get-form-fields')

// global declarations
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

// pulls the id out of the favorites array
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
  $('#generatedName').text(str)
}
// This creates a random number based off the size of tables. Right now, this is
// set manually
const randomizeWord = function () {
  return Math.random() * (154 - 1) + 1
}

// the main generate name function.
const generateName = function (event) {
  event.preventDefault()
  // pulls a random noun out of store.nouns
  noun = store.nouns[parseInt(randomizeWord())].word
  // pulls a random adjective out of store.adjectives
  adjective = store.adjectives[parseInt(randomizeWord())].word
  // puts them together
  const currentName = 'The ' + adjective + ' ' + noun
  // displays the name
  nameDisplay(currentName)
}

// post favorite function
const postFavorite = function (event) {
  event.preventDefault()
// pulls the comment out of the modal
  comment = document.getElementById('message-text').value
  const data = {
    "favorite": {
      "adjective": adjective,
      "noun": noun,
      "user_id": store.user.id,
      "comment": comment
    }
  }
  if (noun === undefined) {
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
