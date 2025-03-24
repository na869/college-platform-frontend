import React from 'react';

const Schedule = ({ backendUrl, token }) => {
  const schedules = [{ event: "Hackathon", time: "Now" }];
  return (
    <div className="container mt-4">
      <h2>Schedule</h2>
      <ul className="list-group">
        {schedules.map((sched, index) => (
          <li key={index} className="list-group-item">{sched.event} - {sched.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;