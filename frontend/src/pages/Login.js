import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin = () => {} }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Public');
  const [policeId, setPoliceId] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (!user) {
      alert('Invalid username or password');
      return;
    }

    if (role === 'Police' && user.policeId !== policeId) {
      alert('Invalid Police ID');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    onLogin(user);
    alert('Login successful!');
    navigate('/dashboard');
  };

  return (
    <div>
      <style>{`
        .rainbow-bg {
          background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #84fab0, #8fd3f4);
          background-size: 600% 600%;
          animation: gradientMove 15s ease infinite;
          min-height: 100vh;
          padding: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        .login-box {
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
          width: 300px;
          text-align: center;
        }

        .login-box h2 {
          color: #333;
          margin-bottom: 20px;
        }

        .login-box input, .login-box select {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #aaa;
          border-radius: 5px;
        }

        .login-box button {
          background-color: #4caf50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-box button:hover {
          background-color: #388e3c;
        }
      `}</style>

      <div className="rainbow-bg">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Public">Public</option>
              <option value="Police">Police</option>
            </select>
            {role === 'Police' && (
              <input
                type="text"
                placeholder="Enter Police ID"
                value={policeId}
                onChange={(e) => setPoliceId(e.target.value)}
                required
              />
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
