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

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
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

const onUpdate = function (even) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateFavorites(data)
    .then(ui.updateFavoritesSuccess)
    .then(ui.updateFavoritesFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#signout').on('submit', onSignOut)
}

module.exports = {
  addHandlers,
  onUpdate
}
