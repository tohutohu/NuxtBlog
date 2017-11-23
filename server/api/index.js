const { Router } = require('express')
const Admin = require('./admin')
const Public = require('./public')

const router = Router()

// Add USERS Routes
router.use('/admin', Admin)
router.use(Public)

module.exports = router
