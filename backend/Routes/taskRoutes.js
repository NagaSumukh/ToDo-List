const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/tasks", authMiddleware, getTasks);
router.post("/tasks", authMiddleware, addTask);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;
