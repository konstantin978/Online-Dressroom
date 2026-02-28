import express from "express";
import jwtAuth from "../utils/jwt.js";
import clothesServices from "../services/clothes.services.js";

const clothesRouter = express.Router();

clothesRouter.get("/getAll", async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(404).json({ status: "Error", message: "User not found" });
  }

  const response = await clothesServices.getClothesByUsername({ username });
  if (response.status === "Error") {
    return res
      .status(404)
      .json({ status: response.status, message: response.message });
  }

  return res
    .status(200)
    .json({ status: response.status, data: response.data });
});

clothesRouter.post("/add", async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ status: "Error", message: "Request body is required" });
  }
  const { username, clothType, clothColor, clothSeason } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ status: "Error", message: "Username is required" });
  }
  if (!clothType) {
    return res
      .status(400)
      .json({ status: "Error", message: "Cloth type is required" });
  }
  if (!clothColor) {
    return res
      .status(400)
      .json({ status: "Error", message: "Color is required" });
  }
  if (
    !clothSeason ||
    !["winter", "spring", "summer", "autumn"].includes(clothSeason)
  ) {
    return res.status(400).json({
      status: "Error",
      message: "Season must be 'winter', 'spring', 'summer', or 'autumn'",
    });
  }

  const response = await clothesServices.addClothByUsername({
    username,
    clothType,
    clothColor,
    clothSeason,
  });

  if (response.status === "Error") {
    return res
      .status(404)
      .json({ status: response.status, message: response.message });
  }
  return res
    .status(200)
    .json({ status: response.status, message: response.message });
});

export default clothesRouter;
