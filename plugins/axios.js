import * as axios from 'axios'
import {Server} from '../config'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `${Server.scheme || 'http'}://${process.env.HOST || Server.host || 'localhost'}:${process.env.PORT || Server.port || 3000}`
}

export default axios.create(options)
