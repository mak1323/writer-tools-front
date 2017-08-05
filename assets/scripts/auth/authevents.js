'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure(data))
  } else {
    $('#errorReader').text("Passwords don't match, friend.")
  }
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const getFavoriteNames = function (event) {
  event.preventDefault()
  api.getFavorites()
    .then(ui.getFavoritesSuccess)
    .catch(ui.getFavoritesFailure)
}

const onUpdate = function (event, data) {
  event.preventDefault()
  const id = data.favorite.id
  console.log(data)
  console.log(id)
  api.updateFavorite(data, id)
  .then(ui.updateFavoritesSuccess)
  .catch(ui.updateFavoritesFailure)
  getFavoriteNames(event)
}

const populateNouns = function (event) {
  event.preventDefault()
  api.getNouns()
    .then(ui.getNounsSuccess)
    .catch(ui.getNounsFailure)
}

const populateAdjectives = function (event) {
  event.preventDefault()
  api.getAdjectives()
    .then(ui.getAdjectivesSuccess)
    .catch(ui.getAdjectivesFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
  getFavoriteNames(event)
  populateNouns(event)
  populateAdjectives(event)
}

const onCreateFavorite = function (event, data) {
  event.preventDefault()
  api.createFavorite(data)
    .then(ui.updateFavoritesSuccess)
    .catch(ui.updateFavoritesFailure)
  getFavoriteNames(event)
}

const onDestroyFavorite = function (event, data, id) {
  event.preventDefault()
  api.destroyFavorite(data, id)
    .then(ui.destroyFavoriteSuccess)
    .catch(ui.destroyFavoriteFailure)
  getFavoriteNames(event)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#signout').on('submit', onSignOut)
}

module.exports = {
  addHandlers,
  onUpdate,
  populateNouns,
  populateAdjectives,
  onCreateFavorite,
  onDestroyFavorite
}
