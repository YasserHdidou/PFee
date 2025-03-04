const express = require('express');
const Task = require('../models/task');
const router = express.Router();

// Create a new task
router.post('/add', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo');
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
