import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";
import { applyLeave, getLeaveHistory } from "../../controllers/employee/leaveController.js";


const router = express.Router();

router.post("/apply",protect, authorize("employee"),applyLeave);
router.get("/history",protect,authorize("employee"),getLeaveHistory);


export default router;
