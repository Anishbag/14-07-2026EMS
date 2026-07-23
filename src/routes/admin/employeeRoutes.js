import express from "express";

import protect from "../../middleware/authMiddleware.js";
import authorize from "../../middleware/roleMiddleware.js";

import { createEmployee, getAllEmployees ,getEmployeeById, updateEmployee, deleteEmployee, changeEmployeeStatus} from "../../controllers/admin/employeeController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createEmployee
);

router.get("/",protect,authorize("admin"),getAllEmployees);

router.get("/:id",protect,authorize("admin"),getEmployeeById);

router.put("/:id",protect,authorize("admin"),updateEmployee);

router.delete("/:id",protect,authorize("admin"),deleteEmployee);

router.patch("/:id/status",protect,authorize("admin"),changeEmployeeStatus);

export default router;