const express = require('express')
const lift = require('./lift.route')
const app = express()

app.use('/api/', lift)

module.exports = app
