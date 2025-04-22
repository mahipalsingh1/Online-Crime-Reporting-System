const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// API to register a complaint
router.post('/register', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).send('Complaint Registered Successfully');
  } catch (err) {
    res.status(400).send('Error registering complaint');
  }
});

// API to get all complaints
router.get('/view', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).send('Error fetching complaints');
  }
});

module.exports = router;
