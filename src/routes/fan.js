import { Router } from "express";
const router =Router()
import {getAllMatches} from '../handlers/fan.js'

// should put auth middleware
// should put auth middleware

router.get('/allmatches',getAllMatches)

export default router
