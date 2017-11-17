const Server = {
  scheme: 'http',
  host: '127.0.0.1',
  port: '3000',
  user: 'tohutohu',
  pass: 'soy',
  cookieSecret: 'daizu',
  mongo: {
    host: 'localhost',
    port: '27017',
    user: 'nuxt',
    pass: 'blog',
    db: 'NuxtBlog'
  }
}

const Client = {
  lang: 'ja',
  ga: 'UA-xxxxxx-x'
}
export {Server, Client}
