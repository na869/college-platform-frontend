import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Discussions from './components/discussions';
import Clubs from './components/clubs';
import Schedule from './components/schedule';
import Chatbot from './components/chatbot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Placeholder Admin Dashboard
const AdminDashboard = () => (
  <div className="container mt-5">
    <h1 className="display-4 text-center mb-4">Admin Dashboard</h1>
    <p className="lead text-center">Manage clubs, users, and more here! (Demo mode)</p>
  </div>
);

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const BACKEND_URL = 'https://college-platform-backend.onrender.com';

  const handleLogout = () => {
    setRole('');
    setToken('');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/dashboard">College Hub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/discussions">Discussions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/clubs">Clubs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/schedule">Schedule</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/chatbot">Chatbot</Link>
              </li>
              {role === 'admin' && (
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/admin">Admin</Link>
                </li>
              )}
            </ul>
            {token ? (
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                Sign Out
              </button>
            ) : (
              <Link className="btn btn-outline-light ms-2" to="/login">Sign In</Link>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login backendUrl={BACKEND_URL} setToken={setToken} setRole={setRole} />} />
        <Route path="/login" element={<Login backendUrl={BACKEND_URL} setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register backendUrl={BACKEND_URL} />} />
        <Route path="/dashboard" element={<Dashboard backendUrl={BACKEND_URL} token={token} />} />
        <Route path="/discussions" element={<Discussions backendUrl={BACKEND_URL} token={token} role={role} />} />
        <Route path="/clubs" element={<Clubs backendUrl={BACKEND_URL} token={token} role={role} />} /> {/* Added role */}
        <Route path="/schedule" element={<Schedule backendUrl={BACKEND_URL} token={token} />} />
        <Route path="/chatbot" element={<Chatbot backendUrl={BACKEND_URL} token={token} />} />
        {role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;