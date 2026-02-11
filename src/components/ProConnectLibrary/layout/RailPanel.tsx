import React from 'react';
import './RailPanel.css';

export interface RailItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
}

interface RailPanelProps {
  /** Items shown in the rail (icon strip) */
  railItems: RailItem[];
  /** Currently active rail item */
  activeRailItemId?: string;
  /** Callback when rail item is clicked */
  onRailItemClick?: (item: RailItem) => void;
  /** Content rendered in the expandable panel */
  panelContent?: React.ReactNode;
  /** Panel title */
  panelTitle?: string;
  /** Whether the panel is open */
  panelOpen?: boolean;
  /** Callback to toggle panel */
  onPanelToggle?: (open: boolean) => void;
  /** Position of the rail/panel */
  position?: 'left' | 'right';
  /** Panel width */
  panelWidth?: number;
  className?: string;
}

export const RailPanel: React.FC<RailPanelProps> = ({
  railItems,
  activeRailItemId,
  onRailItemClick,
  panelContent,
  panelTitle,
  panelOpen = false,
  onPanelToggle,
  position = 'right',
  panelWidth = 320,
  className = '',
}) => {
  const handleRailClick = (item: RailItem) => {
    if (item.id === activeRailItemId && panelOpen) {
      onPanelToggle?.(false);
    } else {
      onRailItemClick?.(item);
      onPanelToggle?.(true);
    }
  };

  return (
    <div className={`pc-rail-panel pc-rail-panel--${position} ${className}`}>
      {/* Rail (icon strip) */}
      <div className="pc-rail">
        {railItems.map((item) => (
          <button
            key={item.id}
            className={`pc-rail__item ${item.id === activeRailItemId && panelOpen ? 'pc-rail__item--active' : ''}`}
            onClick={() => handleRailClick(item)}
            title={item.label}
            aria-label={item.label}
          >
            <span className="pc-rail__item-icon">{item.icon}</span>
            {item.badge !== undefined && (
              <span className="pc-rail__item-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Expandable Panel */}
      <div
        className={`pc-rail-panel__panel ${panelOpen ? 'pc-rail-panel__panel--open' : ''}`}
        style={{ width: panelOpen ? panelWidth : 0 }}
      >
        <div className="pc-rail-panel__panel-inner" style={{ width: panelWidth }}>
          {panelTitle && (
            <div className="pc-rail-panel__panel-header">
              <h3 className="pc-rail-panel__panel-title">{panelTitle}</h3>
              <button
                className="pc-rail-panel__panel-close"
                onClick={() => onPanelToggle?.(false)}
                aria-label="Close panel"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}
          <div className="pc-rail-panel__panel-content">
            {panelContent}
          </div>
        </div>
      </div>
    </div>
  );
};
