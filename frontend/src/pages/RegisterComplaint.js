import React, { useState } from 'react';
import './RegisterComplaint.css';

const crimeIpcMapping = {
  "Theft": "IPC Section 378",
  "Murder": "IPC Section 302",
  "Fraud": "IPC Section 420",
  "Assault": "IPC Section 351",
  "Cyber Crime": "IT Act Section 66"
};

function RegisterComplaint() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    crimeType: '',
    ipcSection: '',
    detail: '',
    evidence: '',
    date: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (name === 'crimeType') {
      updatedForm.ipcSection = crimeIpcMapping[value] || '';
    }
    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call to save complaint
    alert('Complaint registered successfully');
  };

  return (
    <div className="register-container">
      <h2>Register Complaint</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Location:</label>
        <input name="location" value={form.location} onChange={handleChange} required />

        <label>Type of Crime:</label>
        <select name="crimeType" value={form.crimeType} onChange={handleChange} required>
          <option value="">Select Crime</option>
          {Object.keys(crimeIpcMapping).map((crime) => (
            <option key={crime} value={crime}>{crime}</option>
          ))}
        </select>

        <label>IPC Section:</label>
        <input name="ipcSection" value={form.ipcSection} readOnly />

        <label>Crime Details:</label>
        <textarea name="detail" value={form.detail} onChange={handleChange} required />

        <label>Evidence (URL or Text):</label>
        <input name="evidence" value={form.evidence} onChange={handleChange} />

        <label>Date of Crime:</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <label>Mobile Number:</label>
        <input name="mobile" value={form.mobile} onChange={handleChange} required />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default RegisterComplaint;