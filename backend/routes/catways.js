const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

// GET all catways
router.get('/', async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});

// GET catway by id
router.get('/:id', async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  res.json(catway);
});

// POST new catway
router.post('/', async (req, res) => {
  const catway = new Catway(req.body);
  await catway.save();
  res.json(catway);
});

// PUT update catway state
router.put('/:id', async (req, res) => {
  const catway = await Catway.findOneAndUpdate(
    { catwayNumber: req.params.id },
    { catwayState: req.body.catwayState },
    { new: true }
  );
  res.json(catway);
});

// DELETE catway
router.delete('/:id', async (req, res) => {
  await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;
