'use strict'
const store = require('../store')
const showFavoritesTemplate = require('../templates/favorites-listing.handlebars')
const addFavorite = require('../templates/new-favorite-listing.handlebars')
const api = require('./api')

let userFavorites = []
let favorites
let nouns
let adjectives
let userId

// message function for error reader
const message = function (str) {
  $('#errorReader').text(str)
}

const clearFavorites = (array) => {
  $('#saved-names').empty()
  array = []
}

// iterates through favorites array to find local favorites
const favoritesDisplay = function (array) {
  const currentFavorites = []
  for (let i = 0; i < array.length; ++i) {
    if (array[i].user.id === store.user.id) {
      currentFavorites.push(array[i])
    }
  }
  return currentFavorites
}

// for signup success
const signUpSuccess = (data) => {
  message('You have made a new user. Sign in?')
}

// for signin failute
const signInFailure = (data) => {
  message("User doesn't exist or password is incorrect. Try Again")
}

// sign upfailure catch
const signUpFailure = (data) => {
  message("User name isn't correct format or is taken. Try Again.")
}

// change password success
const changePasswordSuccess = (data) => {
  console.error("You're password has changed successfully.")
}

// change password failure
const changePasswordFailure = function () {
  console.error("You're password has changed successfully.")
}

// sign out failure
const signOutFailure = function () {
  console.error('You are still logged in.')
}

// get favorites success
const getFavoritesSuccess = (data) => {
  // should clear favorites
  clearFavorites(userFavorites)
  // stores favorites in store
  store.favorites = data.favorites
  favorites = store.favorites
  const userFavorites = favoritesDisplay(favorites)
  // append them with handlebars
  const showFavoritesHTML = showFavoritesTemplate({ userFavorites: userFavorites })
  $('#saved-names').append(showFavoritesHTML)
}

// sign in success
const signInSuccess = (data) => {
  message('Signed in. To start playing click new game.')
  store.user = data.user
  $('#change-password-btn').show()
  $('#sign-out-btn').show()
  $('#sign-up-btn').hide()
  $('#sign-in-btn').hide()
  $('.content').show()
  return store.user.token
}

// sign out success
const signOutSuccess = function () {
  $('#change-password-btn').hide()
  $('#sign-out-btn').hide()
  $('#sign-up-btn').show()
  $('#sign-in-btn').show()
  $('.content').hide()
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

const createFavoritesSuccess = function (data) {
  message('New Favorite')
  const showFavoritesHTML = addFavorite({ data })
  $('#saved-names').append(showFavoritesHTML)
}

const createFavoritesFailure = function () {
  message('No new favorite added.')
}

const updateFavoritesSuccess = function () {
  message('Favorite is Updated')
}

const updateFavoritesFailure = function () {
  message('Either not your favorite, or field fail.')
}

const destroyFavoriteSuccess = function () {
  message('Favorite is Updated')
}

const destroyFavoriteFailure = function () {
  message('Either not your favorite, or field fail.')
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
  createFavoritesSuccess,
  createFavoritesFailure,
  getAdjectivesSuccess,
  getAdjectivesFailure,
  getNounsSuccess,
  getNounsFailure,
  updateFavoritesSuccess,
  updateFavoritesFailure,
  destroyFavoriteFailure,
  destroyFavoriteSuccess
}
