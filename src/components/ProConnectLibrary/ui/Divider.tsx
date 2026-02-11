import React from 'react';
import './Divider.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  spacing = 'md',
  className = '',
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={`pc-divider pc-divider--labeled pc-divider--spacing-${spacing} ${className}`}>
        <span className="pc-divider__line" />
        <span className="pc-divider__label">{label}</span>
        <span className="pc-divider__line" />
      </div>
    );
  }

  return (
    <div
      className={`pc-divider pc-divider--${orientation} pc-divider--spacing-${spacing} ${className}`}
      role="separator"
    />
  );
};
