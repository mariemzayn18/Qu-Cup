import { Router } from "express";
import { handleApproveUser,handlegetAllRequests, handleDeleteUser,handlegetAllFans, handlegetAllManagers} from "../handlers/Administrator.js";
import { adminAuth } from "../middlewares/Guard.js";
const router = Router()

router.post("/approve", [ adminAuth ],handleApproveUser)
router.get("/allrequests", [ adminAuth ],handlegetAllRequests)
router.get("/allusers", [ adminAuth ],handlegetAllFans)
router.get("/allmanagers", [ adminAuth ],handlegetAllManagers)
router.delete("/:userid", [ adminAuth ],handleDeleteUser)

export default router