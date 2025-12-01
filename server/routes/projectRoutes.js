const express = require("express");
const Project = require("../models/Project");
const { auth } = require("../middleware/auth");
const router = express.Router();

// CREATE PROJECT
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      owner: req.user.id,
      members: [req.user.id],   // add creator as member
    });

    res.status(201).json(project);
  } catch (err) {
    console.log("Project Create Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL PROJECTS FOR USER
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;