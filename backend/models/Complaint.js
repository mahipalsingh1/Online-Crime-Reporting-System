const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  crimeType: { type: String, required: true },
  ipcSection: { type: String, required: true },
  detail: { type: String, required: true },
  evidence: { type: String, required: false },
  date: { type: Date, required: true },
  mobile: { type: String, required: true }
});

module.exports = mongoose.model('Complaint', complaintSchema);
