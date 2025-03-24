import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client'; // Optional: For real-time if backend supports

const Chatbot = ({ backendUrl, token }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Simulate initial bot message
    setMessages([{ sender: 'bot', text: 'Hi! I’m your college assistant. How can I help?' }]);

    // Optional: Connect to Socket.IO if backend supports
    const newSocket = io(backendUrl, { auth: { token } });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to chatbot server');
    });

    newSocket.on('message', (msg) => {
      setMessages((prev) => [...prev, { sender: 'bot', text: msg }]);
    });

    return () => newSocket.disconnect();
  }, [backendUrl, token]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    // Simulate bot response (replace with real logic if backend has API)
    const botResponse = getBotResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 500); // Delay for realism

    // Optional: Emit to backend if Socket.IO is set up
    if (socket) socket.emit('message', input);

    setInput('');
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('hi') || msg.includes('hello')) return 'Hello! How can I assist you today?';
    if (msg.includes('help')) return 'I can help with schedules, clubs, or discussions. What do you need?';
    if (msg.includes('schedule')) return 'Check the Schedule tab for events!';
    if (msg.includes('clubs')) return 'Visit the Clubs tab to join one!';
    return 'Hmm, I’m not sure about that. Try asking something else!';
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Chatbot - Grok</h3>
        </div>
        <div className="card-body" style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-3 rounded ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                style={{ maxWidth: '70%' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="card-footer">
          <form onSubmit={handleSend} className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;