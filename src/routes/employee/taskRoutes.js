import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { getMyTasks, updateTaskStatus } from "../../controllers/employee/taskController.js";

const router = express.Router();

router.get("/my-tasks",protect,authorize("employee"),getMyTasks);
router.patch("/:id/status",protect,authorize("employee"),updateTaskStatus);

export default router;