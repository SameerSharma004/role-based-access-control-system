import express from "express";
import db from "../config/connectdb.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(req.user);
    const query = "SELECT * FROM  todo WHERE user_id = ?";
    const [rows] = await db.execute(query, [req.user.id]);
    res.status(200).json({ success: "success",output: rows, user: req.user});
  } catch (err) {
    res.status(500).json({success:"failed", message: err.message });
  }
});
router.post("/",async (req, res) => {
  try {
    const {task} = req.body;
    const query = "INSERT INTO todo(user_id,task) VALUES (?,?)";
    const [rows] = await db.execute(query, [req.user.id, task]);
    console.log("Task added successfully !");
    res.status(200).json({ success: "success",id: rows });
  } catch (err) {
    res.status(500).json({ success: "failed", message: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { task } = req.body;
    const query = "UPDATE todo SET task=? WHERE user_id = ? AND id = ?";
    const [rows] = await db.execute(query, [task, req.user.id,id]);

    console.log("Task updated successfully !");
    res.status(200).json({ success: "success", id: rows });
  } catch (err) {
    res.status(500).json({ success: "failed", message: err.message });
  }
});
router.delete("/:id",async (req, res) => {
  try {
    const id = req.params.id;
    const query = "DELETE FROM todo WHERE user_id=? AND id=?";
    const [rows] = await db.execute(query, [req.user.id,id]);
    console.log("Task deleted successfully !");
    res.status(200).json({ success: "success", id: rows });
  } catch (err) {
    res.status(500).json({ success: "failed", message: err.message });
  }
});
export default router;