import React from 'react';

function Requests({ onClose }) {
  const requests = [
    { id: 1, title: 'בקשה 1', status: 'פתוח' },
    { id: 2, title: 'בקשה 2', status: 'בטיפול' },
    { id: 3, title: 'בקשה 3', status: 'סגור' },
  ];

  return (
    <div className="requests-component">
      <h2>הבקשות שלי</h2>
      <ul className="requests-list">
        {requests.map(request => (
          <li key={request.id}>
            <div>{request.title}</div>
            <div>סטטוס: {request.status}</div>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>סגור</button>
    </div>
  );
}

export default Requests;