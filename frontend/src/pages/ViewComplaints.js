import React, { useState, useEffect } from 'react';

function ViewComplaints({ currentUser }) {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState('');

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

  const isPublicUser = currentUser?.role === 'Public';
  const isPoliceUser = currentUser?.role === 'Police';

  const filteredComplaints = complaints.filter((complaint) => {
    if (isPublicUser) return complaint.username === currentUser.username;
    return true;
  });

  const handleStatusClick = (complaint) => {
    setSelectedComplaint({ ...complaint });
    setUpdatedDescription(complaint.description || '');
  };

  const handleStatusUpdate = () => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === selectedComplaint.id
        ? {
            ...complaint,
            status: selectedComplaint.status,
            officer: selectedComplaint.officer,
            description: updatedDescription,
            isStatusUpdated: true,
          }
        : complaint
    );

    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setSelectedComplaint(null);
    setUpdatedDescription('');
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

        @keyframes rainbowButton {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        p.no-data {
          text-align: center;
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
        }
      `}</style>

      <h2>{isPublicUser ? 'My Complaints' : 'All Complaints'}</h2>

      {filteredComplaints.length === 0 ? (
        <p className="no-data">No complaints found.</p>
      ) : (
        filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <p><strong>Name:</strong> {complaint.name}</p>
            <p><strong>Email:</strong> {complaint.email}</p>
            <p><strong>Crime Type:</strong> {complaint.crimeType}</p>
            <p><strong>IPC Section:</strong> {complaint.ipcSection}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Status:</strong> {complaint.status || 'Pending'}</p>
            {complaint.officer && <p><strong>Assigned Officer:</strong> {complaint.officer}</p>}

            {isPublicUser && (
              <button onClick={() => handleStatusClick(complaint)}>
                Track Status
              </button>
            )}

            {isPoliceUser && !complaint.isStatusUpdated && (
              <button onClick={() => handleStatusClick(complaint)}>
                Update Status
              </button>
            )}
          </div>
        ))
      )}

      {selectedComplaint && isPoliceUser && (
        <div className="status-box">
          <h3>Update Complaint Status</h3>

          <label>Status:</label>
          <select
            value={selectedComplaint.status || 'Pending'}
            onChange={(e) =>
              setSelectedComplaint({ ...selectedComplaint, status: e.target.value })
            }
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
            value={selectedComplaint.officer || ''}
            onChange={(e) =>
              setSelectedComplaint({ ...selectedComplaint, officer: e.target.value })
            }
          />

          <label>Description:</label>
          <textarea
            placeholder="Update description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />

          <button onClick={handleStatusUpdate}>Save Updates</button>
        </div>
      )}

      {selectedComplaint && isPublicUser && (
        <div className="status-box">
          <h3>Complaint Status</h3>
          <p><strong>Status:</strong> {selectedComplaint.status || 'Pending'}</p>
          <p><strong>Assigned Officer:</strong> {selectedComplaint.officer || 'Not Assigned'}</p>
        </div>
      )}
    </div>
  );
}

export default ViewComplaints;
