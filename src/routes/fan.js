import { Router } from "express";
const router = Router()
const fanController = require("../controllers/fan");

// should put auth middleware

router.get("/allmatches", fanController.getAllMatches);

export default router;
