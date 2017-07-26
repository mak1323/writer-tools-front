'use strict'

const authEvents = require('./auth/authevents')
const store = require('./store')
const ui = require('./auth/ui')

let noun
let adjective
let comment
let id
let userFavorites = []

// reset function
const resetWords = function () {
  noun = ''
  comment = ''
  adjective = ''
  id = ''
  document.getElementById('id-text').value = 'Id here'
  document.getElementById('descriptor-text').value = 'Descriptor here'
  document.getElementById('noun-text').value = 'Noun here'
  document.getElementById('comment-text').value = 'Comment here'
}

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
  authEvents.onCreateFavorite(event, data)
}

const patchFavorite = function (event) {
  event.preventDefault()
  const idInitial = document.getElementById('id-text').value
  adjective = document.getElementById('descriptor-text').value
  noun = document.getElementById('noun-text').value
  comment = document.getElementById('comment-text').value
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
  resetWords()
}

const deleteFavorite = function (event) {
  event.preventDefault()
  const idInitial = document.getElementById('id-text-delete').value
  adjective = document.getElementById('descriptor-delete-text').value
  noun = document.getElementById('noun-delete-text').value
  comment = document.getElementById('comment-delete-text').value
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
  authEvents.onDestroyFavorite(event, data, id)
  resetWords()
}

module.exports = {
  generateName,
  postFavorite,
  patchFavorite,
  deleteFavorite
}
