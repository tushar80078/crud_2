const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// ------------ Import from other file ---------------------

const errorMiddleware = require("./helper/middleware/errorMiddleware");
const routes = require("./routes/allRoutes.routes");

// --------------- Test Route ------------------------------
app.use("/test", function (req, res, next) {
  res.send(`<html><body><h1>Server Started</h1></body></html>`);
});

// ------------ All Parent Routes ---------------------
app.use("/", routes);

app.use(errorMiddleware);

module.exports = app;
