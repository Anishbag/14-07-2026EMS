import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    alternatePhone: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    salary: {
      type: Number,
      default: 0,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    pinCode: {
      type: String,
    },

    emergencyContact: {
      type: String,
    },

    emergencyPhone: {
      type: String,
    },

    profileImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;