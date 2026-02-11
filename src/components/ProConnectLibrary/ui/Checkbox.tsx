import React from 'react';
import './Checkbox.css';
import { IconCheck } from '../icons/Icons';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  indeterminate = false,
  error,
  className = '',
}) => {
  return (
    <label className={`pc-checkbox ${disabled ? 'pc-checkbox--disabled' : ''} ${error ? 'pc-checkbox--error' : ''} ${className}`}>
      <div className="pc-checkbox__control">
        <input
          type="checkbox"
          className="pc-checkbox__input"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          ref={(el) => {
            if (el) el.indeterminate = indeterminate;
          }}
        />
        <span className={`pc-checkbox__box ${checked || indeterminate ? 'pc-checkbox__box--checked' : ''}`}>
          {checked && <IconCheck size={12} color="white" />}
          {indeterminate && !checked && (
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
              <path d="M1 1H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </div>
      {(label || description) && (
        <div className="pc-checkbox__text">
          {label && <span className="pc-checkbox__label">{label}</span>}
          {description && <span className="pc-checkbox__description">{description}</span>}
          {error && <span className="pc-checkbox__error">{error}</span>}
        </div>
      )}
    </label>
  );
};
