import express from "express"
const router = new express.Router()
import { getAllMatches} from "../handlers/fan.js"
import { fanAuth } from '../middlewares/Guard.js'
// should put auth middleware 

router.get('/allmatches',[fanAuth],getAllMatches)


export default router