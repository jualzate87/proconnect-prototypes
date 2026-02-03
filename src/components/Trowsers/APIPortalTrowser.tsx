import React, { useState } from 'react';
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

  const tabs = [
    { id: 'catalog' as TabType, label: 'API Catalog' },
    { id: 'documentation' as TabType, label: 'Documentation' },
    { id: 'keys' as TabType, label: 'API Keys' },
    { id: 'health' as TabType, label: 'API Health' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'catalog':
        return <APICatalog />;
      case 'documentation':
        return <Documentation />;
      case 'keys':
        return <APIKeys />;
      case 'health':
        return <APIHealth />;
      default:
        return <APICatalog />;
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
