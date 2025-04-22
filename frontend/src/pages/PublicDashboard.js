import React from 'react';

function PublicDashboard() {
  return (
    <div className="page">
      <h2>Register Complaint</h2>
      <form>
        <textarea placeholder="Enter complaint details" rows="5"></textarea><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PublicDashboard;
