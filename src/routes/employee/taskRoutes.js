import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { getMyTasks } from "../../controllers/employee/taskController.js";

const router = express.Router();

router.get("/my-tasks",protect,authorize("employee"),getMyTasks);

export default router;