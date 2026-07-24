import Attendance from "../../models/Attendance.js";
import Employee from "../../models/Employee.js";

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

    // Ajker Date (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // jodi age theke Checked In?
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

    //  Attendance create hobe
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



// Employee Check Out
export const checkOut = async (req, res) => {
  try {
    // Find Employee
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

    // ajker date Date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find Today's Attendance
    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "Please check in first",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "You have already checked out today",
      });
    }

    // Save Check Out Time
    attendance.checkOut = new Date();

    // Calculate Working Hours
    const totalMilliseconds =
      attendance.checkOut.getTime() - attendance.checkIn.getTime();

    attendance.workingHours = Number(
      (totalMilliseconds / (1000 * 60 * 60)).toFixed(2)
    );

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Check Out Successful",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



