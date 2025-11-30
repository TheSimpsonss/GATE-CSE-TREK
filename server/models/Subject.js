const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  id: String,
  name: String,
  isCompleted: { type: Boolean, default: false },
  revision1: { type: Boolean, default: false },
  revision2: { type: Boolean, default: false },
  pyqSolved: { type: Boolean, default: false },
});

const subjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: String,
  chapters: [chapterSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Compound index to ensure unique subject id per user
subjectSchema.index({ userId: 1, id: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);