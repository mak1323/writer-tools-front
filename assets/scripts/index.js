'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/authevents.js')
const events = require('./events')

$(() => {
  setAPIOrigin(location, config)
  $('#sign-out-btn').hide()
  $('#change-password-btn').hide()
  $('.content').hide()
})

$(() => {
  authEvents.addHandlers()
})

$(() => {
  $('#name-generator').on('click', events.generateName)
  $('#save-name').on('click', events.postFavorite)
  $('#save-name-edit').on('click', events.patchFavorite)
  $('#delete-name').on('click', events.deleteFavorite)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
