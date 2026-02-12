import React from 'react';
import type { Form1040Field, SourceReference } from '../../types';
import './FieldPopover.css';

interface FieldPopoverProps {
  field: Form1040Field;
  allFields?: Form1040Field[];
  position: { top: number; left: number };
  onClose: () => void;
  onSourceClick: (source: SourceReference) => void;
  onAskAbout?: (question: string) => void;
}

const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') return value;
  return '$' + value.toLocaleString('en-US');
};

const getConfidenceClass = (confidence: number): string => {
  if (confidence >= 90) return 'high';
  if (confidence >= 75) return 'medium';
  return 'low';
};

export const FieldPopover: React.FC<FieldPopoverProps> = ({
  field,
  allFields = [],
  position,
  onClose,
  onSourceClick,
  onAskAbout,
}) => {
  const componentFields = field.calculationComponents
    ? field.calculationComponents
        .map((id) => allFields.find((f) => f.id === id))
        .filter(Boolean) as Form1040Field[]
    : [];

  return (
    <>
      <div className="popover-backdrop" onClick={onClose} />
      <div
        className="field-popover"
        style={{ top: position.top, left: position.left }}
      >
        <div className="popover-header">
          <div className="popover-title-row">
            <span className="popover-line-number">Line {field.line}</span>
            <span className="popover-label">{field.label}</span>
          </div>
          <button className="popover-close-btn" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Year over Year Comparison */}
        {field.priorYearValue !== undefined && (
          <div className="popover-yoy">
            <h4 className="popover-section-title">Year-over-Year Comparison</h4>
            <div className="yoy-comparison">
              <div className="yoy-year">
                <span className="yoy-year-label">2024 (Current)</span>
                <span className="yoy-year-value">{formatCurrency(field.currentValue)}</span>
              </div>
              <div className="yoy-arrow">→</div>
              <div className="yoy-year">
                <span className="yoy-year-label">2023 (Prior)</span>
                <span className="yoy-year-value prior">{formatCurrency(field.priorYearValue)}</span>
              </div>
              {field.changePercent && (
                <div className={`yoy-change ${field.changePercent > 0 ? 'positive' : 'negative'}`}>
                  {field.changePercent > 0 ? '+' : ''}{field.changePercent}%
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inline Calculation Drilldown (for computed fields) */}
        {componentFields.length > 0 && (
          <div className="popover-calculation">
            <h4 className="popover-section-title">Calculation Breakdown</h4>
            <div className="calc-breakdown">
              {componentFields.map((cf, idx) => (
                <div key={cf.id} className="calc-line-item">
                  <span className="calc-line-ref">Line {cf.line}</span>
                  <span className="calc-line-label">{cf.label}</span>
                  <span className="calc-line-value">{formatCurrency(cf.currentValue)}</span>
                  {idx < componentFields.length - 1 && (
                    <span className="calc-line-operator">+</span>
                  )}
                </div>
              ))}
              <div className="calc-line-total">
                <span className="calc-line-ref">Line {field.line}</span>
                <span className="calc-line-label">{field.label}</span>
                <span className="calc-line-value total">{formatCurrency(field.currentValue)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Source Documents */}
        {field.sources && field.sources.length > 0 && (
          <div className="popover-sources">
            <h4 className="popover-section-title">Source Documents</h4>
            {field.sources.map((source, idx) => (
              <button
                key={idx}
                className="popover-source-item"
                onClick={() => onSourceClick(source)}
              >
                <div className="source-item-left">
                  <span className="source-doc-name">{source.documentName}</span>
                  <span className="source-doc-type">{source.documentType}</span>
                </div>
                <div className="source-item-right">
                  <span className="source-value">{formatCurrency(source.extractedValue)}</span>
                  <span className={`source-confidence ${getConfidenceClass(source.confidence)}`}>
                    {source.confidence}% conf.
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="source-chevron">
                  <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Ask about this */}
        {onAskAbout && (
          <div className="popover-ask-about">
            <button
              className="ask-about-btn"
              onClick={() => onAskAbout(`Tell me more about Line ${field.line} (${field.label}). Current value is ${formatCurrency(field.currentValue)}${field.priorYearValue !== undefined ? `, prior year was ${formatCurrency(field.priorYearValue)}` : ''}.`)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C3.686 1 1 3.686 1 7C1 10.314 3.686 13 7 13C10.314 13 13 10.314 13 7C13 3.686 10.314 1 7 1Z" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5.5 5.5C5.5 4.672 6.172 4 7 4C7.828 4 8.5 4.672 8.5 5.5C8.5 6.328 7.828 7 7 7V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="7" cy="10" r="0.5" fill="currentColor"/>
              </svg>
              Ask about this
            </button>
          </div>
        )}
      </div>
    </>
  );
};
