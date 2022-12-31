import { Router } from "express";
import { getAllMatches } from "../handlers/fan.js"
import {handleUserSignUp, handleLogin,handleUpdateData,handleGetUserData } from "../handlers/User.js";
import { userAuth } from "../middlewares/Guard.js";

const router = Router()

router.post("/signup", handleUserSignUp)
router.post("/login", handleLogin)
router.get('/allmatches',getAllMatches)
router.get('/',handleGetUserData)
router.put('/edit_profile',[userAuth],handleUpdateData)


export default router