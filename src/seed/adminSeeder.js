import dotenv from "dotenv";
dotenv.config();

import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {

    await connectDB();

    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      name: "System Admin",
      email: "admin@gmail.com",
      password: "1234",
      role: "admin",
    });

    console.log("Admin Created Successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

seedAdmin();