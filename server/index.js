import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import {Server} from '../config'
import bodyParser from 'body-parser'
import session from 'express-session'

import api from './api'

const app = express()
const host = process.env.HOST || Server.host || '127.0.0.1'
const port = process.env.PORT || Server.port || 3000

app.use(bodyParser.json())
app.use(session({
  secret: 'aaa',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000,
    secure: false
  }
}))

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
