import React from 'react';
import { useParams } from 'react-router-dom';

function TopicPage() {
  const { id } = useParams();
  
  return (
    <div className="topic-page">
      <h1>דף נושא {id}</h1>
      <div className="topic-content">
        {/* Topic content */}
      </div>
    </div>
  );
}

export default TopicPage;
