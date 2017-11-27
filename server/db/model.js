const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const {Server} = require('../../config')
const Schema = mongoose.Schema

const auth = !!(Server.user && Server.pass)

const url = `mongodb://${Server.mongo.user}${auth ? ':' : ''}${Server.mongo.pass}${auth ? '@' : ''}${Server.mongo.host || 'localhost'}:${Server.mongo.port || '27017'}/${Server.mongo.db}`

console.log(url)
const mongo = mongoose.createConnection(url)
let connected = false
mongo.on('open', () => {
  connected = true
  console.log('Mongodb connected!')
})
autoIncrement.initialize(mongo)

const articleSchema = new Schema({
  id: Number,
  title: String,
  category: String,
  tags: [String],
  body: String,
  published: Date,
  lastModified: Date,
  state: String,
  thumbnailURL: String
})
articleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

const Article = mongo.model('Article', articleSchema)
const waitConnect = async () => {
  if (!connected) {
    console.log('waiting connect mongo ...')
    await new Promise(resolve => mongo.on('open', resolve))
  }
}

module.exports = {Article, waitConnect, connection: mongo}
