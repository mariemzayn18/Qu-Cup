import { Router } from "express";
const router =Router()
import {getAllMatches,reserveMatch,cancelReservation,getAllUserReservations} from '../handlers/fan.js'

// should put auth middleware

router.get('/allmatches',getAllMatches)
router.post('/reservation',reserveMatch)
router.post('/cancelreservation',reserveMatch)
router.get('/allreservation',getAllUserReservations)

export default router
