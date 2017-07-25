'use strict'

const authEvents = require('./auth/authevents')

const getAllNames = function (event) {
  event.preventDefault()
  authEvents.getFavorites()
}

module.exports = {
  getAllNames
}
