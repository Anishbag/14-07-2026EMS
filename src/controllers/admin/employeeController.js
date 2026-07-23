import User from "../../models/User.js";
import Employee from "../../models/Employee.js";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      phone,
      alternatePhone,
      email,
      department,
      designation,
      joiningDate,
      salary,
      address,
      city,
      state,
      pinCode,
      emergencyContact,
      emergencyPhone,
    } = req.body;

    // Required Fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !department ||
      !designation
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Email Exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Phone Exists
    const phoneExists = await Employee.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    // Generate Employee ID
    const totalEmployees = await Employee.countDocuments();

    const employeeId = `EMP${String(totalEmployees + 1).padStart(4, "0")}`;

    // Temporary Password
    const tempPassword = "Employee@123";

    // Create User
    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: tempPassword,
      role: "employee",
    });

    // Create Employee
    const employee = await Employee.create({
      userId: user._id,
      employeeId,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      alternatePhone,
      email,
      department,
      designation,
      joiningDate,
      salary,
      address,
      city,
      state,
      pinCode,
      emergencyContact,
      emergencyPhone,
    });

    res.status(201).json({
      success: true,
      message: "Employee Created Successfully",
      loginCredentials: {
        email,
        password: tempPassword,
      },
      employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      department,
      status,
    } = req.query;

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ];
    }

    if (department) {
      query.department = department;
    }

    if (status) {
      query.status = status;
    }

    const totalEmployees = await Employee.countDocuments(query);

    const employees = await Employee.find(query)
      .populate("userId", "email role isActive lastLogin")
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalEmployees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: Number(page),
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Employee
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("userId", "email role isActive lastLogin");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    Object.assign(employee, req.body);

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// Soft Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.isDeleted = true;
    await employee.save();

    await User.findByIdAndUpdate(employee.userId, {
      isActive: false,
    });

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const changeEmployeeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    employee.status = status;
    await employee.save();

    await User.findByIdAndUpdate(employee.userId, {
      isActive: status === "Active",
    });

    res.status(200).json({
      success: true,
      message: `Employee ${status.toLowerCase()} successfully`,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};