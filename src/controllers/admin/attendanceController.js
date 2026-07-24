import Attendance from "../../models/Attendance.js";


export const getAllAttendance = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (date) {
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);

      query.date = {
        $gte: selectedDate,
        $lt: nextDate,
      };
    }

    const totalRecords = await Attendance.countDocuments(query);

    const attendance = await Attendance.find(query)
      .populate({
        path: "employee",
        select: "employeeId firstName lastName department designation",
      })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      totalRecords,
      totalPages: Math.ceil(totalRecords / Number(limit)),
      currentPage: Number(page),
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};