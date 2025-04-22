import React, { useState } from 'react';

function ComplaintForm({ loggedInUser }) {
  const [form, setForm] = useState({
    crimeType: '',
    name: loggedInUser.name,
    location: '',
    date: '',
    mobile: loggedInUser.mobile,
    ipcSection: '',
    details: '',
    evidence: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComplaint = {
      id: new Date().toISOString(),
      ...form,
      status: 'Pending',
      statusDescription: '',
      username: loggedInUser.username
    };

    const existingComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    existingComplaints.push(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(existingComplaints));

    alert('Complaint registered successfully!');
  };

  return (
    <div>
      <h2>Register Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input name="crimeType" type="text" placeholder="Crime Type" onChange={handleChange} required />
        <input name="location" type="text" placeholder="Location" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input name="ipcSection" type="text" placeholder="IPC Section" onChange={handleChange} required />
        <textarea name="details" placeholder="Complaint Details" onChange={handleChange} required></textarea>
        <input name="evidence" type="text" placeholder="Evidence (if any)" onChange={handleChange} />
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default ComplaintForm;
