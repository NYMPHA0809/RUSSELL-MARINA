const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// GET all reservations
router.get('/:catwayNumber/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.catwayNumber });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one reservation
router.get('/:catwayNumber/reservations/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new reservation
router.post('/:catwayNumber/reservations', async (req, res) => {
  const reservation = new Reservation({
    catwayNumber: req.params.catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update reservation
router.put('/:catwayNumber/reservations/:id', async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE reservation
router.delete('/:catwayNumber/reservations/:id', async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
