const express = require("express");
const cors = require('cors')

const projectRoutes = require("./routes/project");
const actionRoutes = require("./routes/action");

const server = express();

//custom middleware
server.use(express.json());
server.use(cors())
server.use(logger);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to API Service" });
});

server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

function logger(req, res, next) {
  console.log(`${req.method}${req.url}${new Date().getTime()}`);
  next();
}

module.exports = server;
