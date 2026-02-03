import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { APIPortalTabs } from './APIPortalTabs';
import './SettingsLayout.css';

interface SettingsLayoutProps {
  onOpenTrowser?: (trowser: 'api-portal' | 'firm-branding') => void;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ onOpenTrowser }) => {
  const location = useLocation();
  const isAPIPortal = location.pathname.includes('/settings/api-portal');

  return (
    <div className="settings-layout">
      <Sidebar />
      <div className="settings-layout-container">
        <Header onOpenTrowser={onOpenTrowser} />
        {isAPIPortal && <APIPortalTabs />}
        <main className="settings-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
