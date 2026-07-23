import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin Dashboard",
      user: req.user,
    });
  }
);

router.get(
  "/employee-dashboard",
  protect,
  authorize("employee"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Employee Dashboard",
      user: req.user,
    });
  }
);

export default router;