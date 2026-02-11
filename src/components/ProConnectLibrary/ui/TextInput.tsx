import React from 'react';
import './TextInput.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  /** Left icon */
  iconLeft?: React.ReactNode;
  /** Right icon */
  iconRight?: React.ReactNode;
  /** Full-width input */
  fullWidth?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  error,
  iconLeft,
  iconRight,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `pc-input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`pc-text-input ${fullWidth ? 'pc-text-input--full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="pc-text-input__label">
          {label}
        </label>
      )}
      <div className={`pc-text-input__field ${hasError ? 'pc-text-input__field--error' : ''}`}>
        {iconLeft && <span className="pc-text-input__icon pc-text-input__icon--left">{iconLeft}</span>}
        <input
          id={inputId}
          className="pc-text-input__input"
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {iconRight && <span className="pc-text-input__icon pc-text-input__icon--right">{iconRight}</span>}
      </div>
      {error && (
        <span id={`${inputId}-error`} className="pc-text-input__error" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="pc-text-input__helper">
          {helperText}
        </span>
      )}
    </div>
  );
};
