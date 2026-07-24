import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { getAllAttendance } from "../../controllers/admin/attendanceController.js";


const router = express.Router();

router.get("/",protect,authorize("admin"),getAllAttendance);


export default router;
