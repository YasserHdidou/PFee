const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true },
  assignedDate: { type: Date, required: true },
  completionDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
