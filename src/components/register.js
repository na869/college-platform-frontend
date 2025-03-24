import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Use App.css for shared styles

const Register = ({ backendUrl }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, formData);
      console.log('Registration response:', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Registration failed. Try again.');
      if (err.message === 'Network Error') {
        setTimeout(() => {
          setError('');
          alert('Demo mode: Registration simulated!');
          navigate('/login');
        }, 1000);
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center register-bg">
      <div className="card shadow-lg border-0 animate-form" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 text-primary fw-bold">Join College Hub</h2>
          {error && (
            <div className="alert alert-danger animate__animated animate__shakeX" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label text-muted fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-muted fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg shadow-sm"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-muted fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg shadow-sm"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="form-label text-muted fw-semibold">Role</label>
              <select
                className="form-select form-select-lg shadow-sm"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-3 fw-bold btn-gradient">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-muted">
            Already a member?{' '}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;