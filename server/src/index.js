const express = require("express");
const config = require("./config/env");
const connectDB = require("./config/db");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Feature routers (auth, tasks) get mounted here, above the two handlers below.

app.use(notFound);
app.use(errorHandler);

async function startServer() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(
      `[SERVER] ${config.env.toUpperCase()} environment running on port ${config.port}.`,
    );
  });
}

startServer();
