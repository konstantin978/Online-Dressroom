import pool from "../db/db.js";

class ClothesService {
  getClothesByUsername = async ({ username }) => {
    const user = await pool.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);

    if (user.rowCount === 0) {
      return { status: "Error", message: "Wrong Username" };
    }

    const userId = user.rows[0].id;
    const response = await pool.query(
      "SELECT cloth_type, color, gender, season FROM Clothes WHERE cloth_owner_id = $1",
      [userId],
    );

    return { status: "Success", data: response.rows ?? [] };
  };

  addClothByUsername = async ({
    username,
    clothType,
    clothColor,
    clothSeason,
  }) => {
    const user = await pool.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);

    if (user.rowCount === 0) {
      return { status: "Error", message: "Wrong Username" };
    }

    const userData = user.rows[0];

    await pool.query(
      `
      INSERT INTO
      Clothes(cloth_owner_id, cloth_type, color, gender, season)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING cloth_id;
      `,
      [userData.id, clothType, clothColor, userData.gender, clothSeason],
    );

    return { status: "Success", message: "Cloth added" };
  };
}

export default new ClothesService();
