import React from 'react';
import './DiagnosticsBar.css';

interface DiagnosticsBarProps {
  title?: string;
}

export const DiagnosticsBar: React.FC<DiagnosticsBarProps> = ({
  title = '1040: 2024 U.S. Individual Income Tax Return',
}) => {
  return (
    <div className="diagnostics-bar">
      <div className="diagnostics-top">
        <div className="diagnostics-title-row">
          <button className="diagnostics-expand-btn" aria-label="Expand">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="diagnostics-title">{title}</h2>
        </div>
      </div>
      <div className="diagnostics-bottom">
        <p className="diagnostics-instructions">
          <strong>Choose highlighted items</strong> to jump to input field. You can place checkmarks to mark fields for review.{' '}
          <a href="#" className="diagnostics-link">Learn more</a>
        </p>
        <div className="diagnostics-legend">
          <span className="legend-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 5" stroke="#00A651" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Checkmark
          </span>
          <span className="legend-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" fill="#FF9800"/>
              <path d="M8 5V8.5M8 10.5V11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Checkmark with changed value
          </span>
        </div>
      </div>
    </div>
  );
};
