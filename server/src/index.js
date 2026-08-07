const express = require("express");
const config = require("./config/env");
const connectDB = require("./config/db");

const app = express();

async function startServer() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(
      `[SERVER] ${config.env.toUpperCase()} environment running on port ${config.port}.`,
    );
  });
}

startServer();
