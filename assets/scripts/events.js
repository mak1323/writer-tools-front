'use strict'

const authEvents = require('./auth/authevents')
const store = require('./store')

let noun
let adjective

// This creates a random number based off the size of tables. Right now, this is
// set manually
const randomizeWord = function () {
  return Math.random() * (154 - 1) + 1
}

const generateName = function (event) {
  noun = store.nouns[parseInt(randomizeWord())].word
  adjective = store.adjectives[parseInt(randomizeWord())].word
  console.log('The ' + adjective + ' ' + noun)
}

module.exports = {
  generateName
}
