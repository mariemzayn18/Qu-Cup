import { Router } from "express";
import { handleApproveUser, handlegetAllUser, handleDeleteUser} from "../handlers/Administrator.js";
import { adminAuth } from "../middlewares/Guard.js";
const router = Router()

router.post("/approve", [ adminAuth ],handleApproveUser)
router.get("/allusers", [ adminAuth ],handlegetAllUser)
router.delete("/:userid", [ adminAuth ],handleDeleteUser)

export default router