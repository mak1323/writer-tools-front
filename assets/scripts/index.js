'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/authevents.js')
const events = require('./events')
const store = require('./store')

// set api and set the stage for everything else.
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

// add handlers-user functions
$(() => {
  authEvents.addHandlers()
})

// event handlers
$(() => {
  // load the single page application for name generator
  $('#nameGeneratorSpa').on('click', function (event) {
    // show the name gen
    $('#name-generator-page').show()
    // hide landing page
    $('#landing-page').hide()
    // hide character page
    $('#character-generator-page').hide()
  })
  // single page application loader for character gen in developement
  $('#characterGeneratorSpa').on('click', function (event) {
    // show character gen
    $('#character-generator-page').show()
    // hide landing page
    $('#landing-page').hide()
    // hide name gen
    $('#name-generator-page').hide()
  })
  // generator handler
  $('#name-generator').on('click', events.generateName)
  // name saver
  $('#save-name').on('click', events.postFavorite)
  // update name saver
  $('#save-name-edit').on('click', events.patchFavorite)
  // delete name handler
  $('#delete-name').on('click', events.deleteFavorite)
  // this loads the edit and delete modal with the correct content
  $('#editDeleteModal').on('show.bs.modal', function (event) {
    // just converts the array that is returned into a variable
    const changer = $(event.relatedTarget) // Button that triggered
    // gets the id from the array
    const id = parseInt(changer[0].id)
    // pulls from store.favorites. Not absolutely nescessary, but streamlines it
    const favorites = store.favorites
    // cycles through the returned favorites to find the correct one. assigns values
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
  // this clears the modal when it is hidden.
  $('.modal').on('hidden.bs.modal', function(){
    $('.modal-body1').html('')
  })
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
