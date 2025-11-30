const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { auth } = require('../middleware/auth');

// Import initial syllabus from seed file
const INITIAL_SYLLABUS = require('../seed').INITIAL_SYLLABUS || [];

// Get Syllabus (user-specific)
router.get('/', auth, async (req, res) => {
  try {
    const data = await Subject.find({ userId: req.user._id });
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update Chapter Status
router.patch('/:subjectId/chapters/:chapterId', auth, async (req, res) => {
  const { subjectId, chapterId } = req.params;
  const { field, value } = req.body;
  try {
    await Subject.updateOne(
      { id: subjectId, "chapters.id": chapterId, userId: req.user._id },
      { $set: { [`chapters.$.${field}`]: value } }
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Seed Initial Data (user-specific)
router.post('/seed', auth, async (req, res) => {
  try {
    // Check if user already has subjects
    const existingSubjects = await Subject.find({ userId: req.user._id });
    if (existingSubjects.length > 0) {
      return res.json({ message: "Syllabus already exists for this user" });
    }

    // Add userId to each subject before inserting
    const subjectsWithUserId = req.body.map(subject => ({
      ...subject,
      userId: req.user._id,
    }));
    
    await Subject.insertMany(subjectsWithUserId);
    res.json({ message: "Seeded successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Initialize syllabus for new user (auto-seed if empty)
router.post('/initialize', auth, async (req, res) => {
  try {
    const existingSubjects = await Subject.find({ userId: req.user._id });
    if (existingSubjects.length > 0) {
      return res.json({ message: "Syllabus already initialized", subjects: existingSubjects });
    }

    // Use the initial syllabus from the request body or fallback to default
    const initialSyllabus = req.body && req.body.length > 0 
      ? req.body 
      : INITIAL_SYLLABUS;

    const subjectsWithUserId = initialSyllabus.map(subject => ({
      ...subject,
      userId: req.user._id,
    }));
    
    await Subject.insertMany(subjectsWithUserId);
    const savedSubjects = await Subject.find({ userId: req.user._id });
    res.json({ message: "Syllabus initialized", subjects: savedSubjects });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;