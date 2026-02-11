import React from 'react';
import './PCBadge.css';

interface PCBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'new' | 'ai';
  size?: 'sm' | 'md';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export const PCBadge: React.FC<PCBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  removable = false,
  onRemove,
  className = '',
}) => {
  return (
    <span className={`pc-badge pc-badge--${variant} pc-badge--${size} ${className}`}>
      {dot && <span className="pc-badge__dot" />}
      <span className="pc-badge__text">{children}</span>
      {removable && (
        <button className="pc-badge__remove" onClick={onRemove} aria-label="Remove">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
};
