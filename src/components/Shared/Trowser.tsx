import React, { useEffect } from 'react';
import './Trowser.css';

interface TrowserProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Trowser: React.FC<TrowserProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="trowser-overlay" onClick={onClose}>
      <div className="trowser" onClick={(e) => e.stopPropagation()}>
        <div className="trowser-header">
          <h2 className="trowser-title">{title}</h2>
          <button
            className="trowser-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        
        <div className="trowser-content">
          {children}
        </div>

        {footer && (
          <div className="trowser-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
