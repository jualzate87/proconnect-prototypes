import React, { useState, useRef, useEffect } from 'react';
import { IconHelp, IconNotification, IconSettings, IconUser } from '../ProConnectLibrary';
import './Header.css';

interface HeaderProps {
  onOpenTrowser?: (trowser: 'api-portal' | 'firm-branding') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrowser }) => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    };

    if (showSettingsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsMenu]);

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-account">ProConnect Tax Testing account</div>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" aria-label="Help">
          <IconHelp size={20} />
        </button>
        <button className="header-icon-btn" aria-label="Notifications">
          <IconNotification size={20} />
        </button>
        <div className="header-settings-container" ref={menuRef}>
          <button 
            className="header-icon-btn" 
            aria-label="Settings"
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          >
            <IconSettings size={20} color="#5D686F" />
          </button>
          
          {showSettingsMenu && (
            <div className="settings-dropdown">
              <div className="settings-dropdown-section">
                <div className="settings-dropdown-label">SETTINGS</div>
                <button className="settings-dropdown-item">Client letters</button>
                <button 
                  className="settings-dropdown-item"
                  onClick={() => {
                    setShowSettingsMenu(false);
                    onOpenTrowser?.('firm-branding');
                  }}
                >
                  Firm branding
                  <span className="settings-dropdown-badge">NEW</span>
                </button>
                <button className="settings-dropdown-item">Print settings</button>
                <button className="settings-dropdown-item">Task accelerators</button>
              </div>
              
              <div className="settings-dropdown-section">
                <div className="settings-dropdown-label">OTHER TOOLS</div>
                <button 
                  className="settings-dropdown-item settings-dropdown-item-highlight"
                  onClick={() => {
                    setShowSettingsMenu(false);
                    onOpenTrowser?.('api-portal');
                  }}
                >
                  API portal
                  <span className="settings-dropdown-badge">NEW</span>
                </button>
                <button className="settings-dropdown-item">Batch actions</button>
                <button className="settings-dropdown-item">SmartLook</button>
              </div>
            </div>
          )}
        </div>
        <button className="header-icon-btn header-avatar" aria-label="Account">
          <IconUser size={24} />
        </button>
      </div>
    </header>
  );
};
