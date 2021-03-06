const {Client} = require('./config')
let Article
if (process.env.NODE_ENV === 'production' && process.env.BUILD) {
  console.log('Generate!')
  const models = require('./server/db/model')
  Article = models.Article
}
const isBuild = process.env.BUILD === 'true'
console.log('Build:', isBuild)
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'とーふとふのブログ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'とーふとふのブログです' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Quicksand'},
      { rel: 'stylesheet', href: '/vendor/prismjs/themes/prism.css'}
    ],
    script: [
      {src: 'https://platform.twitter.com/widgets.js'}
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
    vendor: ['axios', 'vue-i18n'],
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
    ],
    '@nuxtjs/vendor'
  ],

  vendor: ['prismjs'],

  env: {
    static: !!process.env.STATIC
  },

  generate: {
    routes () {
      return Article.find({state: 'publish'}).select({id: 1})
        .then(res => {
          return res.map(article => {
            return '/posts/' + article.id
          })
        })
    }
  }

}
