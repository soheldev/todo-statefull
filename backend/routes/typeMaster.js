const express = require('express');
const router = express.Router();
const TypeMaster = require('../models/TypeMaster');
const auth = require('../middlewares/auth');

// Get all types
router.get('/get', auth, async (req, res) => {
  try {
    const types = await TypeMaster.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(types);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add new type
router.post('/add', auth, async (req, res) => {
  const { type } = req.body;

  try {
    let existingType = await TypeMaster.findOne({ type });
    if (existingType) {
      return res.status(400).json({ msg: 'Type already exists' });
    }

    const newType = new TypeMaster({
      user: req.user.id,
      type
    });

    const savedType = await newType.save();
    res.json(savedType);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/update/:id', auth, async (req, res) => {
  try {
    const { type } = req.body;
    let updatedType = await TypeMaster.findByIdAndUpdate(
      req.params.id,
      { type },
      { new: true }
    );

    if (!updatedType) {
      return res.status(404).json({ msg: 'Type not found' });
    }

    res.json(updatedType);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete type
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    let type = await TypeMaster.findById(req.params.id);

    if (!type) return res.status(404).json({ msg: 'Type not found' });

    if (type.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await TypeMaster.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Type removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;