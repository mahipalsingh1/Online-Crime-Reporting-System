import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const crimeIpcMapping = {
  "Chain Snatching": "IPC Section 356",
  "Pickpocketing": "IPC Section 379",
  "Mobile Theft": "IPC Section 379",
  "Vehicle Theft": "IPC Section 379",
  "House Burglary": "IPC Section 457 and 380",
  "ATM Fraud": "IPC Section 420 and IT Act Section 66",
  "Online Scam": "IPC Section 420 and IT Act Section 66D",
  "Cyber Bullying": "IT Act Section 66A",
  "Fake Job Scam": "IPC Section 420",
  "Domestic Violence": "Protection of Women from Domestic Violence Act, 2005",
  "Sexual Harassment": "IPC Section 354A",
  "Kidnapping": "IPC Section 363",
  "Dowry Harassment": "IPC Section 498A",
  "Murder": "IPC Section 302",
  "Attempt to Murder": "IPC Section 307",
  "Assault": "IPC Section 351",
  "Robbery": "IPC Section 392",
  "Drug Trafficking": "NDPS Act, 1985 Section 21",
  "Child Abuse": "POCSO Act, 2012 Section 7 and 9",
  "Human Trafficking": "IPC Section 370",
  "Acid Attack": "IPC Section 326A",
  "Public Nuisance": "IPC Section 268",
  "Cyber Hacking": "IT Act Section 66",
  "Identity Theft": "IT Act Section 66C",
  "Credit Card Fraud": "IT Act Section 66C and 66D"
};


function Dashboard({ user, onRegister }) {
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedForm = { ...form, [name]: name === 'evidence' ? files[0]?.name || '' : value };
    if (name === 'crimeType') {
      updatedForm.ipcSection = crimeIpcMapping[value] || '';
    }
    setForm(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    // Mobile number validation (example: 10-digit number)
    const mobileRegex = /^[0-9]{10}$/;
    if (!form.mobile) {
      setError('Mobile number is required.');
      return;
    }
    if (!mobileRegex.test(form.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Validation for other fields
    if (!form.name || !form.location || !form.detail) {
      setError('Please fill in all required fields.');
      return;
    }

    // Generate a unique complaint_id based on timestamp or any other method
    const complaint_id = `C-${Date.now()}`;

    // Add complaint_id to the complaint
    const newComplaint = { ...form, username: user.username, complaint_id };

    const existingComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const updatedComplaints = [...existingComplaints, newComplaint];

    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    if (onRegister) onRegister(newComplaint);

    alert("Complaint registered successfully!");
    navigate('/viewcomplaints');
  };

  return (
    <div className="page">
      <style>
        {`
          .page {
            font-family: Arial, sans-serif;
            min-height: 100vh;
            padding: 40px 20px;
            background: linear-gradient(270deg, #ff9a9e, #fad0c4, #fbc2eb, #a1c4fd, #c2e9fb, #84fab0, #8fd3f4);
            background-size: 1400% 1400%;
            animation: rainbowFlow 18s ease infinite;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @keyframes rainbowFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          h2 {
            color: #003366;
            margin-bottom: 20px;
            text-shadow: 1px 1px 2px #fff;
            font-size: 2rem;
          }

          form {
            background: rgba(255, 255, 255, 0.9);
            padding: 25px 30px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 100%;
          }

          input, select, textarea {
            width: 100%;
            padding: 10px;
            margin: 8px 0 15px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
          }

          button {
            width: 100%;
            background-color: #003366;
            color: white;
            padding: 12px;
            font-size: 1.1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #00509e;
          }

          .error-message {
            color: red;
            font-size: 0.9rem;
            margin-top: 10px;
          }
        `}
      </style>

      <h2>Register a Complaint</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Complainant's Name" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Crime Location" onChange={handleChange} required />
        <select name="crimeType" onChange={handleChange} required>
          <option value="">Select Crime Type</option>
          {Object.keys(crimeIpcMapping).map((crime) => (
            <option key={crime} value={crime}>{crime}</option>
          ))}
        </select>
        <input type="text" name="ipcSection" value={form.ipcSection} placeholder="IPC Section" readOnly />
        <textarea name="detail" placeholder="Crime Details" onChange={handleChange} required />
        <input type="file" name="evidence" onChange={handleChange} />
        <input
  type="date"
  name="date"
  onChange={handleChange}
  required
  max={new Date().toISOString().split("T")[0]}
/>

        <input type="tel" name="mobile" placeholder="Your Mobile Number" onChange={handleChange} required />
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
}

export default Dashboard;
