import React from 'react';

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>Diary</li>
        <li>Chart</li>
        <li>Asset</li>
        <li>Me</li>
      </ul>
    </aside>
  );
}

export default DashboardSidebar;