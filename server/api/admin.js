const { Router } = require('express')
const {Server} = require('../../config')
const {Article} = require('../db/model')
const multer = require('multer')
const path = require('path')
const mime = require('mime')
const crypto = require('crypto')
const mkdirp = require('mkdirp')
let dest = path.resolve(__dirname, '../../static/images')
mkdirp.sync(dest)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) {
        cb(err, null)
      }
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype))
    })
  }
})

const upload = multer({storage}).single('image')

const local = `localhost:${Server.port}`

const router = Router()

router.post('/login', (req, res) => {
  if (req.body.user === Server.user && req.body.pass === Server.pass) {
    req.session.authUser = {user: req.body.user}
    return res.json({ user: req.body.user })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST /api/logout してログアウトし、ログアウトしたユーザーを req.session から削除
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

router.use((req, res, next) => {
  if (req.headers.host !== local && !req.session.authUser) {
    res.status(401).json({error: 'authentication fail'})
    return
  }
  next()
})

router.get('/articles', async (req, res) => {
  const articles = await Article.find({})
  return res.json(articles || {})
})

router.post('/articles', async (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    category: req.body.category,
    tags: req.body.tags,
    body: req.body.body,
    thumbnailURL: req.body.thumbnailURL,
    published: req.body.state === 'publish' ? Date.now() : null,
    state: req.body.state,
    lastModified: Date.now()
  })
  newArticle.save((err) => {
    if (err) {
      res.status(500).json(err)
      return
    }
    res.status(201).json({ok: true, id: newArticle.id})
  })
})

router.get('/articles/:id', async (req, res) => {
  const article = await Article.find({id: req.params.id})
  if (!article) {
    res.status(404).json({error: 'article not found'})
    return
  }
  res.json(article[0])
})

router.post('/articles/:id', async (req, res) => {
  const data = {
    title: req.body.title,
    category: req.body.category,
    tags: req.body.tags,
    body: req.body.body,
    state: req.body.state,
    thumbnailURL: req.body.thumbnailURL,
    lastModified: Date.now()
  }
  if (req.body.oldState !== 'publish' && req.body.state === 'publish') {
    data.state = req.body.state
    data.published = Date.now()
  }
  const article = await Article.findOneAndUpdate({id: req.params.id},
    {
      $set: data
    })
  res.json(article)
})

router.post('/image', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(201).json({path: '/images/' + req.file.filename})
    }
  })
})

module.exports = router
