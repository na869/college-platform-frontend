import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = ({ backendUrl, token }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/announcements`, {
          headers: { 'x-auth-token': token }
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Network Error:', error);
        setAnnouncements([{ title: "Welcome", content: "College Dashboard!", author: { name: "Admin" } }]);
      }
    };
    fetchAnnouncements();
  }, [backendUrl, token]);

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-4">Dashboard</h1>
      <p className="lead text-center text-muted">Welcome to the College Platform!</p>
      <h3 className="mt-5 mb-3">Latest Announcements</h3>
      {announcements.length === 0 ? (
        <div className="alert alert-info" role="alert">No announcements yet.</div>
      ) : (
        <div className="row">
          {announcements.map((announcement, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{announcement.title}</h5>
                  <p className="card-text">{announcement.content}</p>
                  <small className="text-muted">Posted by: {announcement.author?.name || 'Unknown'}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;