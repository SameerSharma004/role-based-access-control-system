import express from "express";
import pool from "../config/connectdb.js";
import isUserExist from "../middleware/userExist.middleware.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM auth";
    const [rows] = await pool.execute(query);
    res.json({ success: "success", rows, user: req.user });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while showing members",
      error: err,
    });
  }
});

router.post("/add-member", isUserExist, async (req, res) => {
  try {
    const { username, email, password, role, manager_id } = req.body;
    const query =
      "INSERT INTO auth(username,email, password,role,manager_id) VALUES (?,?,?,?,?)";
    const [rows] = await pool.execute(query, [
      username,
      email,
      password,
      role,
      manager_id,
    ]);
    res.json({
      success: "success",
      message: "Member created successfully",
      output: rows,
    });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while adding member",
      err,
    });
  }
});

router.put("/updated-member/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password, role } = req.body;
    const query =
      "UPDATE auth SET username=?, email=? ,password=? ,role=? WHERE id=?";
    await pool.execute(query, [username, email, password, role, id]);
    res.json({ success: "success", message: "Member updated successfully" });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while updating member",
      err,
    });
  }
});

router.delete("/delete-member/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM auth WHERE id=?";
    const query2 = "DELETE FROM todo WHERE user_id = ?";
    const query3 = "DELETE FROM manager_work WHERE user_id = ?"
    await pool.execute(query3, [id]);
    await pool.execute(query2, [id]);
    await pool.execute(query, [id]);
    res.json({
      success: "success",
      message: "Member Deleted successfully",
    });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while deleting member",
      error: err,
    });
  }
});
export default router;
