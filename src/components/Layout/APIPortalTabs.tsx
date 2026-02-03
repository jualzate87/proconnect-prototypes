import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './APIPortalTabs.css';

interface TabItem {
  path: string;
  label: string;
}

const tabs: TabItem[] = [
  {
    path: '/settings/api-portal/catalog',
    label: 'API Catalog',
  },
  {
    path: '/settings/api-portal/documentation',
    label: 'Documentation',
  },
  {
    path: '/settings/api-portal/keys',
    label: 'API Keys',
  },
  {
    path: '/settings/api-portal/health',
    label: 'API Health',
  },
];

export const APIPortalTabs: React.FC = () => {
  const location = useLocation();

  return (
    <div className="api-portal-tabs">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`api-portal-tab ${isActive ? 'api-portal-tab-active' : ''}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};
