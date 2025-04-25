import React, { useState, useEffect } from 'react';

function ViewComplaints({ currentUser }) {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [statusInputs, setStatusInputs] = useState({});
  const [complaintIdToUpdate, setComplaintIdToUpdate] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (storedUser) window.location.reload();
    }
  }, [currentUser]);

  const isPoliceUser = currentUser?.role === 'Police';
  const isPublicUser = currentUser?.role === 'Public';

  const filteredComplaints = complaints.filter((complaint) => {
    if (isPublicUser) return complaint.username === currentUser.username;
    return true;
  });

  const handleInputChange = (id, field, value) => {
    setStatusInputs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleStatusUpdate = (complaintId) => {
    const timestamp = new Date().toLocaleString();
    const inputs = statusInputs[complaintId];
    if (!inputs) return;

    const updatedComplaints = complaints.map((complaint) => {
      if (complaint.complaint_id === complaintId) {
        const historyEntry = {
          status: inputs.status || complaint.status,
          officer: inputs.officer || complaint.officer,
          description: inputs.description || complaint.description,
          timestamp,
        };

        return {
          ...complaint,
          status: historyEntry.status,
          officer: historyEntry.officer,
          description: historyEntry.description,
          history: [...(complaint.history || []), historyEntry],
          newUpdateForUser: true,
        };
      }
      return complaint;
    });

    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setSelectedComplaintId(null);
    setComplaintIdToUpdate('');
    setUpdateError('');
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Solved':
        return 'status-badge green';
      case 'Under Investigation':
        return 'status-badge yellow';
      case 'Invalid':
        return 'status-badge red';
      default:
        return 'status-badge gray';
    }
  };

  const handleUpdateStatusClick = () => {
    const complaintIdStripped = complaintIdToUpdate.replace(/^C-/, '');
    const complaintId = parseInt(complaintIdStripped, 10);

    if (!complaintId || isNaN(complaintId)) {
      setUpdateError('Please provide a valid Complaint ID.');
      return;
    }

    const complaintExists = complaints.some((complaint) => complaint.complaint_id === `C-${complaintId}`);
    if (!complaintExists) {
      setUpdateError('Complaint ID not found.');
      return;
    }

    setSelectedComplaintId(`C-${complaintId}`);
    setUpdateError('');
  };

  return (
    <div className="rainbow-bg">
      <style>{`
        .rainbow-bg {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(-45deg, red, orange, yellow, green, blue, indigo, violet);
          background-size: 400% 400%;
          animation: rainbowShift 10s ease infinite;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes rainbowShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        h2 {
          color: #ffffff;
          font-size: 2rem;
          margin-bottom: 30px;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
        }

        .complaint-card, .status-box {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 20px;
          margin: 15px 0;
          width: 90%;
          max-width: 700px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .complaint-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
        }

        .complaint-card p,
        .status-box p {
          margin: 6px 0;
          color: #000;
        }

        label {
          font-weight: bold;
          display: block;
          margin: 12px 0 5px;
        }

        select, input, textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        button {
          padding: 10px 20px;
          margin-top: 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
          background-size: 300% 300%;
          animation: rainbowButton 5s linear infinite;
          color: white;
          transition: transform 0.2s ease;
        }

        button:hover {
          transform: scale(1.05);
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: bold;
          color: white;
        }

        .green { background-color: #38a169; }
        .yellow { background-color: #d69e2e; }
        .red { background-color: #e53e3e; }
        .gray { background-color: #718096; }

        p.no-data {
          text-align: center;
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .error-message {
          color: red;
          font-weight: bold;
        }
      `}</style>

      <h2>{isPublicUser ? 'My Complaints' : 'All Complaints'}</h2>

      {isPoliceUser && (
        <div className="status-box">
          <h3>Update Complaint Status</h3>
          <label>Enter Complaint ID:</label>
          <input
            type="text"
            placeholder="Complaint ID"
            value={complaintIdToUpdate}
            onChange={(e) => setComplaintIdToUpdate(e.target.value)}
          />
          <button onClick={handleUpdateStatusClick}>Search Complaint</button>
          {updateError && <p className="error-message">{updateError}</p>}
        </div>
      )}

      {filteredComplaints.length === 0 ? (
        <p className="no-data">No complaints found.</p>
      ) : (
        filteredComplaints.map((complaint) => (
          <div key={complaint.complaint_id} className="complaint-card">
            <p><strong>Complaint ID:</strong> {complaint.complaint_id}</p>
            <p><strong>Name:</strong> {complaint.name}</p>
            <p><strong>Email:</strong> {complaint.email}</p>
            <p><strong>Crime Type:</strong> {complaint.crimeType}</p>
            <p><strong>IPC Section:</strong> {complaint.ipcSection}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Status:</strong> <span className={getStatusClass(complaint.status || 'Pending')}>{complaint.status || 'Pending'}</span></p>
            {complaint.officer && <p><strong>Assigned Officer:</strong> {complaint.officer}</p>}

            {selectedComplaintId === complaint.complaint_id && isPoliceUser && (
              <div className="status-box">
                <h3>Update Complaint Status</h3>

                <label>Status:</label>
                <select
                  value={statusInputs[complaint.complaint_id]?.status || complaint.status || 'Pending'}
                  onChange={(e) => handleInputChange(complaint.complaint_id, 'status', e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Solved">Solved</option>
                  <option value="Invalid">Invalid</option>
                </select>

                <label>Assign Officer:</label>
                <input
                  type="text"
                  placeholder="Officer Name"
                  value={statusInputs[complaint.complaint_id]?.officer || complaint.officer || ''}
                  onChange={(e) => handleInputChange(complaint.complaint_id, 'officer', e.target.value)}
                />

                <label>Description:</label>
                <textarea
                  placeholder="Update description"
                  value={statusInputs[complaint.complaint_id]?.description || complaint.description || ''}
                  onChange={(e) => handleInputChange(complaint.complaint_id, 'description', e.target.value)}
                />

                <button onClick={() => handleStatusUpdate(complaint.complaint_id)}>Save Updates</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ViewComplaints;