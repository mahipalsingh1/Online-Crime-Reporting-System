import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [editableUser, setEditableUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert("Please login to view your profile.");
      navigate('/login');
    } else {
      setEditableUser(currentUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableUser((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = allUsers.map(user =>
      user.username === editableUser.username ? editableUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(editableUser));
    alert('Profile updated successfully!');
    setEditMode(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  if (!editableUser) return null;

  return (
    <div className="profile-container rainbow-bg">
      <h2>Your Profile</h2>
      <div className="profile-card">
        {editableUser.image && (
          <img src={editableUser.image} alt="Profile" className="profile-image" />
        )}
        {editMode && (
          <>
            <label>Change Profile Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </>
        )}

        <div className="profile-field">
          <label>Full Name:</label>
          {editMode ? (
            <input name="name" value={editableUser.name} onChange={handleChange} />
          ) : (
            <span>{editableUser.name}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Date of Birth:</label>
          {editMode ? (
            <input name="dob" type="date" value={editableUser.dob} onChange={handleChange} />
          ) : (
            <span>{editableUser.dob}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Gender:</label>
          {editMode ? (
            <select name="gender" value={editableUser.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <span>{editableUser.gender}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Mobile:</label>
          {editMode ? (
            <input name="mobile" value={editableUser.mobile} onChange={handleChange} />
          ) : (
            <span>{editableUser.mobile}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Email:</label>
          {editMode ? (
            <input name="email" value={editableUser.email} onChange={handleChange} />
          ) : (
            <span>{editableUser.email}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Username:</label>
          <span>{editableUser.username}</span>
        </div>

        {/* Displaying Role */}
        <div className="profile-field">
          <label>Role:</label>
          <span>{editableUser.role}</span>
        </div>

        {editableUser.role === 'Police' && (
          <div className="profile-field">
            <label>Police ID:</label>
            <span>{editableUser.policeId}</span>
          </div>
        )}

        <div className="button-row">
          <button className="edit-profile-btn" onClick={toggleEdit}>
            {editMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          {editMode && (
            <button className="save-profile-btn" onClick={handleSave}>Save Changes</button>
          )}
          <button className="logout-profile-btn" onClick={handleLogoutClick}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
