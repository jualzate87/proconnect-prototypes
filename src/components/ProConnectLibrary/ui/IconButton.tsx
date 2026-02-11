import React from 'react';
import './IconButton.css';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'ghost' | 'danger';
  label: string;
  badge?: string | number;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  label,
  badge,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`pc-icon-btn pc-icon-btn--${size} pc-icon-btn--${variant} ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
      {badge !== undefined && <span className="pc-icon-btn__badge">{badge}</span>}
    </button>
  );
};
