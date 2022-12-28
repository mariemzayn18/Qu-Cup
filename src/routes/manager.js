import { Router } from "express";
const router = Router()
const managerController = require('../controllers/manager')

// should put auth middleware 
router.post('/match',managerController.addMatch);
router.post('/stadium',managerController.addStadium);
router.get('/match/:matchID',managerController.getMatch)
router.get('/match/viewseats/:matchID',managerController.viewVacantResSeats)
router.patch('/match/:matchID',managerController.editMatch)

export default router