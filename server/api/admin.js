import { Router } from 'express'
import {Server} from '../../config'

const router = Router()

router.post('/admin/login', (req, res) => {
  if (req.body.user === Server.user && req.body.pass === Server.pass) {
    req.session.authUser = {user: req.body.user}
    return res.json({ user: req.body.user })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST /api/logout してログアウトし、ログアウトしたユーザーを req.session から削除
router.post('/admin/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

export default router
