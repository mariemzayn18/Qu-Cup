
import express from "express"
const router = new express.Router()
import { getAllMatches} from "../handlers/fan.js"
import { fanAuth } from '../middlewares/Guard.js'
// should put auth middleware 

router.get('/allmatches',[fanAuth],getAllMatches)


export default router

import { Router } from "express";
const router =Router()
import {getAllMatches,reserveMatch,cancelReservation,getAllUserReservations} from '../handlers/fan.js'

// should put auth middleware

router.get('/allmatches',getAllMatches)
router.post('/reservation',reserveMatch)
router.post('/cancelreservation',reserveMatch)
router.get('/allreservation',getAllUserReservations)

export default router
