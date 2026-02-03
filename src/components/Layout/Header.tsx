import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  onOpenTrowser: (trowser: 'api-portal' | 'firm-branding') => void;
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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14V10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 6H10.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="header-icon-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 7C15 5.4087 14.3679 3.88258 13.2426 2.75736C12.1174 1.63214 10.5913 1 9 1C7.4087 1 5.88258 1.63214 4.75736 2.75736C3.63214 3.88258 3 5.4087 3 7C3 12 1 14 1 14H17C17 14 15 12 15 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.73 17C11.5542 17.3031 11.3019 17.5547 10.9982 17.7295C10.6946 17.9044 10.3504 17.9965 10 17.9965C9.64964 17.9965 9.30541 17.9044 9.00179 17.7295C8.69818 17.5547 8.44584 17.3031 8.27 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="header-settings-container" ref={menuRef}>
          <button 
            className="header-icon-btn" 
            aria-label="Settings"
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.6569 11.2929L16.2426 9.87868C16.0479 9.68342 15.9314 9.4209 15.9314 9.14645C15.9314 8.872 16.0479 8.60948 16.2426 8.41421L17.6569 7C17.8427 6.81421 17.9999 6.60107 18.1231 6.36808C18.2463 6.13508 18.3342 5.88526 18.3836 5.62693C18.433 5.3686 18.4433 5.10469 18.4142 4.84315C18.3851 4.5816 18.317 4.32562 18.2123 4.08451C18.1076 3.8434 17.9676 3.62012 17.798 3.42278C17.6284 3.22543 17.4315 3.05667 17.2146 2.92278C16.9977 2.78889 16.7635 2.69148 16.5206 2.63451C16.2777 2.57754 16.0291 2.56189 15.7825 2.58815C15.5359 2.61441 15.2947 2.68219 15.0686 2.78868L13.6544 4.2029C13.2639 4.59342 12.6307 4.59342 12.2402 4.2029L11.2929 3.25559C10.9024 2.86507 10.2692 2.86507 9.87868 3.25559L8.93137 4.2029C8.54085 4.59342 7.90768 4.59342 7.51716 4.2029L6.10394 2.78968C5.87784 2.68319 5.63664 2.61541 5.39004 2.58915C5.14344 2.56289 4.89484 2.57854 4.65194 2.63551C4.40904 2.69248 4.17484 2.78989 3.95794 2.92378C3.74104 3.05767 3.54414 3.22643 3.37454 3.42378C3.20494 3.62112 3.06494 3.8444 2.96024 4.08551C2.85554 4.32662 2.78744 4.5826 2.75834 4.84415C2.72924 5.10569 2.73954 5.3696 2.78894 5.62793C2.83834 5.88626 2.92624 6.13608 3.04944 6.36908C3.17264 6.60207 3.32984 6.81521 3.51563 7.001L4.92984 8.41521C5.12511 8.60948 5.24163 8.872 5.24163 9.14645C5.24163 9.4209 5.12511 9.68342 4.92984 9.87868L3.51563 11.2929C3.32984 11.4787 3.17264 11.6918 3.04944 11.9248C2.92624 12.1578 2.83834 12.4076 2.78894 12.6659C2.73954 12.9243 2.72924 13.1882 2.75834 13.4497C2.78744 13.7113 2.85554 13.9673 2.96024 14.2084C3.06494 14.4495 3.20494 14.6728 3.37454 14.8701C3.54414 15.0675 3.74104 15.2362 3.95794 15.3701C4.17484 15.504 4.40904 15.6014 4.65194 15.6584C4.89484 15.7154 5.14344 15.731 5.39004 15.7048C5.63664 15.6785 5.87784 15.6107 6.10394 15.5042L7.51716 14.09C7.90768 13.6995 8.54085 13.6995 8.93137 14.09L9.87868 15.0373C10.2692 15.4278 10.9024 15.4278 11.2929 15.0373L12.2402 14.09C12.6307 13.6995 13.2639 13.6995 13.6544 14.09L15.0686 15.5042C15.2947 15.6107 15.5359 15.6785 15.7825 15.7048C16.0291 15.731 16.2777 15.7154 16.5206 15.6584C16.7635 15.6014 16.9977 15.504 17.2146 15.3701C17.4315 15.2362 17.6284 15.0675 17.798 14.8701C17.9676 14.6728 18.1076 14.4495 18.2123 14.2084C18.317 13.9673 18.3851 13.7113 18.4142 13.4497C18.4433 13.1882 18.433 12.9243 18.3836 12.6659C18.3342 12.4076 18.2463 12.1578 18.1231 11.9248C17.9999 11.6918 17.8427 11.4787 17.6569 11.2929Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
                    onOpenTrowser('firm-branding');
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
                    onOpenTrowser('api-portal');
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </header>
  );
};
