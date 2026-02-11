import React from 'react';
import './Tabs.css';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  return (
    <div
      className={`pc-tabs pc-tabs--${variant} pc-tabs--${size} ${fullWidth ? 'pc-tabs--full' : ''} ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`pc-tab ${tab.id === activeTabId ? 'pc-tab--active' : ''}`}
          role="tab"
          aria-selected={tab.id === activeTabId}
          disabled={tab.disabled}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon && <span className="pc-tab__icon">{tab.icon}</span>}
          <span className="pc-tab__label">{tab.label}</span>
          {tab.badge !== undefined && (
            <span className="pc-tab__badge">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
};
