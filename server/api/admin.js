import { Router } from 'express'
import {Server} from '../../config'
import {Article} from '../db/model'

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
  if (!req.session.authUser) {
    res.status(401).json({error: 'authentication fail'})
  }
  next()
})

router.get('/articles', async (req, res) => {
  const articles = await Article.find({})
  return res.json(articles)
})

router.post('/articles', async (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    category: req.body.category,
    tags: req.body.tags,
    body: req.body.body,
    thumbnailURL: req.body.thumbnailURL,
    published: req.body.state === 'publish' ? Date.now() : null,
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
  res.json(article)
})

router.post('/articles/:id', async (req, res) => {
  const data = {
    title: req.body.title,
    category: req.body.category,
    tags: req.body.tags,
    body: req.body.body,
    thumbnailURL: req.body.thumbnailURL,
    lastModified: Date.now()
  }
  if (req.body.state === 'publish') {
    data.state = req.body.state
    data.published = Date.now()
  }
  const article = await Article.findOneAndUpdate({id: req.params.id},
    {
      $set: data
    })
  res.json(article)
})

export default router
