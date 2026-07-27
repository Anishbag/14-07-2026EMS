import Leave from "../../models/Leave.js";

export const getAllLeaves = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }

    const totalLeaves = await Leave.countDocuments(query);

    const leaves = await Leave.find(query)
      .populate({
        path: "employee",
        select: "employeeId firstName lastName department designation",
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalLeaves,
      totalPages: Math.ceil(totalLeaves / Number(limit)),
      currentPage: Number(page),
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};