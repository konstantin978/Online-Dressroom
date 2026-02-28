import express from "express";
import jwt from "jsonwebtoken";
import userService from "../services/user.services.js";

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ status: "Error", message: "Provide username" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: "Error", message: "Provide password" });
  }

  const response = await userService.login(username, password);

  if (!response.found) {
    return res.status(404).json({ status: "Error", message: "User not found" });
  }
  if (response.notMatch) {
    return res.status(401).json({ status: "Error", message: "Wrong Password" });
  }

  const token = jwt.sign(
    { username, role: response.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ status: "Success", message: "Login successful", token });
});

userRouter.post("/register", async (req, res) => {
  const { username, password, email, gender, profileImage } = req.body;

  if (!username || username.length < 3 || username.length > 30) {
    return res
      .status(400)
      .json({ status: "Error", message: "Username must be 3-30 characters" });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({
      status: "Error",
      message: "Password must be at least 6 characters",
    });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ status: "Error", message: "Provide a valid email" });
  }
  if (gender && !["male", "female"].includes(gender)) {
    return res
      .status(400)
      .json({ status: "Error", message: "Gender must be 'male' or 'female'" });
  }

  const response = await userService.register({
    username,
    email,
    password,
    email,
    gender,
    profileImage,
  });
  if (response.status === "Error") {
    return res.status(400).json({ status: "Error", message: response.message });
  }
  return res.status(200).json({ status: "Success", message: response.message });
});

userRouter.get("/getAll", (req, res) => {
  const allUsers = ["a", "b", "c"];
  res.send("hello");
});

export default userRouter;
