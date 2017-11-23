import * as axios from 'axios'
import {Server} from '../config'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `${Server.scheme || 'http'}://${process.env.HOST || Server.host || 'localhost'}:${process.env.PORT || Server.port || 3000}`
}

options.withCredentials = true

const instance = axios.create(options)

if (process.browser && process.static) {
  instance.interceptors.request.use(config => {
    config.url = config.url + '.json'
    return config
  })
}

if (process.server && process.env.BUILD) {
  const mkdirp = require('mkdirp-promise')
  const { join, dirname } = require('path')
  const { writeFileSync } = require('fs')

  instance.interceptors.response.use(
    async res => {
      const path = join(process.env.dataDir, res.request.path + '.json')
      console.log('Save', path)
      await mkdirp(dirname(path))
      writeFileSync(path, JSON.stringify(res.data))
      return res
    }, err => {
      return Promise.reject(err)
    }
  )
}

export default instance
