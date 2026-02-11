import React from 'react';
import './PCButton.css';

interface PCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export const PCButton: React.FC<PCButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`pc-btn pc-btn--${variant} pc-btn--${size} ${fullWidth ? 'pc-btn--full' : ''} ${loading ? 'pc-btn--loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="pc-btn__spinner">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="30" strokeDashoffset="10">
              <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      )}
      {iconLeft && !loading && <span className="pc-btn__icon">{iconLeft}</span>}
      <span className="pc-btn__label">{children}</span>
      {iconRight && <span className="pc-btn__icon">{iconRight}</span>}
    </button>
  );
};
