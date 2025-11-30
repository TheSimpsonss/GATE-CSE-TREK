const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const tests = await Test.find({ userId: req.user._id });
    res.json(tests);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const newTest = new Test({
      ...req.body,
      userId: req.user._id,
    });
    const saved = await newTest.save();
    res.json(saved);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Test.findOneAndDelete({ id: req.params.id, userId: req.user._id });
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;