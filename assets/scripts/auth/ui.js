'use strict'
const store = require('../store')

let favorites
let nouns
let adjectives

const message = function (str) {
  $('#errorReader').text(str)
}

const signUpSuccess = (data) => {
  message('You have made a new user. Sign in?')
}

const signInFailure = (data) => {
  message("User doesn't exist or password is incorrect. Try Again")
}

const signInSuccess = (data) => {
  message('Signed in. To start playing click new game.')
  store.user = data.user
  console.log(store.user)
  $('#change-password').show()
  $('#signout').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
}

const signUpFailure = (data) => {
  message("User name isn't correct format or is taken. Try Again.")
}

const changePasswordSuccess = (data) => {
  message("You're password has changed successfully.")
}

const changePasswordFailure = function () {
  message("You're password has changed successfully.")
}

const signOutSuccess = function () {
  $('#change-password').hide()
  $('#signout').hide()
  $('#sign-up').show()
  $('#sign-in').show()
}

const signOutFailure = function () {
  message('You are still logged in.')
}

const getFavoritesSuccess = (data) => {
  store.favorites = data.favorites
  favorites = store.favorites
  console.log(favorites)
}

const getFavoritesFailure = function () {
  message('no go')
}

const getNounsSuccess = (data) => {
  store.nouns = data
  nouns = store.nouns.nouns
  console.log(nouns)
}

const getNounsFailure = function () {
  console.log('nope')
}

const getAdjectivesSuccess = (data) => {
  store.adjectives = data
  adjectives = store.adjectives.adjectives
  console.log(adjectives)
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
