const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Register a complaint
router.post('/', async (req, res) => {
  const { userId, complaintText } = req.body;
  
  try {
    const complaint = await Complaint.create({ userId, complaintText });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Error registering complaint', error });
  }
});

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId');
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});

module.exports = router;
