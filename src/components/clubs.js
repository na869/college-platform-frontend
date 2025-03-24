import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Clubs = ({ backendUrl, token, role }) => {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState(new Set());
  const [newClub, setNewClub] = useState({ name: '', description: '', activities: [] });
  const [activityInput, setActivityInput] = useState({ title: '', date: '', time: '' });

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/clubs`, {
          headers: { 'x-auth-token': token }
        });
        setClubs(response.data);
      } catch (error) {
        console.error('Network Error:', error);
        setClubs([
          {
            name: "Code Club",
            description: "Learn coding and build projects!",
            activities: [
              { title: "Hackathon Prep", date: "Mar 25, 2025", time: "6 PM" },
              { title: "Code Jam", date: "Apr 1, 2025", time: "5 PM" }
            ]
          }
        ]);
      }
    };
    fetchClubs();
  }, [backendUrl, token]);

  const handleJoin = (clubName) => {
    if (!token) {
      alert('Please sign in to join a club!');
      return;
    }
    setJoinedClubs((prev) => new Set(prev).add(clubName));
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (activityInput.title && activityInput.date && activityInput.time) {
      setNewClub({
        ...newClub,
        activities: [...newClub.activities, activityInput]
      });
      setActivityInput({ title: '', date: '', time: '' });
    }
  };

  const handleAddClub = async (e) => {
    e.preventDefault();
    if (!token || role !== 'admin') {
      alert('Only admins can add clubs!');
      return;
    }
    if (!newClub.name || !newClub.description) {
      alert('Please fill in club name and description!');
      return;
    }

    // Add to frontend (fake for demo)
    setClubs([...clubs, newClub]);

    // Optional: POST to backend if supported
    try {
      await axios.post(`${backendUrl}/api/clubs`, newClub, {
        headers: { 'x-auth-token': token }
      });
    } catch (error) {
      console.error('Error adding club:', error);
    }

    setNewClub({ name: '', description: '', activities: [] });
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center mb-4">Clubs</h1>
      <p className="lead text-center text-muted">Join or manage clubs!</p>

      {/* Admin Add Club Form */}
      {role === 'admin' && (
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h3 className="card-title text-primary">Add New Club</h3>
            <form onSubmit={handleAddClub}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Club Name"
                  value={newClub.name}
                  onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Club Description"
                  value={newClub.description}
                  onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <h6>Add Activity</h6>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Activity Title"
                    value={activityInput.title}
                    onChange={(e) => setActivityInput({ ...activityInput, title: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Date (e.g., Mar 25, 2025)"
                    value={activityInput.date}
                    onChange={(e) => setActivityInput({ ...activityInput, date: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Time (e.g., 6 PM)"
                    value={activityInput.time}
                    onChange={(e) => setActivityInput({ ...activityInput, time: e.target.value })}
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={handleAddActivity}>
                    Add
                  </button>
                </div>
                {newClub.activities.map((act, i) => (
                  <p key={i} className="text-muted">
                    {act.title} - {act.date} at {act.time}
                  </p>
                ))}
              </div>
              <button type="submit" className="btn btn-primary w-100">Create Club</button>
            </form>
          </div>
        </div>
      )}

      {/* Club List */}
      <div className="row">
        {clubs.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info" role="alert">No clubs yet.</div>
          </div>
        ) : (
          clubs.map((club, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{club.name}</h5>
                  <p className="card-text">{club.description}</p>
                  <h6 className="mt-3">Upcoming Activities</h6>
                  <ul className="list-group list-group-flush">
                    {club.activities.map((activity, i) => (
                      <li key={i} className="list-group-item">
                        <strong>{activity.title}</strong> - {activity.date} at {activity.time}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <button
                    className={`btn w-100 ${joinedClubs.has(club.name) ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleJoin(club.name)}
                    disabled={joinedClubs.has(club.name)}
                  >
                    {joinedClubs.has(club.name) ? 'Joined' : 'Join Club'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clubs;