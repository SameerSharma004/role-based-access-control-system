import express from "express";
import pool from "../config/connectdb.js";
import isUserExist from "../middleware/userExist.middleware.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post("/login", async (req, res) => {
  try {
    const { email, password} = req.body;
    console.log(req.body);
    const query = "SELECT * FROM auth WHERE email=?";
    const [rows] = await pool.execute(query, [email]);
    if (rows.length > 0) {
      if (String(rows[0].password) === String(password)) {
        const token = jwt.sign(
          {
            id: rows[0].id,
            username: rows[0].username,
            email: rows[0].email,
            role: rows[0].role,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" },
        );
        res.json({
          success: "success",
          message: "Login Successful",
          token: token,
          userId: rows[0].id,
          role: rows[0].role
        });
      } else {
        res.json({ success: "failed", message: "Invalid Password" });
      }
    } else {
      res.json({ success: "failed", message: "User Not Found !" });
    }
  } catch (err) {
    res.json({ success: "failed", message: err });
  }
});
router.post("/signup", isUserExist, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const query = "INSERT INTO auth(username, email, password) VALUES (?,?,?)";
    await pool.execute(query, [username, email, password]);
    res.json({ success: "success", message: "User created successfully" });
  } catch (err) {
    res.json({ success: "failed", message: err });
  }
});
export default router;
