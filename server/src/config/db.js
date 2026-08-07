const mongoose = require("mongoose");
const config = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("[DATABASE] MongoDB connected successfully.");
  } catch (error) {
    console.log(`[DATABASE] MongoDB connection failed: ${error.message}.`);
    process.exit(1);
  }
}

module.exports = connectDB;
