import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";


// Employee Check In
export const checkIn = async (req, res) => {
  try {
    // Login User
    const employee = await Employee.findOne({
      userId: req.user._id,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found",
      });
    }

    // Today's Date (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Already Checked In?
    const alreadyCheckedIn = await Attendance.findOne({
      employee: employee._id,
      date: today,
    });

    if (alreadyCheckedIn) {
      return res.status(400).json({
        success: false,
        message: "You have already checked in today",
      });
    }

    // Create Attendance
    const attendance = await Attendance.create({
      employee: employee._id,
      date: today,
      checkIn: new Date(),
      status: "Present",
    });

    res.status(201).json({
      success: true,
      message: "Check In Successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};