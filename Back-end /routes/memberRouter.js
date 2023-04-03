const memberController = require('../controllers/memberController.js')

const router = require('express').Router()

router.post('/addMember', memberController.addMember)
router.post('/setMemberStateRegular', memberController.setMemberStateRegular)

module.exports = router
