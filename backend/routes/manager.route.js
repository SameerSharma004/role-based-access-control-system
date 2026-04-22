import express from "express";
import verifyToken from "../middleware/verifyToken.middleware.js";
import pool from "../config/connectdb.js";
const router = express.Router();
router.get("/employee-manager-task", async (req, res) => {
  try {
    const user_id = req.user.id;
    console.log(user_id);
    const query = "SELECT * FROM manager_work WHERE user_id = ?";
    const [rows] = await pool.execute(query, [user_id]);
    console.log(rows);
    res.json({ success: "success", tasks: rows });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error fetching manager tasks",
      error: err,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM auth WHERE manager_id =? ";
    const [rows] = await pool.execute(query, [id]);
    res.json({ success: "success", rows, user: req.user });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while showing task",
      error: err,
    });
  }
});


router.post("/employee-task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id } = req.body;
    const query =
      "SELECT * FROM manager_work WHERE manager_id =? AND user_id=?";
    const [rows] = await pool.execute(query, [id, user_id]);
    res.json({ success: "success", rows: rows });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while showing task",
      error: err,
    });
  }
});

router.post("/employee-todo/:id", async (req, res) => {
  try {
    const manager_id = req.params.id;
    const { user_id, task } = req.body;
    const query =
      "INSERT INTO manager_work(manager_id, user_id, task) VALUES (?,?,?)";
    await pool.execute(query, [manager_id, user_id, task]);
    res.json({ success: "success", message: "employee Work created" });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while adding employee task",
      error: err,
    });
  }
});

router.put("/employee-todo-update/:id", async (req, res) => {
  try {
    const manager_id = req.params.id;
    const { id, user_id, task } = req.body;
    console.log(req.body, manager_id);
    const query =
      "UPDATE manager_work SET task = ? WHERE id=? AND manager_id = ? AND user_id = ?";
    await pool.execute(query, [task, id, manager_id, user_id]);
    res.json({ success: "success", message: "employee Work Updated" });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while updating employee task",
      error: err,
    });
  }
});
router.put("/employee-todo-delete/:id", async (req, res) => {
  try {
    const manager_id = req.params.id;
    const { id } = req.body;
    const query = "DELETE FROM manager_work WHERE manager_id =? AND id = ?";
    await pool.execute(query, [manager_id, id]);
    res.json({ success: "success", message: "employee Work Deleted" });
  } catch (err) {
    res.json({
      success: "failed",
      message: "error while Deleting employee task",
      error: err,
    });
  }
});
export default router;
