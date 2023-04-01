const settingsController = require('../controllers/settingsController.js')

const router = require('express').Router()

router.get('/getAllSettingValues', settingsController.getAllSettingValues)
router.post('/setOneSettingValues', settingsController.setOneSettingValues)

module.exports = router
