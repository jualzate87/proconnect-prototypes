import React from 'react';
import './DocSidebar.css';

interface DocSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

interface Section {
  id: string;
  label: string;
  isHeader?: boolean;
}

const sections: Section[] = [
  { id: 'header-getting-started', label: 'GETTING STARTED', isHeader: true },
  { id: 'quickstart', label: 'Quickstart' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-api-reference', label: 'API REFERENCE', isHeader: true },
  { id: 'client-service', label: 'Client Service API' },
  { id: 'engagement-service', label: 'Engagement Service API' },
  { id: 'import-service', label: 'Import Service API' },
  { id: 'export-service', label: 'Export Service API' },
];

export const DocSidebar: React.FC<DocSidebarProps> = ({
  selectedSection,
  onSectionChange,
}) => {
  return (
    <aside className="doc-sidebar">
      <nav className="doc-sidebar-nav">
        {sections.map((section) =>
          section.isHeader ? (
            <div key={section.id} className="doc-sidebar-header">
              {section.label}
            </div>
          ) : (
            <button
              key={section.id}
              className={`doc-sidebar-item ${
                selectedSection === section.id ? 'doc-sidebar-item-active' : ''
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </button>
          )
        )}
      </nav>
    </aside>
  );
};
