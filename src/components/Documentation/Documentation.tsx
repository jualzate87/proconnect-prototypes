import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DocSidebar } from './DocSidebar';
import { DocContent } from './DocContent';
import './Documentation.css';

export const Documentation: React.FC = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState('quickstart');

  // Handle hash-based navigation (e.g., #client-service)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setSelectedSection(hash);
      // Scroll to top when section changes
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    // Update URL hash without causing a full page reload
    window.history.pushState(null, '', `#${section}`);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  return (
    <div className="documentation">
      <div className="documentation-header">
        <h1 className="documentation-title">Documentation</h1>
        <p className="documentation-description">
          Comprehensive guides, tutorials, and reference materials for integrating
          with ProConnect Tax APIs. Find detailed endpoint documentation, code
          examples, and best practices.
        </p>
      </div>

      <div className="documentation-content">
        <DocSidebar
          selectedSection={selectedSection}
          onSectionChange={handleSectionChange}
        />
        <DocContent section={selectedSection} />
      </div>
    </div>
  );
};
