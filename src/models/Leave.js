import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
    {
        employee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        leaveType:{
            type: String,
            enum:  ["Casual","Sick","Emergency"],
            required: true,
        },

        fromDate:{
            type: Date,
            required: true,
        },

        toDate:{
            type: Date,
            required: true,
        },

        reason:{
            type: String,
            required: true,
            trim: true,
        },

        status:{
            type: String,
            enum: ["Pending","Approved","Rejected"],
            default: "Pending",
        },

        adminRemark:{
            type: String,
            default: "",
        },

    },
    {
        timestamps: true,
    }
);

const Leave = mongoose.model("Leave",leaveSchema);
export default Leave;