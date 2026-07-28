import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { getDashboardStats } from "../../controllers/admin/dashboardController.js";

const router = express.Router();

router.get("/",protect,authorize("admin"),getDashboardStats);

export default router;