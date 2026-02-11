import React from 'react';
import './Select.css';
import { IconChevronDown } from '../icons/Icons';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  helperText,
  disabled = false,
  fullWidth = true,
  className = '',
}) => {
  const selectId = `pc-select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`pc-select ${fullWidth ? 'pc-select--full' : ''} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="pc-select__label">
          {label}
        </label>
      )}
      <div className={`pc-select__field ${hasError ? 'pc-select__field--error' : ''}`}>
        <select
          id={selectId}
          className="pc-select__input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          aria-invalid={hasError}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pc-select__chevron">
          <IconChevronDown size={16} />
        </span>
      </div>
      {error && <span className="pc-select__error">{error}</span>}
      {helperText && !error && <span className="pc-select__helper">{helperText}</span>}
    </div>
  );
};
