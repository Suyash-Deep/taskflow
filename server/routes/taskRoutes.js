const express = require("express");
const Task = require("../models/Task");
const { auth } = require("../middleware/auth");

const router = express.Router();

// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, projectId, assigneeId, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status: status || "todo",
      project: projectId,
      assignee: assigneeId || req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Task Create Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET TASKS BY PROJECT
router.get("/:projectId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("assignee", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE TASK (e.g. status, title, description)
router.patch("/:taskId", auth, async (req, res) => {
  try {
    const updates = req.body; // { status: "done" } etc.

    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { $set: updates },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error("Update Task Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
