'use strict'
const store = require('../store')
const showFavoritesTemplate = require('../templates/favorites-listing.handlebars')

// global declerations
let favorites
let nouns
let adjectives

// message function for error reader
const message = function (str) {
  $('#errorReader').text(str)
}

// supposed to reset modals, Sort of works, but I need to go
// through and troubleshoot line by line.
const resetModalValues = () => {
  document.getElementById('id-text').value = ''
  document.getElementById('adjective-text').value = ''
  document.getElementById('noun-text').value = ''
  document.getElementById('comment-text').value = ''
  document.getElementById('message-text').value = ''
  document.getElementsByName('credentials[password]').value = 'stuff'
  document.getElementsByName('credentials[password_confirmation]').value = 'stuff'
  document.getElementsByName('credentials[email]').value = 'email goes here'
}

// empties out the handlebars table
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
  resetModalValues()
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
  message("You're password has changed successfully.")
  resetModalValues()
}

// change password failure
const changePasswordFailure = function () {
  alert("You're password has changed successfully.")
}

// sign out failure
const signOutFailure = function () {
  message('You are still logged in.')
}

// get favorites success
const getFavoritesSuccess = (data) => {
  clearFavorites(store.favorites)
  // stores favorites in store
  store.favorites = data.favorites
  favorites = store.favorites
  const userFavorites = favoritesDisplay(favorites)
  // append them with handlebars
  const showFavoritesHTML = showFavoritesTemplate({ userFavorites: userFavorites })
  $('#saved-names').append(showFavoritesHTML)
  resetModalValues()
}

// sign in success
const signInSuccess = (data) => {
  message('Signed in. Get to naming.')
  store.user = data.user
  $('#change-password-btn').show()
  $('#sign-out-btn').show()
  $('#sign-up-btn').hide()
  $('#sign-in-btn').hide()
  $('#characterGeneratorSpa').show()
  $('#nameGeneratorSpa').show()
  resetModalValues()
  return store.user.token
}

// sign out success
const signOutSuccess = function () {
  $('#change-password-btn').hide()
  $('#sign-out-btn').hide()
  $('#sign-up-btn').show()
  $('#sign-in-btn').show()
  $('#character-generator-page').hide()
  $('#name-generator-page').hide()
  $('#landing-page').show()
  resetModalValues()
}

// get favorites failure. Not using alert right now,
// because I was having problems with this one.
const getFavoritesFailure = function () {
  message('no go')
}

// gets nouns and loads them from the store
const getNounsSuccess = (data) => {
  store.nouns = data.nouns
  nouns = store.nouns
}

// get nouns failure
const getNounsFailure = function () {
  message('nope')
}

// get adjectives and loads it in store
const getAdjectivesSuccess = (data) => {
  store.adjectives = data.adjectives
  adjectives = store.adjectives
}

// get adjectives failure.
const getAdjectivesFailure = function () {
  message('nope')
}

// create favorite success with a message of new favorite\
// no alert here for streamiline.
// resets modals after.
// returns a token for continuing a promise
const createFavoritesSuccess = function (data) {
  message('New Favorite')
  resetModalValues()
  return store.user.token
}

// self explanitory
const createFavoritesFailure = function () {
  message('No new favorite added.')
}

// update favorite success with a message of new favorite\
// no alert here for streamiline.
// resets modals after.
// returns a token for continuing a promise
const updateFavoritesSuccess = function () {
  message('Favorite is Updated')
  resetModalValues()
  return store.user.token
}

// update failure with an alert
const updateFavoritesFailure = function () {
  alert('Either not your favorite, or field fail.')
}

// destroy favorite success with a message of new favorite\
// no alert here for streamiline.
// resets modals after.
// returns a token for continuing a promise
const destroyFavoriteSuccess = function () {
  message('Favorite is Updated')
  resetModalValues()
  return store.user.token
}

// destroy failure
const destroyFavoriteFailure = function () {
  alert('Either not your favorite, or field fail.')
}

// resets the populated favorites in real time.
// kills the current list and the favorites store
// uses a seperate get table to repopulate the table
const getUpdateNameListSuccess = function (data) {
  $('#saved-names').empty()
  store.favorites = []
  store.favorites = data.favorites
  favorites = store.favorites
  const userFavorites = favoritesDisplay(favorites)
  // append them with handlebars
  const showFavoritesHTML = showFavoritesTemplate({ userFavorites: userFavorites })
  $('#saved-names').append(showFavoritesHTML)
  resetModalValues()
}

// failure alert failure alert
const getUpdateNameListFailure = function () {
  alert('failure to update list')
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
  destroyFavoriteSuccess,
  getUpdateNameListSuccess,
  getUpdateNameListFailure
}
