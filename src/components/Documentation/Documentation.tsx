import React, { useState } from 'react';
import { DocSidebar } from './DocSidebar';
import { DocContent } from './DocContent';
import './Documentation.css';

export const Documentation: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('quickstart');

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
          onSectionChange={setSelectedSection}
        />
        <DocContent section={selectedSection} />
      </div>
    </div>
  );
};
