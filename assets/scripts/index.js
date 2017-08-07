'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/authevents.js')
const events = require('./events')
const store = require('./store')

$(() => {
  setAPIOrigin(location, config)
  $('#sign-out-btn').hide()
  $('#change-password-btn').hide()
  $('#id-text').hide()
  $('#characterGeneratorSpa').hide()
  $('#nameGeneratorSpa').hide()
  $('#character-generator-page').hide()
  $('#name-generator-page').hide()
})

$(() => {
  authEvents.addHandlers()
})

$(() => {
  $('#nameGeneratorSpa').on('click', function (event) {
    $('#name-generator-page').show()
    $('#landing-page').hide()
    $('#character-generator-page').hide()
  })
  $('#characterGeneratorSpa').on('click', function (event) {
    $('#character-generator-page').show()
    $('#landing-page').hide()
    $('#name-generator-page').hide()
  })
  $('#name-generator').on('click', events.generateName)
  $('#save-name').on('click', events.postFavorite)
  $('#save-name-edit').on('click', events.patchFavorite)
  $('#delete-name').on('click', events.deleteFavorite)
  $('#editDeleteModal').on('show.bs.modal', function (event) {
    console.log('working')
    const changer = $(event.relatedTarget) // Button that triggered
    const id = parseInt(changer[0].id)
    const favorites = store.favorites
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id === id) {
        console.log(favorites[i])
        document.getElementById('noun-text').value = favorites[i].noun
        document.getElementById('adjective-text').value = favorites[i].adjective
        document.getElementById('comment-text').value = favorites[i].comment
        document.getElementById('id-text').value = favorites[i].id
      }
    }
  })
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
