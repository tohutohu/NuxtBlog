const { Router } = require('express')
const {Article} = require('../db/model')

const router = Router()

router.get('/tags', async (req, res) => {
  const data = {
    tags: await Article.find().distinct('tags')
  }
  res.json(data)
})

router.get('/articles', async (req, res) => {
  const data = {
    articles: await Article.find({state: 'publish'}).select({id: 1, title: 1, published: 1, category: 1, tags: 1, thumbnailURL: 1}).sort({published: -1})
  }
  res.json(data)
})

router.get('/articles/:id', async (req, res) => {
  const data = {
    article: await Article.findOne({id: req.params.id, state: 'publish'}).select({id: 1, title: 1, published: 1, category: 1, tags: 1, body: 1, thumbnailURL: 1})
  }
  if (!data.article) {
    console.log('Not found')
    res.status(404).json({})
    return
  }
  res.json(data)
})
module.exports = router
