import React, { useState } from 'react';
import type { SourceReference } from '../../types';
import './SourceDocumentTrowser.css';

interface SourceDocumentTrowserProps {
  source: SourceReference;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (newValue: number | string) => void;
}

type TrowserTab = 'extracted' | 'prior-year';

// Mock extracted fields for each document type
const getMockExtractedFields = (source: SourceReference) => {
  const base = [
    { id: 'main', label: source.fieldName || 'Amount', value: source.extractedValue, confidence: source.confidence, flowsTo: 'Line 1a', isHighlighted: true },
  ];

  if (source.documentType === 'W-2') {
    return [
      { id: 'employer', label: 'Employer name', value: source.documentName.replace('W2 ', ''), confidence: 98, flowsTo: null, isHighlighted: false },
      { id: 'ein', label: 'Employer EIN', value: '12-3456789', confidence: 95, flowsTo: null, isHighlighted: false },
      ...base,
      { id: 'fed-withheld', label: 'Federal income tax withheld', value: source.documentName.includes('Bing') ? 10000 : 9800, confidence: source.confidence, flowsTo: 'Line 25a', isHighlighted: false },
      { id: 'ss-wages', label: 'Social security wages', value: source.extractedValue, confidence: source.confidence, flowsTo: null, isHighlighted: false },
      { id: 'ss-tax', label: 'Social security tax withheld', value: typeof source.extractedValue === 'number' ? Math.round(source.extractedValue * 0.062) : 0, confidence: source.confidence, flowsTo: null, isHighlighted: false },
      { id: 'medicare-wages', label: 'Medicare wages and tips', value: source.extractedValue, confidence: source.confidence, flowsTo: null, isHighlighted: false },
      { id: 'medicare-tax', label: 'Medicare tax withheld', value: typeof source.extractedValue === 'number' ? Math.round(source.extractedValue * 0.0145) : 0, confidence: source.confidence, flowsTo: null, isHighlighted: false },
      { id: 'state', label: 'State', value: 'CA', confidence: 97, flowsTo: null, isHighlighted: false },
      { id: 'state-wages', label: 'State wages', value: source.extractedValue, confidence: source.confidence, flowsTo: null, isHighlighted: false },
    ];
  }

  if (source.documentType === '1099-INT') {
    return [
      { id: 'payer', label: 'Payer name', value: 'First National Bank', confidence: 96, flowsTo: null, isHighlighted: false },
      { id: 'interest', label: 'Interest income', value: source.extractedValue, confidence: source.confidence, flowsTo: 'Line 2b', isHighlighted: true },
      { id: 'early-penalty', label: 'Early withdrawal penalty', value: 0, confidence: 99, flowsTo: null, isHighlighted: false },
      { id: 'fed-withheld-int', label: 'Federal income tax withheld', value: 0, confidence: 99, flowsTo: null, isHighlighted: false },
    ];
  }

  if (source.documentType === '1099-DIV') {
    return [
      { id: 'payer', label: 'Payer name', value: 'Vanguard Investments', confidence: 97, flowsTo: null, isHighlighted: false },
      { id: 'ord-div', label: 'Total ordinary dividends', value: 531, confidence: source.confidence, flowsTo: 'Line 3b', isHighlighted: source.fieldName?.includes('ordinary') || false },
      { id: 'qual-div', label: 'Qualified dividends', value: 45, confidence: source.confidence, flowsTo: 'Line 3a', isHighlighted: source.fieldName?.includes('Qualified') || false },
      { id: 'cap-gain', label: 'Total capital gain distributions', value: 0, confidence: 99, flowsTo: null, isHighlighted: false },
    ];
  }

  return base;
};

const formatValue = (value: number | string): string => {
  if (typeof value === 'number') return '$' + value.toLocaleString('en-US');
  return value;
};

const getConfidenceClass = (conf: number) => {
  if (conf >= 90) return 'high';
  if (conf >= 75) return 'medium';
  return 'low';
};

