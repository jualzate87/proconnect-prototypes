import React, { useState } from 'react';
import type { Form1040Field, IssueCategory } from '../../types';
import './Form1040Viewer.css';

interface Form1040ViewerProps {
  fields: Form1040Field[];
  clientName: string;
  ssn: string;
  address: string;
  cityStateZip: string;
  filingStatus: string;
  onFieldClick?: (field: Form1040Field) => void;
  onFieldPersonalReview?: (fieldId: string) => void;
  highlightedFieldIds?: string[];
  activeFieldId?: string | null;
  expandedCategory?: IssueCategory | null;
}

const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') return value;
  return value.toLocaleString('en-US');
};

const getChangeClass = (changePercent: number): string => {
  const abs = Math.abs(changePercent);
  if (abs >= 20) return 'change-severe';
  if (abs >= 10) return 'change-moderate';
  return 'change-minor';
};

export const Form1040Viewer: React.FC<Form1040ViewerProps> = ({
  fields,
  clientName,
  ssn,
  address,
  cityStateZip,
  onFieldClick,
  onFieldPersonalReview,
  highlightedFieldIds = [],
  activeFieldId,
  expandedCategory,
}) => {
  const [hoveredFieldId, setHoveredFieldId] = useState<string | null>(null);
  const getField = (id: string) => fields.find((f) => f.id === id);

  const renderFieldValue = (field: Form1040Field | undefined) => {
    if (!field) return null;
    const isHighlighted = highlightedFieldIds.includes(field.id) || field.isHighlighted;
    const isActive = activeFieldId === field.id;
    const hasChange = field.changePercent && Math.abs(field.changePercent) >= 5;
    const isHovered = hoveredFieldId === field.id;
    const isPersonallyReviewed = field.personalReview;
    const isCorrected = field.reviewStatus === 'corrected';

    return (
      <span
        className={`form-field-value ${isHighlighted ? 'highlighted' : ''} ${isActive ? 'active' : ''} ${isCorrected ? 'corrected' : ''} ${isPersonallyReviewed ? 'personally-reviewed' : ''}`}
        data-field-id={field.id}
        onClick={() => {
          if (field.sources && field.sources.length > 0 && onFieldClick) {
            onFieldClick(field);
          }
        }}
        onMouseEnter={() => setHoveredFieldId(field.id)}
        onMouseLeave={() => setHoveredFieldId(null)}
        role={field.sources && field.sources.length > 0 ? 'button' : undefined}
        tabIndex={field.sources && field.sources.length > 0 ? 0 : undefined}
      >
        {formatCurrency(field.currentValue)}
        {/* Personal review checkmark */}
        {isPersonallyReviewed && (
          <span className="field-personal-check" title="Reviewed">✓</span>
        )}
        {isCorrected && (
          <span className="field-corrected-badge" title="Edited">✎</span>
        )}
        {/* Hover review button */}
        {isHovered && !isPersonallyReviewed && !isCorrected && (
          <button
            className="field-review-hover-btn"
            title="Mark as reviewed"
            onClick={(e) => {
              e.stopPropagation();
              onFieldPersonalReview?.(field.id);
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {hasChange && expandedCategory === 'yoy-analysis' && (
          <span className={`field-change-badge ${field.changePercent! > 0 ? 'positive' : 'negative'} ${getChangeClass(field.changePercent!)}`}>
            {field.changePercent! > 0 ? '+' : ''}{field.changePercent}%
          </span>
        )}
      </span>
    );
  };

  return (
    <div className="form-1040-viewer">
      <div className="form-1040-container">
        {/* Form Header */}
        <div className="form-1040-header-section">
          <div className="form-1040-top-row">
            <div className="form-number-block">
              <span className="form-label-small">Form</span>
              <span className="form-number">1040</span>
            </div>
            <div className="form-title-block">
              <span className="form-dept">Department of the Treasury — Internal Revenue Service</span>
              <span className="form-title-main">U.S. Individual Income Tax Return</span>
            </div>
            <div className="form-year-block">
              <span className="form-year">2024</span>
            </div>
            <div className="form-omb-block">
              <span className="form-omb">OMB No. 1545-0074</span>
            </div>
            <div className="form-irs-block">
              <span className="form-irs-label">IRS Use Only — Do not write or staple in this space.</span>
            </div>
          </div>

          {/* Personal Info */}
          <div className="form-personal-section">
            <div className="form-row">
              <div className="form-cell flex-2">
                <span className="form-label-tiny">Your first name and middle initial</span>
                <span className="form-value-filled">{clientName.split(' ')[0]}</span>
              </div>
              <div className="form-cell flex-2">
                <span className="form-label-tiny">Last name</span>
                <span className="form-value-filled">{clientName.split(' ').slice(1).join(' ')}</span>
              </div>
              <div className="form-cell flex-1">
                <span className="form-label-tiny">Your social security number</span>
                <span className="form-value-filled">{ssn}</span>
              </div>
            </div>
            <div className="form-row">
              <div className="form-cell flex-3">
                <span className="form-label-tiny">Home address (number and street). If you have a P.O. box, see instructions.</span>
                <span className="form-value-filled address">{address}</span>
              </div>
              <div className="form-cell flex-1">
                <span className="form-label-tiny">Apt. no.</span>
              </div>
            </div>
            <div className="form-row">
              <div className="form-cell flex-3">
                <span className="form-label-tiny">City, town or post office. If you have a foreign address, also complete spaces below.</span>
                <span className="form-value-filled address">{cityStateZip}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filing Status */}
        <div className="form-section">
          <div className="form-section-header">
            <span className="section-title">Filing Status</span>
          </div>
          <div className="filing-status-options">
            <label className="filing-option">
              <input type="checkbox" checked readOnly /> Single
            </label>
            <label className="filing-option">
              <input type="checkbox" readOnly /> Married filing jointly (even if only one had income)
            </label>
            <label className="filing-option">
              <input type="checkbox" readOnly /> Head of household (HOH)
            </label>
          </div>
        </div>

        {/* Income Section */}
        <div className="form-section">
          <div className="form-section-header">
            <span className="section-title">Income</span>
          </div>
          <div className="form-lines">
            <div className="form-line">
              <span className="line-number">1a</span>
              <span className="line-description">Total amount from Form(s) W-2, box 1 (see instructions)</span>
              <span className="line-ref">1a</span>
              {renderFieldValue(getField('line-1a'))}
            </div>
            <div className="form-line">
              <span className="line-number">1b</span>
              <span className="line-description">Household employee wages not reported on Form(s) W-2</span>
              <span className="line-ref">1b</span>
              <span className="form-field-value empty"></span>
            </div>
            <div className="form-line sub-line">
              <span className="line-number">1c</span>
              <span className="line-description">Tip income not reported on line 1a (see instructions)</span>
              <span className="line-ref">1c</span>
              <span className="form-field-value empty"></span>
            </div>
            <div className="form-line sub-line">
              <span className="line-number">1d</span>
              <span className="line-description">Medicaid waiver payments not reported on Form(s) W-2 (see instructions)</span>
              <span className="line-ref">1d</span>
              <span className="form-field-value empty"></span>
            </div>
            <div className="form-line total-line">
              <span className="line-number">1z</span>
              <span className="line-description">Add lines 1a through 1h</span>
              <span className="line-ref">1z</span>
              {renderFieldValue(getField('line-1z'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line">
              <span className="line-number">2a</span>
              <span className="line-description">Tax-exempt interest</span>
              <span className="line-ref">2a</span>
              <span className="form-field-value empty"></span>
            </div>
            <div className="form-line">
              <span className="line-number">2b</span>
              <span className="line-description">Taxable interest</span>
              <span className="line-ref">2b</span>
              {renderFieldValue(getField('line-2b'))}
            </div>
            <div className="form-line">
              <span className="line-number">3a</span>
              <span className="line-description">Qualified dividends</span>
              <span className="line-ref">3a</span>
              {renderFieldValue(getField('line-3a'))}
            </div>
            <div className="form-line">
              <span className="line-number">3b</span>
              <span className="line-description">Ordinary dividends</span>
              <span className="line-ref">3b</span>
              {renderFieldValue(getField('line-3b'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line">
              <span className="line-number">7</span>
              <span className="line-description">Capital gain or (loss). Attach Schedule D if required. If not required, check here</span>
              <span className="line-ref">7</span>
              {renderFieldValue(getField('line-7'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line total-line major">
              <span className="line-number">9</span>
              <span className="line-description">Total income. Add lines 1z, 2b, 3b, 4b, 5b, 6b, 7, and 8</span>
              <span className="line-ref">9</span>
              {renderFieldValue(getField('line-9'))}
            </div>

            <div className="form-line total-line major">
              <span className="line-number">11</span>
              <span className="line-description">Adjusted gross income</span>
              <span className="line-ref">11</span>
              {renderFieldValue(getField('line-11'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line">
              <span className="line-number">12</span>
              <span className="line-description">Standard deduction or itemized deductions (from Schedule A)</span>
              <span className="line-ref">12</span>
              {renderFieldValue(getField('line-12'))}
            </div>

            <div className="form-line total-line major">
              <span className="line-number">15</span>
              <span className="line-description">Taxable income</span>
              <span className="line-ref">15</span>
              {renderFieldValue(getField('line-15'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line total-line">
              <span className="line-number">16</span>
              <span className="line-description">Tax (see instructions)</span>
              <span className="line-ref">16</span>
              {renderFieldValue(getField('line-16'))}
            </div>

            <div className="form-line total-line major">
              <span className="line-number">24</span>
              <span className="line-description">Total tax</span>
              <span className="line-ref">24</span>
              {renderFieldValue(getField('line-24'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line">
              <span className="line-number">25a</span>
              <span className="line-description">Federal income tax withheld from Form(s) W-2</span>
              <span className="line-ref">25a</span>
              {renderFieldValue(getField('line-25a'))}
            </div>

            <div className="form-line total-line">
              <span className="line-number">33</span>
              <span className="line-description">Total payments</span>
              <span className="line-ref">33</span>
              {renderFieldValue(getField('line-33'))}
            </div>

            <div className="form-line-separator" />

            <div className="form-line total-line major amount-owe">
              <span className="line-number">37</span>
              <span className="line-description">Amount you owe. Subtract line 33 from line 24</span>
              <span className="line-ref">37</span>
              {renderFieldValue(getField('line-37'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
