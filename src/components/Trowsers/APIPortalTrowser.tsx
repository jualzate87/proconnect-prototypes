import React, { useState, useEffect } from 'react';
import { Trowser } from '../Shared/Trowser';
import { APICatalog } from '../APICatalog/APICatalog';
import { Documentation } from '../Documentation/Documentation';
import { APIKeys } from '../APIKeys/APIKeys';
import { APIHealth } from '../APIHealth/APIHealth';
import './APIPortalTrowser.css';

interface APIPortalTrowserProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'catalog' | 'documentation' | 'keys' | 'health';

export const APIPortalTrowser: React.FC<APIPortalTrowserProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('catalog');
  const [documentationHash, setDocumentationHash] = useState<string>('');

  const tabs = [
    { id: 'catalog' as TabType, label: 'API Catalog' },
    { id: 'documentation' as TabType, label: 'Documentation' },
    { id: 'keys' as TabType, label: 'API Keys' },
    { id: 'health' as TabType, label: 'API Health' },
  ];

  const handleSwitchToKeys = () => {
    setActiveTab('keys');
  };

  const handleSwitchToDocumentation = (hash?: string) => {
    setActiveTab('documentation');
    if (hash) {
      setDocumentationHash(hash);
    }
  };

  useEffect(() => {
    if (activeTab === 'documentation' && documentationHash) {
      // Scroll to the hash after a brief delay to ensure content is rendered
      setTimeout(() => {
        const element = document.getElementById(documentationHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [activeTab, documentationHash]);

  const renderContent = () => {
    switch (activeTab) {
      case 'catalog':
        return (
          <APICatalog 
            onSwitchToKeys={handleSwitchToKeys}
            onSwitchToDocumentation={handleSwitchToDocumentation}
          />
        );
      case 'documentation':
        return <Documentation />;
      case 'keys':
        return <APIKeys />;
      case 'health':
        return <APIHealth />;
      default:
        return (
          <APICatalog 
            onSwitchToKeys={handleSwitchToKeys}
            onSwitchToDocumentation={handleSwitchToDocumentation}
          />
        );
    }
  };

  return (
    <Trowser isOpen={isOpen} onClose={onClose} title="API Portal">
      <div className="api-portal-trowser">
        <div className="api-portal-trowser-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`api-portal-trowser-tab ${
                activeTab === tab.id ? 'api-portal-trowser-tab-active' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="api-portal-trowser-content">{renderContent()}</div>
      </div>
    </Trowser>
  );
};
