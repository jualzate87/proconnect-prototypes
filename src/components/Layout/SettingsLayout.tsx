import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './SettingsLayout.css';

interface SettingsLayoutProps {
  onOpenTrowser: (trowser: 'api-portal' | 'firm-branding') => void;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ onOpenTrowser }) => {
  return (
    <div className="settings-layout">
      <Sidebar />
      <div className="settings-layout-container">
        <Header onOpenTrowser={onOpenTrowser} />
        <main className="settings-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
