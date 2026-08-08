const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config/env");
const connectDB = require("./config/db");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
// const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
if (config.env !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/auth", authRoutes);

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
