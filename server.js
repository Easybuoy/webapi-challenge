const express = require("express");

const projectRoutes = require("./project");

const server = express();

//custom middleware
server.use(express.json());
// server.use(logger)

server.get("/", (req, res) => {
  res.json({ message: "Welcome to API Service" });
});

server.use("/api/projects", projectRoutes);

// function logger(req, res, next) {
// console.log(req.method);
// console.log(req.url);
// console.log(new Date().getTime());
// next();
// };

module.exports = server;
