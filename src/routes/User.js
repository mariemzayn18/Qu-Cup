import { Router } from "express";
import {handleUserSignUp, handleLogin, handleApproveUser, handlegetAllUser, handleDeleteUser} from "../handlers/User.js";
import { adminAuth } from "../middlewares/Guards.js";
const router = Router()

router.post("/signup", handleUserSignUp)
router.post("/login", handleLogin)
router.post("/approve", [ adminAuth ],handleApproveUser)
router.get("/", [ adminAuth ],handlegetAllUser)
router.delete("/:userid", [ adminAuth ],handleDeleteUser)

export default router