const {Client} = require('./config')
let Article
if (process.env.NODE_ENV === 'production' && process.env.BUILD) {
  const {_Article} = require('./server/db/model')
  Article = _Article
}
const isBuild = process.env.BUILD === 'true'
console.log('Build:', isBuild)
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
      if (isBuild) {
        config.devtool = '#eval'
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
      return Article.find({state: 'publish'}).select({id: 1})
        .then(res => {
          console.log(res)
          return res.map(article => {
            return '/posts/' + article.id
          })
        })
    }
  },

  minify: {
    removeAttributeQuotes: true,
    removeComments: true,
    sortAttributes: false,
    sortClassName: false
  }
}
