'use strict'
const store = require('../store')

let userFavorites = []
let favorites
let nouns
let adjectives
let userId

// message function for error reader
const message = function (str) {
  $('#errorReader').text(str)
}

// iterates through favorites array to find local favorites
const favoritesDisplay = function (array) {
  for (let i = 0; i < array.length; ++i) {
    console.log(array[i].user.id)
    if (array[i].user.id === userId) {
      userFavorites.push(array[i])
    }
  }
}


// for signup success
const signUpSuccess = (data) => {
  message('You have made a new user. Sign in?')
}

// for signin failute
const signInFailure = (data) => {
  message("User doesn't exist or password is incorrect. Try Again")
}

// sign in success
const signInSuccess = (data) => {
  message('Signed in. To start playing click new game.')
  store.user = data.user
  console.log(store.user.id)
  userId = store.user.id
  console.log(userId)
  $('#change-password').show()
  $('#signout').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
}

// sign upfailure catch
const signUpFailure = (data) => {
  message("User name isn't correct format or is taken. Try Again.")
}

// change password success
const changePasswordSuccess = (data) => {
  message("You're password has changed successfully.")
}

// change password failure
const changePasswordFailure = function () {
  message("You're password has changed successfully.")
}

// sign out success
const signOutSuccess = function () {
  $('#change-password').hide()
  $('#signout').hide()
  $('#sign-up').show()
  $('#sign-in').show()
}

// sign out failure
const signOutFailure = function () {
  message('You are still logged in.')
}

// get favorites success
const getFavoritesSuccess = (data) => {
  // stores favorites in store
  store.favorites = data.favorites
  favorites = store.favorites
  // finds all user favorites
  favoritesDisplay(favorites)
  console.log(userFavorites)
}

const getFavoritesFailure = function () {
  message('no go')
}

const getNounsSuccess = (data) => {
  store.nouns = data.nouns
  nouns = store.nouns
}

const getNounsFailure = function () {
  console.log('nope')
}

const getAdjectivesSuccess = (data) => {
  store.adjectives = data.adjectives
  adjectives = store.adjectives
}

const getAdjectivesFailure = function () {
  console.log("nope")
}

const updateFavoritesSuccess = function () {
  message('New Favorite')
}

const updateFavoritesFailure = function () {
  message('No new favorite added.')
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  signOutFailure,
  signOutSuccess,
  signInFailure,
  getFavoritesSuccess,
  getFavoritesFailure,
  updateFavoritesSuccess,
  updateFavoritesFailure,
  getAdjectivesSuccess,
  getAdjectivesFailure,
  getNounsSuccess,
  getNounsFailure
}
