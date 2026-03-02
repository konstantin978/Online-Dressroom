import express from "express";
import jwtAuth from "../utils/jwt.js";
import aiServices from "../services/ai.services.js";

const aiRouter = express.Router();

aiRouter.get("/dailyInfo", async (req, res) => {
  const { username, location } = req.query;

  if (!location) {
    return res
      .status(400)
      .json({ status: "Error", message: "Location is required" });
  }

  try {
    const response = await aiServices.getDailyInfo({ username, location });

    if (response.status === "Error") {
      return res.status(500).json(response);
    }

    res.json({ status: "Success", data: response });
  } catch (err) {
    console.error("AI route error:", err);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

export default aiRouter;
