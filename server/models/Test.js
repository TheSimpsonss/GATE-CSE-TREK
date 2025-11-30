const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  id: String,
  name: String,
  subjectId: String,
  type: String,
  marksObtained: Number,
  totalMarks: Number,
  date: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Test', testSchema);