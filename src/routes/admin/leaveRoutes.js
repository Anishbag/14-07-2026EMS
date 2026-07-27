import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { getAllLeaves } from "../../controllers/admin/leaveController.js";

const router = express.Router();

router.get("/",protect,authorize("admin"),getAllLeaves);

export default router;