const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
