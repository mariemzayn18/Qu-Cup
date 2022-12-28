const express = require('express')
const router = new express.Router()
const managerController = require('../controllers/manager')

// should put auth middleware 
router.post('/match',managerController.addMatch);
router.post('/stadium',managerController.addStadium);
router.get('/match/:matchID',managerController.getMatch)
router.get('/match/viewseats/:matchID',managerController.viewVacantResSeats)
router.patch('/match/:matchID',managerController.editMatch)

module.exports = router