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


export const getAllTasks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      priority,
    } = req.query;

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .populate({
        path: "assignedTo",
        select: "employeeId firstName lastName department designation",
      })
      .populate({
        path: "assignedBy",
        select: "name email",
      })
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / Number(limit)),
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      isDeleted: false,
    })
      .populate({
        path: "assignedTo",
        select: "employeeId firstName lastName email department designation",
      })
      .populate({
        path: "assignedBy",
        select: "name email",
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      priority,
      status,
      dueDate,
      remarks,
    } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

   
    if (assignedTo) {
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

      task.assignedTo = assignedTo;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    if (remarks !== undefined) task.remarks = remarks;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.isDeleted = true;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const assignTaskToMultipleEmployees = async (req, res) => {
  try {
    const {
      title,
      description,
      employeeIds,
      priority,
      dueDate,
      remarks,
    } = req.body;


     console.log("Received employeeIds:", employeeIds);  ////

    if (
      !title ||
      !description ||
      !employeeIds ||
      !employeeIds.length ||
      !dueDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    
    const employees = await Employee.find({
      _id: { $in: employeeIds },
      isDeleted: false,
    });

    ////
     console.log(
      "Found Employees:",
      employees.map(emp => ({
        _id: emp._id.toString(),
        employeeId: emp.employeeId,
        isDeleted: emp.isDeleted,
      }))
    );

    ///

    if (employees.length !== employeeIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more employees not found",
      });
    }



    
    const tasks = employees.map((employee) => ({
      title,
      description,
      assignedTo: employee._id,
      assignedBy: req.user._id,
      priority,
      dueDate,
      remarks,
    }));

    await Task.insertMany(tasks);

    res.status(201).json({
      success: true,
      message: `${tasks.length} tasks assigned successfully`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


