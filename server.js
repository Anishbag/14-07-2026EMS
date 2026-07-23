import dotenv from "dotenv";

import dns from "dns" ///new

dns.setServers(["1.1.1.1","8.8.8.8"])

dotenv.config();

import app from "./app.js";

import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});