import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ViewComplaints from './pages/ViewComplaints';
import UpdateStatus from './pages/UpdateStatus';
import IPCSection from './components/ipcSection';
import Child from './components/Child'; // Ensure correct path here
import WomenSafety from './components/WomenSafety';
import CyberSecurity from './components/CyberSecurity';

axios.post("http://localhost:5000/api/complaints", data);



function App() {
  const [complaints, setComplaints] = useState(() => JSON.parse(localStorage.getItem('complaints')) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('complaints', JSON.stringify(complaints));
  }, [currentUser, complaints]);

  const handleRegisterComplaint = (newComplaint) => {
    const updatedComplaints = [...complaints, newComplaint];
    setComplaints(updatedComplaints);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateComplaintStatus = (index, updatedFields) => {
    const updatedComplaints = [...complaints];
    updatedComplaints[index] = { ...updatedComplaints[index], ...updatedFields };
    setComplaints(updatedComplaints);
  };

  const ProtectedRoute = ({ element }) => {
    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
    return currentUser ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={!!currentUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={<Profile user={currentUser} onLogout={handleLogout} />}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<Dashboard user={currentUser} onRegister={handleRegisterComplaint} />}
            />
          }
        />
        <Route
          path="/viewcomplaints"
          element={
            <ProtectedRoute
              element={
                <ViewComplaints
                  complaints={complaints}
                  currentUser={currentUser}
                  onUpdateComplaint={updateComplaintStatus}
                />
              }
            />
          }
        />
        <Route
          path="/updatestatus"
          element={
            <ProtectedRoute
              element={<UpdateStatus complaints={complaints} onUpdate={updateComplaintStatus} />}
            />
          }
        />
        <Route path="/ipc-section" element={<IPCSection />} />
        <Route path="/child-safety" element={<Child />} />
        <Route path="/women-safety" element={<WomenSafety />} />
        <Route path="/cyber-security" element={<CyberSecurity />} />
    

      </Routes>
    </Router>
  );
}

export default App;
