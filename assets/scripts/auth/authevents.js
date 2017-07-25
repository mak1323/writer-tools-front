'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

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

const onUpdate = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateFavorites(data)
    .then(ui.updateFavoritesSuccess)
    .catch(ui.updateFavoritesFailure)
}

const getFavoriteNames = function (event) {
  event.preventDefault()
  api.getFavorites()
    .then(ui.getFavoritesSuccess)
    .catch(ui.getFavoritesFailure)
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
  populateAdjectives
}
