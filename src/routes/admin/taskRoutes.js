import express from "express";
import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask, assignTaskToMultipleEmployees } from "../../controllers/admin/taskController.js";

const router = express.Router();

router.post("/",protect,authorize("admin"),createTask);
router.get("/",protect,authorize("admin"),getAllTasks);
router.get("/:id",protect,authorize("admin"),getTaskById);
router.put("/:id",protect,authorize("admin"),updateTask);
router.delete("/:id",protect,authorize("admin"),deleteTask);
router.post("/assign-multiple",protect,authorize("admin"),assignTaskToMultipleEmployees);

export default router;