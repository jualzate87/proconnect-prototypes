import React from 'react';
import './InReturnNav.css';
import { IconArrowBack } from '../icons/Icons';

export interface ReturnNavSection {
  id: string;
  label: string;
  status?: 'complete' | 'in-progress' | 'error' | 'not-started';
  children?: { id: string; label: string; status?: string }[];
}

interface InReturnNavProps {
  /** Back button label and handler */
  backLabel?: string;
  onBack?: () => void;
  /** Title shown at top of nav (e.g. return name) */
  title?: string;
  /** Subtitle (e.g. return type/year) */
  subtitle?: string;
  /** Navigation sections */
  sections: ReturnNavSection[];
  /** Currently active section or item */
  activeId?: string;
  /** Callback when a section or item is clicked */
  onItemClick?: (id: string) => void;
  className?: string;
}

export const InReturnNav: React.FC<InReturnNavProps> = ({
  backLabel = 'Back to returns',
  onBack,
  title,
  subtitle,
  sections,
  activeId,
  onItemClick,
  className = '',
}) => {
  const getStatusClass = (status?: string) => {
    switch (status) {
      case 'complete': return 'pc-return-nav__status--complete';
      case 'in-progress': return 'pc-return-nav__status--in-progress';
      case 'error': return 'pc-return-nav__status--error';
      default: return '';
    }
  };

  return (
    <nav className={`pc-return-nav ${className}`}>
      {onBack && (
        <button className="pc-return-nav__back" onClick={onBack}>
          <IconArrowBack size={16} />
          <span>{backLabel}</span>
        </button>
      )}

      {(title || subtitle) && (
        <div className="pc-return-nav__header">
          {title && <h3 className="pc-return-nav__title">{title}</h3>}
          {subtitle && <p className="pc-return-nav__subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="pc-return-nav__sections">
        {sections.map((section) => (
          <div key={section.id} className="pc-return-nav__section">
            <button
              className={`pc-return-nav__section-btn ${section.id === activeId ? 'pc-return-nav__section-btn--active' : ''}`}
              onClick={() => onItemClick?.(section.id)}
            >
              <span className={`pc-return-nav__status ${getStatusClass(section.status)}`} />
              <span className="pc-return-nav__section-label">{section.label}</span>
            </button>

            {section.children && section.children.length > 0 && (
              <div className="pc-return-nav__children">
                {section.children.map((child) => (
                  <button
                    key={child.id}
                    className={`pc-return-nav__child ${child.id === activeId ? 'pc-return-nav__child--active' : ''}`}
                    onClick={() => onItemClick?.(child.id)}
                  >
                    <span className={`pc-return-nav__status pc-return-nav__status--sm ${getStatusClass(child.status)}`} />
                    <span>{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
