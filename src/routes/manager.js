import { Router } from "express";
const router = Router()
import {addMatch,addStadium,getMatch,viewVacantResSeats,editMatch} from '../handlers/manager.js'

// should put auth middleware
router.post('/match',addMatch);
router.post('/stadium',addStadium);
router.get('/match/:matchID',getMatch)
router.get('/match/viewseats/:matchID',viewVacantResSeats)
router.patch('/match/:matchID',editMatch)

export default router
