import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth/authRoutes.js";
import testRoutes from "./src/routes/testRoutes.js";
import employeeRoutes from "./src/routes/admin/employeeRoutes.js";
import attendanceRoutes from "./src/routes/employee/attendanceRoutes.js";
import adminAttendanceRouter from "./src/routes/admin/attendanceRoutes.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/auth",authRoutes);
app.use("/api/test",testRoutes);
app.use("/api/admin/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin/attendance",adminAttendanceRouter);

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Employee Management Backend Running"

    });

});

export default app;