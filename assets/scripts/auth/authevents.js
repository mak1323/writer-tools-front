'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
  $('.bs-change-password').modal('toggle')
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
  $('.bs-sign-out').modal('toggle')
}

const getFavoriteNames = function (data) {
  api.getFavorites(data)
    .then(ui.getFavoritesSuccess)
    .catch(ui.getFavoritesFailure)
}

const getUpdateNameList = function (data) {
  api.getFavorites(data)
    .then(ui.getUpdateNameListSuccess)
    .catch(ui.getUpdateNameListFailure)
}

const onUpdate = function (event, data) {
  event.preventDefault()
  const id = data.favorite.id
  api.updateFavorite(data, id)
  .then(ui.updateFavoritesSuccess)
  .then(getUpdateNameList)
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
  api.signIn(data)
    .then(ui.signInSuccess)
    .then(getFavoriteNames)
    .catch(ui.signInFailure)
  populateNouns(event)
  populateAdjectives(event)
  $('.bs-sign-in').modal('toggle')
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  if (data.credentials.password === data.credentials.password_confirmation) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .then((creds) => onSignIn(creds))
      .catch(ui.signUpFailure(data))
  } else {
    console.error("Passwords don't match, friend.")
  }
  $('.bs-sign-up').modal('toggle')
}

const onCreateFavorite = function (event, data) {
  event.preventDefault()
  api.createFavorite(data)
    .then(ui.updateFavoritesSuccess)
    .then(getUpdateNameList)
    .catch(ui.updateFavoritesFailure)
}

const onDestroyFavorite = function (event, data, id) {
  event.preventDefault()
  api.destroyFavorite(data, id)
    .then(ui.destroyFavoriteSuccess)
    .then(getUpdateNameList)
    .catch(ui.destroyFavoriteFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp).on('submit', onSignIn)
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
  onDestroyFavorite,
  getUpdateNameList

}
