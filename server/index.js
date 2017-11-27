const express = require('express')
const { Nuxt, Builder, Generator } = require('nuxt')
const {Server} = require('../config')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const {waitConnect, connection} = require('./db/model')
const api = require('./api')

const app = express()
const host = process.env.HOST || Server.host || '127.0.0.1'
const port = process.env.PORT || Server.port || 3000

app.use(bodyParser.json())
app.use(session({
  secret: 'aaa',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    maxAge: 600000
  },
  store: new MongoStore({mongooseConnection: connection})
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

if (process.env.BUILD) {
  nuxt.plugin('generator', generator => {
    generator.plugin('generateRoutes', ({generateRoutes}) => {
      generateRoutes.push('/', '404')
    })
  })
}

// Listen the server
app.listen(port, host, async () => {
  await waitConnect()
  if (process.env.BUILD) {
    const builder = new Builder(nuxt)
    const generator = new Generator(nuxt, builder)
    generator.generate({
      init: true,
      build: false
    })
      .then(res => {
        console.log('DONE!!!!\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n', res)
        process.exit(0)
      })
      .catch(err => {
        console.log('ERROR!!!!\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n', err)
        process.exit(1)
      })
  }
})
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
