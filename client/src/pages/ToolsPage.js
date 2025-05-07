import React from 'react';
import { Link } from 'react-router-dom';

function ToolsPage() {
  const tools = [
    { id: 1, name: 'כלי 1' },
    { id: 2, name: 'כלי 2' },
    { id: 3, name: 'כלי 3' },
  ];

  return (
    <div className="tools-page">
      <h1>כלים</h1>
      <ul className="tools-list">
        {tools.map(tool => (
          <li key={tool.id}>
            <Link to={`/tool/${tool.id}`}>{tool.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToolsPage;
