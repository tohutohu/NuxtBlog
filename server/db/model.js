import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import {Server} from '../../config'
const Schema = mongoose.Schema

const auth = !!(Server.user && Server.pass)

const url = `mongodb://${Server.mongo.user}${auth ? ':' : ''}${Server.mongo.pass}${auth ? '@' : ''}${Server.mongo.host || 'localhost'}:${Server.mongo.port || '27017'}/${Server.mongo.db}`

console.log(url)
const mongo = mongoose.createConnection(url)
autoIncrement.initialize(mongo)

const articleSchema = new Schema({
  id: Number,
  title: String,
  category: String,
  tags: [String],
  body: String,
  published: Date,
  lastModified: Date,
  thumbnailURL: String
})
articleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
})

const Article = mongo.model('Article', articleSchema)

export {Article}
