const express = require('express');
const router = express.Router();
const Text = require('../models/Text');

// Get all texts
router.get('/', async (req, res) => {
  try {
    const texts = await Text.find().sort({ createdAt: -1 });
    res.json(texts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save new text
router.post('/', async (req, res) => {
  console.log('Raw headers:', req.headers); // Log headers
  console.log('Request body:', req.body); // Debug log
  const content = req.body && req.body.content; // Safe access to avoid undefined error
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }
  const text = new Text({ content });
  try {
    const savedText = await text.save();
    res.status(201).json(savedText);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Edit text
router.put('/:id', async (req, res) => {
  console.log('Raw headers:', req.headers); // Log headers
  console.log('Request body:', req.body); // Debug log
  const content = req.body && req.body.content;
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }
  try {
    const updatedText = await Text.findByIdAndUpdate(req.params.id, { content }, { new: true, runValidators: true });
    if (!updatedText) return res.status(404).json({ message: 'Text not found' });
    res.json(updatedText);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete text
router.delete('/:id', async (req, res) => {
  try {
    const deletedText = await Text.findByIdAndDelete(req.params.id);
    if (!deletedText) return res.status(404).json({ message: 'Text not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;