const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
  dbUrl: process.env.MONGO_URI,
};

if (!config.dbUrl)
  throw new Error("MONGO_URI is missing in environment variables.");

module.exports = Object.freeze(config);
