/** @format */

var util = require('util')
var events = require('events')

const axios = require('axios')
const store = require('store')

function Login() {
  events.EventEmitter.call(this)
}

util.inherits(Login, events.EventEmitter)

Login.prototype.command = function(payload) {
  axios.post('http://localhost:3333/v1/login', payload).then(res => {
    console.log(res.data.token)
    store.set('ground_monitor_token', res.data.token)
    this.emit('complete')
  })

  return this
}

module.exports = Login
