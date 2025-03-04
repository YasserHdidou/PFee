const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  entryTime: { type: Date, required: true },
  exitTime: { type: Date, required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
});

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;
