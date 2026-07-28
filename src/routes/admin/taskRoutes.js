import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";
import { createTask } from "../../controllers/admin/taskController.js";

const router = express.Router();

router.post("/",protect,authorize("admin"),createTask);

export default router;