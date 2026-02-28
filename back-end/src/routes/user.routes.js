const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const userService = require("../services/user.services");

userRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(400).json({ status: "Error", message: "Provide username" });
  }
  if (!password) {
    res.status(400).json({ status: "Error", message: "Provide password" });
  }

  const response = userService.login(username, password);

  if (!response.found) {
    res.status(404).json({ status: "Error", message: "User not found" });
  }
  if (response.notMatch) {
    res.status(401).json({ status: "Error", message: "Wrong Password" });
  }

  const payload = {
    username,
    password,
    role: response.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({
    message: "Login successful",
    token: token,
  });
});

userRouter.get("/getAll", (req, res) => {
  const allUsers = ["a", "b", "c"];
  res.send("hello");
});

module.exports = userRouter;
