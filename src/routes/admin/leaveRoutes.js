import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { getAllLeaves, updateLeaveStatus } from "../../controllers/admin/leaveController.js";

const router = express.Router();

router.get("/",protect,authorize("admin"),getAllLeaves);
router.put("/:id/status",protect,authorize("admin"),updateLeaveStatus);

export default router;