export const SourceDocumentTrowser: React.FC<SourceDocumentTrowserProps> = ({
  source,
  isOpen,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<TrowserTab>('extracted');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const extractedFields = getMockExtractedFields(source);

  const handleEdit = (fieldId: string, currentValue: number | string) => {
    setEditingField(fieldId);
    setEditValue(String(currentValue));
  };

  const handleSave = (fieldId: string) => {
    const numVal = Number(editValue);
    // Only trigger parent save for the main highlighted field
    if (fieldId === 'main' || fieldId === 'interest' || fieldId === 'ord-div' || fieldId === 'qual-div') {
      onSave?.(isNaN(numVal) ? editValue : numVal);
    }
    setEditingField(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  return (
    <div className={`source-trowser-overlay ${isOpen ? 'open' : ''}`}>
      <div className="source-trowser-backdrop" onClick={onClose} />
      <div className={`source-trowser-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="trowser-header">
          <div className="trowser-header-left">
            <button className="trowser-back-btn" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M12 4L6 9L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="trowser-header-info">
              <span className="trowser-doc-name">{source.documentName}</span>
              <span className="trowser-doc-meta">{source.documentType} {source.page ? `· Page ${source.page}` : ''}</span>
            </div>
          </div>
          <button className="trowser-close-btn" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Side-by-side body */}
        <div className="trowser-side-by-side">
          {/* Left Pane: Document Viewport */}
          <div className="trowser-left-pane">
            <div className="doc-viewport">
              <div className="doc-viewport-content">
                <div className="mock-document">
                  <div className="mock-doc-form-header">
                    <div className="mock-form-number">
                      <span className="mock-form-label">Form</span>
                      <span className="mock-form-id">{source.documentType}</span>
                    </div>
                    <div className="mock-form-title">
                      {source.documentType === 'W-2' && 'Wage and Tax Statement'}
                      {source.documentType === '1099-INT' && 'Interest Income'}
                      {source.documentType === '1099-DIV' && 'Dividends and Distributions'}
                      {source.documentType === 'K-1' && 'Partner\'s Share of Income'}
                    </div>
                    <div className="mock-form-year">2024</div>
                  </div>
                  <div className="mock-doc-body">
                    {extractedFields.map((field) => (
                      <div key={field.id} className={`mock-doc-field ${field.isHighlighted ? 'highlighted' : ''}`}>
                        <span className="mock-doc-field-label">{field.label}</span>
                        <span className="mock-doc-field-value">
                          {typeof field.value === 'number' ? field.value.toLocaleString('en-US') : field.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Viewport footer with zoom controls */}
            <div className="doc-viewport-footer">
              <span className="viewport-filename">{source.documentName}</span>
              <div className="viewport-controls">
                <button className="viewport-control-btn" title="Zoom out">−</button>
                <span className="viewport-zoom-level">100%</span>
                <button className="viewport-control-btn" title="Zoom in">+</button>
                <button className="viewport-control-btn" title="Fit to width">⤢</button>
              </div>
              <span className="viewport-page-info">Page {source.page || 1}</span>
            </div>
          </div>

          {/* Right Pane: Extracted Data / Prior Year */}
          <div className="trowser-right-pane">
            {/* Tabs */}
            <div className="trowser-tabs">
              <button
                className={`trowser-tab ${activeTab === 'extracted' ? 'active' : ''}`}
                onClick={() => setActiveTab('extracted')}
              >
                Extracted Data
              </button>
              <button
                className={`trowser-tab ${activeTab === 'prior-year' ? 'active' : ''}`}
                onClick={() => setActiveTab('prior-year')}
              >
                Prior Year
              </button>
            </div>

            {/* Tab content */}
            <div className="trowser-tab-content">
              {activeTab === 'extracted' && (
                <div className="extracted-fields-list">
                  {extractedFields.map((field) => (
                    <div key={field.id} className={`extracted-field-row ${field.isHighlighted ? 'highlighted' : ''}`}>
                      <div className="extracted-field-top">
                        <span className="extracted-field-label">{field.label}</span>
                        <span className={`extracted-field-confidence ${getConfidenceClass(field.confidence)}`}>
                          {field.confidence}%
                        </span>
                      </div>
                      {editingField === field.id ? (
                        <div className="extracted-field-edit-section">
                          <div className="extracted-field-edit">
                            <input
                              type="text"
                              className="field-edit-input"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              autoFocus
                            />
                            <button className="field-save-btn" onClick={() => handleSave(field.id)}>Save</button>
                            <button className="field-cancel-btn" onClick={handleCancel}>Cancel</button>
                          </div>
                          {/* Before/After diff preview */}
                          {editValue !== String(field.value) && (
                            <div className="field-diff-preview">
                              <span className="diff-label">Preview:</span>
                              <span className="diff-before">{formatValue(field.value)}</span>
                              <span className="diff-arrow">→</span>
                              <span className="diff-after">
                                {isNaN(Number(editValue))
                                  ? editValue
                                  : formatValue(Number(editValue))}
                              </span>
                              {typeof field.value === 'number' && !isNaN(Number(editValue)) && (
                                <span className={`diff-delta ${Number(editValue) > field.value ? 'positive' : 'negative'}`}>
                                  ({Number(editValue) > field.value ? '+' : ''}
                                  {formatValue(Number(editValue) - field.value)})
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="extracted-field-value-row">
                          <span className="extracted-field-val">{formatValue(field.value)}</span>
                          <button className="field-edit-btn" onClick={() => handleEdit(field.id, field.value)}>
                            Edit
                          </button>
                        </div>
                      )}
                      {field.flowsTo && (
                        <span className="field-flows-to">Flows to: 1040 {field.flowsTo}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'prior-year' && (
                <div className="prior-year-content">
                  <div className="prior-year-notice">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#94a3b8" strokeWidth="1.5"/>
                      <path d="M8 5V8.5M8 11H8.01" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span>Prior year data for comparison purposes</span>
                  </div>
                  {extractedFields.filter(f => typeof f.value === 'number' && f.value > 0).map((field) => (
                    <div key={field.id} className="prior-year-row">
                      <span className="prior-year-label">{field.label}</span>
                      <div className="prior-year-values">
                        <span className="prior-year-current">{formatValue(field.value)}</span>
                        <span className="prior-year-arrow">←</span>
                        <span className="prior-year-previous">{formatValue(typeof field.value === 'number' ? Math.round(field.value * 1.12) : field.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
