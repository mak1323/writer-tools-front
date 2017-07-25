'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/authevents.js')
const events = require('./events')

$(() => {
  setAPIOrigin(location, config)
  $('#change-password').hide()
  $('#signout').hide()
})

$(() => {
  authEvents.addHandlers()
})

$(() => {
  $('#name-generator').on('click', events.generateName)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
