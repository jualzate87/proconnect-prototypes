import React from 'react';
import './Toggle.css';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  className = '',
}) => {
  return (
    <label className={`pc-toggle pc-toggle--${size} ${disabled ? 'pc-toggle--disabled' : ''} ${className}`}>
      <div className="pc-toggle__control">
        <input
          type="checkbox"
          className="pc-toggle__input"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span className="pc-toggle__track">
          <span className="pc-toggle__thumb" />
        </span>
      </div>
      {(label || description) && (
        <div className="pc-toggle__text">
          {label && <span className="pc-toggle__label">{label}</span>}
          {description && <span className="pc-toggle__description">{description}</span>}
        </div>
      )}
    </label>
  );
};
