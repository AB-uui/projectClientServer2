import React from 'react';
import { Link } from 'react-router-dom';

function TopicsPage() {
  const topics = [
    { id: 1, name: 'נושא 1' },
    { id: 2, name: 'נושא 2' },
    { id: 3, name: 'נושא 3' },
  ];

  return (
    <div className="topics-page">
      <h1>נושאים</h1>
      <ul className="topics-list">
        {topics.map(topic => (
          <li key={topic.id}>
            <Link to={`/topic/${topic.id}`}>{topic.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsPage;
