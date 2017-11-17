import { Router } from 'express'

import Admin from './admin'
import Public from './public'
import users from './users'

const router = Router()

// Add USERS Routes
router.use('/admin', Admin)
router.use(Public)
router.use(users)

export default router
