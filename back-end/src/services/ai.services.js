import pool from "../db/db.js";
import aiModel from "../utils/aiAgent.js";

class AiService {
  getDailyInfo = async ({ username, location }) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const user = await pool.query(
      "SELECT id, username, gender FROM Users WHERE username = $1;",
      [username],
    );

    let userInfo = null;
    let userClothes = null;
    if (user.rowCount !== 0) {
      userInfo = user.rows[0];

      userClothes = await pool.query(
        "SELECT cloth_type, color, gender, season FROM Clothes WHERE cloth_owner_id = $1;",
        [userInfo.id],
      );
    }
    try {
      const response = await aiModel.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a personal fashion assistant for an Online Dressroom app.
      
      Today's date: ${currentDate}.
      User's location: ${location}.
      
      User profile:
      - Gender: ${userInfo ? userInfo.gender : "Not set"}
      
      User's wardrobe:
      ${userInfo ? JSON.stringify(userClothes.rows) : "Empty"}
      
      Based on today's likely weather in ${location} and the season, suggest:
      1. A complete outfit from the wardrobe above (top + bottom + shoes + optional outerwear)
      2. A brief weather summary (temperature range, conditions)
      3. Why this outfit works for today
      
      Respond ONLY in JSON format, no markdown:
      {
        "weather": { "temperature": "...", "conditions": "..." },
        "outfit": { "top": "...", "bottom": "...", "shoes": "...", "outerwear": "..." },
        "reasoning": "..."
      }`,
      });

      const text = response.text;
      const parsedData = JSON.parse(text);
      return { status: "Success", data: parsedData };
    } catch (error) {
      console.error("AI error:", error);
      return { status: "Error", message: "Failed to get AI recommendation" };
    }
  };
}

export default new AiService();
