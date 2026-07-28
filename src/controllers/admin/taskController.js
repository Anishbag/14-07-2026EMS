import Task from "../../models/Task.js";
import Employee from "../../models/Employee.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      remarks,
    } = req.body;

        if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

   
    const employee = await Employee.findOne({
      _id: assignedTo,
      isDeleted: false,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user._id,
      priority,
      dueDate,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};