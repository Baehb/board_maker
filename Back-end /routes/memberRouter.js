const memberController = require('../controllers/memberController.js')

const router = require('express').Router()

router.post('/addMember', memberController.addMember)

module.exports = router
