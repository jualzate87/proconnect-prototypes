import React from 'react';
import './Radio.css';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  direction = 'vertical',
  className = '',
}) => {
  return (
    <fieldset className={`pc-radio-group pc-radio-group--${direction} ${className}`}>
      {label && <legend className="pc-radio-group__label">{label}</legend>}
      <div className="pc-radio-group__options">
        {options.map((option) => (
          <label
            key={option.value}
            className={`pc-radio ${option.disabled ? 'pc-radio--disabled' : ''}`}
          >
            <div className="pc-radio__control">
              <input
                type="radio"
                className="pc-radio__input"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                disabled={option.disabled}
              />
              <span className={`pc-radio__circle ${value === option.value ? 'pc-radio__circle--checked' : ''}`} />
            </div>
            <div className="pc-radio__text">
              <span className="pc-radio__label">{option.label}</span>
              {option.description && (
                <span className="pc-radio__description">{option.description}</span>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <span className="pc-radio-group__error">{error}</span>}
    </fieldset>
  );
};
