import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Discussions = ({ backendUrl, token, role }) => {
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/discussions`, {
          headers: { 'x-auth-token': token }
        });
        setDiscussions(response.data);
      } catch (error) {
        console.error('Network Error:', error);
        setDiscussions([{ title: "Demo Discussion", content: "Hackathon rocks!", author: { name: "Team" } }]);
      }
    };
    fetchDiscussions();
  }, [backendUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('Please log in to post a discussion.');
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/discussions`, newDiscussion, {
        headers: { 'x-auth-token': token }
      });
      setDiscussions([...discussions, response.data]);
      setNewDiscussion({ title: '', content: '' });
    } catch (error) {
      console.error('Post Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Discussions</h2>
      {token && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">Post Discussion</button>
        </form>
      )}
      {discussions.length === 0 ? (
        <p>No discussions yet.</p>
      ) : (
        <ul className="list-group">
          {discussions.map((discussion, index) => (
            <li key={index} className="list-group-item">
              <h5>{discussion.title}</h5>
              <p>{discussion.content}</p>
              <small>Posted by: {discussion.author?.name || 'Unknown'}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Discussions;