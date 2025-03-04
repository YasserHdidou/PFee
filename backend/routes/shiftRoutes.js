const express = require('express');
const Shift = require('../models/shift');
const router = express.Router();

// Create a new shift
router.post('/add', async (req, res) => {
  try {
    const shift = new Shift(req.body);
    await shift.save();
    res.status(201).json(shift);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all shifts
router.get('/', async (req, res) => {
  try {
    const shifts = await Shift.find().populate('employee');
    res.status(200).json(shifts);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a single shift by ID
router.get('/:id', async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id).populate('employee');
    if (!shift) {
      return res.status(404).send('Shift not found');
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
