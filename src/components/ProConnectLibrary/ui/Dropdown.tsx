import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  divider?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

interface DropdownProps {
  trigger: React.ReactNode;
  sections: DropdownSection[];
  onItemClick?: (item: DropdownItem) => void;
  align?: 'left' | 'right';
  width?: number;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  sections,
  onItemClick,
  align = 'right',
  width = 240,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`pc-dropdown ${className}`} ref={ref}>
      <div className="pc-dropdown__trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`pc-dropdown__menu pc-dropdown__menu--${align}`}
          style={{ width }}
        >
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="pc-dropdown__section">
              {section.title && (
                <div className="pc-dropdown__section-title">{section.title}</div>
              )}
              {section.items.map((item) =>
                item.divider ? (
                  <div key={item.id} className="pc-dropdown__divider" />
                ) : (
                  <button
                    key={item.id}
                    className={`pc-dropdown__item ${item.danger ? 'pc-dropdown__item--danger' : ''}`}
                    disabled={item.disabled}
                    onClick={() => {
                      onItemClick?.(item);
                      setIsOpen(false);
                    }}
                  >
                    {item.icon && <span className="pc-dropdown__item-icon">{item.icon}</span>}
                    <div className="pc-dropdown__item-content">
                      <span className="pc-dropdown__item-label">{item.label}</span>
                      {item.description && (
                        <span className="pc-dropdown__item-desc">{item.description}</span>
                      )}
                    </div>
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
