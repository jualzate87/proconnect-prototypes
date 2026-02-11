import React from 'react';
import './TopBar.css';
import { IconHelp, IconNotification, IconSettings } from '../icons/Icons';

interface TopBarProps {
  /** Text shown on the left, e.g. firm/account name */
  accountName?: string;
  /** Breadcrumb items */
  breadcrumbs?: { label: string; onClick?: () => void }[];
  /** Extra actions rendered in the center */
  centerContent?: React.ReactNode;
  /** Whether to show the help icon */
  showHelp?: boolean;
  /** Whether to show the notifications icon */
  showNotifications?: boolean;
  /** Notification count badge */
  notificationCount?: number;
  /** Whether to show the settings icon */
  showSettings?: boolean;
  /** User avatar/initials */
  userName?: string;
  /** Custom actions to render on the right */
  actions?: React.ReactNode;
  /** Callbacks */
  onHelpClick?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onUserClick?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  accountName,
  breadcrumbs,
  centerContent,
  showHelp = true,
  showNotifications = true,
  notificationCount,
  showSettings = true,
  userName,
  actions,
  onHelpClick,
  onNotificationsClick,
  onSettingsClick,
  onUserClick,
  className = '',
}) => {
  const initials = userName
    ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <header className={`pc-topbar ${className}`}>
      <div className="pc-topbar__left">
        {accountName && (
          <span className="pc-topbar__account">{accountName}</span>
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="pc-topbar__breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="pc-topbar__breadcrumb-sep">/</span>}
                <button
                  className={`pc-topbar__breadcrumb ${idx === breadcrumbs.length - 1 ? 'pc-topbar__breadcrumb--current' : ''}`}
                  onClick={crumb.onClick}
                  disabled={!crumb.onClick}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>

      {centerContent && (
        <div className="pc-topbar__center">{centerContent}</div>
      )}

      <div className="pc-topbar__right">
        {actions}

        {showHelp && (
          <button className="pc-topbar__icon-btn" onClick={onHelpClick} aria-label="Help">
            <IconHelp size={18} />
          </button>
        )}

        {showNotifications && (
          <button className="pc-topbar__icon-btn pc-topbar__icon-btn--notifications" onClick={onNotificationsClick} aria-label="Notifications">
            <IconNotification size={18} />
            {notificationCount !== undefined && notificationCount > 0 && (
              <span className="pc-topbar__notification-badge">
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
        )}

        {showSettings && (
          <button className="pc-topbar__icon-btn" onClick={onSettingsClick} aria-label="Settings">
            <IconSettings size={18} />
          </button>
        )}

        {userName && (
          <button className="pc-topbar__avatar" onClick={onUserClick} aria-label="User account">
            {initials}
          </button>
        )}
      </div>
    </header>
  );
};
