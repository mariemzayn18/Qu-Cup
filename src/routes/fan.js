const express = require('express')
const router = new express.Router()
const fanController = require('../controllers/fan')

// should put auth middleware 

router.get('/allmatches',fanController.getAllMatches)

module.exports = router