// UpdateStatus.js
import React, { useState } from 'react';

function UpdateStatus({ complaints, onUpdate }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({
    officer: '',
    status: '',
    statusDescription: ''
  });

  const handleSelect = (index) => {
    setSelectedIndex(index);
    const selectedComplaint = complaints[index];
    setForm({
      officer: selectedComplaint.officer || '',
      status: selectedComplaint.status || '',
      statusDescription: selectedComplaint.statusDescription || ''
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (selectedIndex !== null) {
      onUpdate(selectedIndex, form);
      alert("Status updated successfully");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Complaint Status</h2>
      {complaints.map((comp, idx) => (
        <div key={idx} style={{ marginBottom: '10px', cursor: 'pointer' }}>
          <button onClick={() => handleSelect(idx)}>
            {comp.type} - {comp.username}
          </button>
        </div>
      ))}

      {selectedIndex !== null && (
        <div style={{ marginTop: '20px' }}>
          <h3>Update Status for Complaint #{selectedIndex + 1}</h3>
          <input
            type="text"
            name="officer"
            placeholder="Assign Officer"
            value={form.officer}
            onChange={handleChange}
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Solved">Solved</option>
            <option value="Invalid">Invalid</option>
          </select>
          <textarea
            name="statusDescription"
            placeholder="Description"
            value={form.statusDescription}
            onChange={handleChange}
          />
          <button onClick={handleUpdate} style={{ display: 'block', marginTop: '10px' }}>Update</button>
        </div>
      )}
    </div>
  );
}

export default UpdateStatus;
