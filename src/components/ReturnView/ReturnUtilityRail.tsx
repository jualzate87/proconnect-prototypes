import React from 'react';
import './ReturnUtilityRail.css';

const railItems = [
  { id: 'tax-organizer', label: 'Tax Organizer', icon: '📋' },
  { id: 'import-hub', label: 'Import hub', icon: '⊕' },
  { id: 'documents-list', label: 'Documents list', icon: '📁' },
  { id: 'client-activity', label: 'Client activity', icon: '⏱' },
  { id: 'flagged-items', label: 'Flagged items', icon: '⚑' },
  { id: 'comments', label: 'Comments', icon: '💬' },
];

export const ReturnUtilityRail: React.FC = () => {
  return (
    <aside className="utility-rail">
      {railItems.map((item) => (
        <button
          key={item.id}
          className="utility-rail-item"
          aria-label={item.label}
          title={item.label}
        >
          <span className="utility-rail-icon">{item.icon}</span>
          <span className="utility-rail-label">{item.label}</span>
        </button>
      ))}
    </aside>
  );
};
