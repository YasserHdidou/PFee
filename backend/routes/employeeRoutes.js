const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

// Create an employee
router.post('/add', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().populate('tasks shifts');
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('tasks shifts');
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
