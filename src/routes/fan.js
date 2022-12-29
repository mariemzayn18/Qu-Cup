
import { Router } from "express";
const router =Router()
import {getAllMatches,reserveMatch,cancelReservation,getAllUserReservations} from '../handlers/fan.js'
import { fanAuth } from '../middlewares/Guard.js'
// should put auth middleware

router.get('/allmatches',[fanAuth],getAllMatches)
router.post('/reservation',[fanAuth],reserveMatch)
router.post('/cancelreservation',[fanAuth],cancelReservation)
router.get('/allreservation',[fanAuth],getAllUserReservations)


export default router

