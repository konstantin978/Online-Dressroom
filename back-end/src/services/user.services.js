import bcrypt from "bcrypt";
import pool from "../db/db.js";

const SALT_ROUNDS = 10;

class UserService {
  login = async (username, password) => {
    const { rows } = await pool.query(
      "SELECT username, password FROM Users WHERE username = $1;",
      [username],
    );

    if (rows.length === 0) {
      return { found: false };
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { found: true, notMatch: true };
    }

    return { found: true, notMatch: false, role: "user" };
  };

  register = async ({ username, password, email, gender, profileImage }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const profileImageToUse = profileImage || "DEFAULT_IMAGE";
    const genderToUse = gender || "hidden";

    const checkUserByUsername = await pool.query(
      "SELECT * FROM Users WHERE username = $1",
      [username],
    );

    if (checkUserByUsername.rowCount > 0) {
      return {
        status: "Error",
        message: "User with this username already exists",
      };
    }

    const checkUserByEmail = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email],
    );

    if (checkUserByEmail.rowCount > 0) {
      return {
        status: "Error",
        message: "User with this email already exists",
      };
    }

    const result = await pool.query(
      "INSERT INTO Users (username, email, password, profile_image, gender) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
      [username, email, hashedPassword, profileImageToUse, genderToUse],
    );

    return { status: "Success", message: "User registered successfully", id: result.rows[0].id };
  };
}

export default new UserService();
