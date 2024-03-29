import { Router } from "express";
const router =Router()
import {addMatch,addStadium, getMatch,viewVacantResSeats,editMatch,allStadium} from "../handlers/manager.js"
import { managerAuth } from '../middlewares/Guard.js' ;

// should put auth middleware
router.post('/match',[managerAuth],addMatch);
router.post('/stadium',[managerAuth],addStadium);
router.get('/match/:matchID',[managerAuth],getMatch)
router.get('/match/viewseats/:matchID',[managerAuth],viewVacantResSeats)
router.patch('/match/:matchID',[managerAuth],editMatch)
router.get('/allstadium',[managerAuth],allStadium)

export default router

