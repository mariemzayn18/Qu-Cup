import express from "express"
const router = new express.Router()
import {addMatch,addStadium, getMatch,viewVacantResSeats,editMatch} from "../handlers/manager.js"
import { managerAuth } from '../middlewares/Guard.js' ;

// should put auth middleware 
router.post('/match',[managerAuth],addMatch);
router.post('/stadium',[managerAuth],addStadium);
router.get('/match/:matchID',[managerAuth],getMatch)
router.get('/match/viewseats/:matchID',[managerAuth],viewVacantResSeats)
router.patch('/match/:matchID',[managerAuth],editMatch)

export default router