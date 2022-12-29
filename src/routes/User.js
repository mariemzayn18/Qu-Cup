import { Router } from "express";
import { getAllMatches } from "../handlers/fan.js"
import {handleUserSignUp, handleLogin,handleUpdateData } from "../handlers/User.js";
import { userAuth } from "../middlewares/Guard.js";

const router = Router()

router.post("/signup", handleUserSignUp)
router.post("/login", handleLogin)
router.get('/allmatches',getAllMatches)
router.put('/edit_profile',[userAuth],handleUpdateData)


export default router