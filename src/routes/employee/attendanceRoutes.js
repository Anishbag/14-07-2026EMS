import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";
import { checkIn, checkOut } from "../../controllers/employee/attendanceController.js";
const router = express.Router();


router.post("/check-in",protect,authorize("employee"),checkIn);

router.post("/check-out",protect,authorize("employee"),checkOut)


export default router;


