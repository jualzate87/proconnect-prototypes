import React from 'react';
import './DocSidebar.css';

interface DocSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'returns', label: 'Tax Returns API' },
  { id: 'clients', label: 'Client Sync API' },
  { id: 'documents', label: 'Document Bridge API' },
  { id: 'best-practices', label: 'Best Practices' },
];

export const DocSidebar: React.FC<DocSidebarProps> = ({
  selectedSection,
  onSectionChange,
}) => {
  return (
    <aside className="doc-sidebar">
      <nav className="doc-sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`doc-sidebar-item ${
              selectedSection === section.id ? 'doc-sidebar-item-active' : ''
            }`}
            onClick={() => onSectionChange(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
