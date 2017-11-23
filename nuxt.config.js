const {Client, Server} = require('./config')
const axios = require('axios')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Quicksand'}
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-i18n', 'vue-markdown'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    {src: '~/plugins/i18n.js'}
  ],

  modules: [
    ['@nuxtjs/toast',
      {
        position: 'top-center',
        duaration: 3000
      }
    ],
    ['@nuxtjs/google-analytics',
      {
        id: Client.ga
      }
    ]
  ],

  generate: {
    routes () {
      return axios.get(`http://localhost:${Server.port || 3000}/api/articles`)
        .then(res => {
          res.data.map(article => {
            return '/posts/' + article.id
          })
        })
    }
  }
}
