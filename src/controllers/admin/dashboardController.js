import Employee from "../../models/Employee.js";

import Leave from "../../models/Leave.js";
import Attendance from "../../models/Attendance.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalEmployees,
      activeEmployees,
      totalTasks,
      pendingTasks,
      completedTasks,
      totalLeaves,
      pendingLeaves,
      todayAttendance,
    ] = await Promise.all([
      Employee.countDocuments({ isDeleted: false }),
      Employee.countDocuments({
        isDeleted: false,
        status: "Active",
      }),
      Task.countDocuments(),
      Task.countDocuments({ status: "Pending" }),
      Task.countDocuments({ status: "Completed" }),
      Leave.countDocuments(),
      Leave.countDocuments({ status: "Pending" }),
      Attendance.countDocuments({ date: today }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        totalTasks,
        pendingTasks,
        completedTasks,
        totalLeaves,
        pendingLeaves,
        todayAttendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};