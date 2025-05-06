import React from 'react';
import { useParams } from 'react-router-dom';

function ToolPage() {
  const { id } = useParams();
  
  return (
    <div className="tool-page">
      <h1>דף כלי {id}</h1>
      <div className="tool-content">
        {/* Tool content */}
      </div>
    </div>
  );
}

export default ToolPage;
