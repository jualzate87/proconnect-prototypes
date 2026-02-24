import React, { useState, useLayoutEffect } from 'react';
import type { ReviewIssue, IssueCategory, Form1040Field } from '../../types';
import { IconGraph, IconSearch, IconSecurity, IconDocument, IconCalc, IconChevronRight, IconCircleAlertFill } from '../ProConnectLibrary';
import './IssueCategoryList.css';

interface IssueCategoryListProps {
  issues: ReviewIssue[];
  fields?: Form1040Field[];
  preparerName?: string;
  onIssueClick?: (issue: ReviewIssue) => void;
  onCategoryExpand?: (fieldIds: string[]) => void;
  onExpandedCategoryChange?: (category: IssueCategory | null) => void;
  onIssueCorrect?: (issueId: string, note?: string) => void;
  onIssueAction?: (issue: ReviewIssue, action: string) => void;
}

/** Returns YoY-style change class for card stroke. No blue. */
function getIssueChangeClass(issue: ReviewIssue, fields: Form1040Field[]): 'change-severe' | 'change-moderate' | 'change-minor' | 'change-subtle' {
  if (issue.category === 'yoy-analysis' && issue.affectedFields.length > 0) {
    const maxAbs = issue.affectedFields.reduce((max, fid) => {
      const f = fields.find((x) => x.id === fid);
      const pct = f?.changePercent;
      if (pct == null) return max;
      return Math.max(max, Math.abs(pct));
    }, 0);
    if (maxAbs >= 20) return 'change-severe';
    if (maxAbs >= 10) return 'change-moderate';
    if (maxAbs >= 5) return 'change-minor';
    return 'change-subtle';
  }
  // Scan / IRS: map severity to orange scale (no blue)
  if (issue.severity === 'high') return 'change-severe';
  if (issue.severity === 'medium') return 'change-moderate';
  return 'change-minor';
}

const categoryConfig: Record<IssueCategory, { label: string; Icon: React.ComponentType<{ size?: number; color?: string }> }> = {
  'yoy-analysis': { label: 'YoY Analysis', Icon: IconGraph },
  'scan-quality': { label: 'Scan Quality & Inputs', Icon: IconSearch },
  'irs-compliance': { label: 'IRS Compliance', Icon: IconSecurity },
};

const getActionConfig = (category: IssueCategory, issue?: ReviewIssue) => {
  if (issue?.preferredAction && issue?.preferredActionLabel) {
    return {
      label: issue.preferredActionLabel,
      Icon: IconDocument,
      action: issue.preferredAction,
    };
  }
  switch (category) {
    case 'yoy-analysis':
      return { label: 'View sources', Icon: IconDocument, action: 'view-sources' };
    case 'scan-quality':
      return { label: 'View document', Icon: IconSearch, action: 'view-document' };
    case 'irs-compliance':
      return { label: 'View calculation', Icon: IconCalc, action: 'view-calculation' };
  }
};

const DEFAULT_PREPARER = 'Sonia Miller';

export const IssueCategoryList: React.FC<IssueCategoryListProps> = ({
  issues,
  fields = [],
  preparerName = DEFAULT_PREPARER,
  onIssueClick,
  onCategoryExpand,
  onExpandedCategoryChange,
  onIssueCorrect,
  onIssueAction,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<IssueCategory | null>(null);
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);
  const [confirmingCorrectId, setConfirmingCorrectId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  // Auto-populate note when confirm opens (useLayoutEffect runs before paint so input shows value immediately)
  useLayoutEffect(() => {
    if (confirmingCorrectId) {
      setResolutionNote(`Reviewed by ${preparerName}`);
    }
  }, [confirmingCorrectId, preparerName]);

  const categories = Object.keys(categoryConfig) as IssueCategory[];

  const handleToggle = (category: IssueCategory) => {
    const isExpanding = expandedCategory !== category;
    const newCategory = isExpanding ? category : null;
    setExpandedCategory(newCategory);
    setExpandedIssueId(null);

    // Only highlight fields when a specific card is expanded, not when category opens
    onCategoryExpand?.([]);
    onExpandedCategoryChange?.(newCategory);
  };

  const handleIssueExpand = (issue: ReviewIssue, e: React.MouseEvent) => {
    e.stopPropagation();
    const isExpanding = expandedIssueId !== issue.id;
    setExpandedIssueId(isExpanding ? issue.id : null);
    if (isExpanding) {
      onIssueClick?.(issue);
      onCategoryExpand?.(issue.affectedFields ?? []);
    } else {
      onCategoryExpand?.([]);
    }
  };

  return (
    <div className="issue-category-list">
      {categories.map((category) => {
        const config = categoryConfig[category];
        const categoryIssues = issues.filter((i) => i.category === category);
        const openCount = categoryIssues.filter((i) => i.status === 'open').length;
        const isExpanded = expandedCategory === category;

        if (categoryIssues.length === 0) return null;

        return (
          <div key={category} className={`issue-category ${isExpanded ? 'expanded' : ''}`}>
            <button
              className="issue-category-header"
              onClick={() => handleToggle(category)}
            >
              <span className="issue-category-icon">
                {React.createElement(config.Icon, { size: 16, color: '#64748b' })}
              </span>
              <span className="issue-category-label">{config.label}</span>
              {openCount > 0 && (
                <span className="issue-category-badge">{openCount}</span>
              )}
              {openCount === 0 && categoryIssues.length > 0 && (
                <span className="issue-category-badge-complete">✓</span>
              )}
              <span className={`issue-category-chevron ${isExpanded ? 'rotated' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            {isExpanded && (
              <div className="issue-category-body">
                {categoryIssues.map((issue) => {
                  const isIssueExpanded = expandedIssueId === issue.id;
                  const actionConfig = getActionConfig(category, issue);
                  const isCorrect = issue.status === 'correct' || issue.status === 'resolved';

                  return (
                    <div
                      key={issue.id}
                      className={`issue-card ${getIssueChangeClass(issue, fields)} ${isIssueExpanded ? 'issue-expanded' : ''} ${isCorrect ? 'issue-correct' : ''}`}
                      onClick={(e) => handleIssueExpand(issue, e)}
                    >
                      {/* Card header */}
                      <div className="issue-card-header">
                        <div className="issue-card-title-row">
                          <span className={`issue-severity-dot ${getIssueChangeClass(issue, fields)}`} />
                          <span className="issue-card-title">{issue.title}</span>
                        </div>
                        {isCorrect && (
                          <span className="issue-card-correct-badge">✓ Correct</span>
                        )}
                      </div>

                      {/* Description (collapsed) or explanation (expanded) */}
                      <p className="issue-card-description">
                        {isIssueExpanded && issue.explanation ? issue.explanation : issue.description}
                      </p>

                      {/* Tax impact — single line compact */}
                      {issue.estimatedTaxImpact && (
                        <div className="issue-tax-impact-inline">
                          <IconCircleAlertFill size={14} color="#92400e" />
                          <span>Tax impact: {issue.estimatedTaxImpact}</span>
                        </div>
                      )}

                      {/* Expanded details */}
                      {isIssueExpanded && (
                        <div className="issue-card-details">
                          {/* Root cause */}
                          {issue.rootCause && (
                            <div className="issue-detail-section">
                              <span className="issue-detail-label">Root cause</span>
                              <p className="issue-detail-text">{issue.rootCause}</p>
                            </div>
                          )}

                          {/* Missing documents */}
                          {issue.missingDocuments && issue.missingDocuments.length > 0 && (
                            <div className="issue-detail-section missing-docs">
                              <span className="issue-detail-label">Missing documents</span>
                              {issue.missingDocuments.map((doc, idx) => (
                                <div key={idx} className="missing-doc-item">
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 1V13M1 7H13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" transform="rotate(45 7 7)"/>
                                  </svg>
                                  <span>{doc}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Structured details */}
                          {issue.details && issue.details.length > 0 && (
                            <div className="issue-detail-section">
                              <span className="issue-detail-label">Details</span>
                              <div className="issue-detail-table">
                                {issue.details.map((detail, idx) => (
                                  <div key={idx} className="issue-detail-row">
                                    <span className="detail-row-label">{detail.label}</span>
                                    <span className="detail-row-value">{detail.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Penalty breakdown */}
                          {issue.estimatedPenalty && (
                            <div className="issue-detail-section penalty-section">
                              <span className="issue-detail-label">Penalty breakdown</span>
                              <div className="penalty-amount">
                                <span className="penalty-value">${issue.estimatedPenalty.amount.toLocaleString()}</span>
                                <span className="penalty-desc">estimated penalty</span>
                              </div>
                              <p className="penalty-calculation">{issue.estimatedPenalty.calculation}</p>
                              {issue.estimatedPenalty.quarterlyPayment && (
                                <div className="penalty-quarterly">
                                  Recommended Q4 payment: <strong>${issue.estimatedPenalty.quarterlyPayment.toLocaleString()}</strong>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Suggested action */}
                          <div className="issue-detail-section">
                            <span className="issue-detail-label">Suggested action</span>
                            <p className="issue-detail-text suggestion">{issue.suggestedAction}</p>
                          </div>

                          {/* Why it matters (collapsible) */}
                          {issue.whyItMatters && (
                            <details className="issue-why-matters">
                              <summary>Why this matters</summary>
                              <p>{issue.whyItMatters}</p>
                            </details>
                          )}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="issue-card-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className={`issue-action-btn see-details ${isIssueExpanded ? 'active' : ''}`}
                          onClick={(e) => { e.stopPropagation(); handleIssueExpand(issue, e); }}
                          aria-label={isIssueExpanded ? 'Hide details' : 'See details'}
                        >
                          {isIssueExpanded ? 'Hide details' : 'See details'}
                          <span className={`issue-card-expand-icon ${isIssueExpanded ? 'expanded' : ''}`}>
                            <IconChevronRight size={14} />
                          </span>
                        </button>
                        <button
                          className="issue-action-btn contextual"
                          onClick={() => onIssueAction?.(issue, actionConfig.action)}
                        >
                          <span className="action-icon">
                            {React.createElement(actionConfig.Icon, { size: 14, color: '#475569' })}
                          </span>
                          {actionConfig.label}
                        </button>

                        {!isCorrect ? (
                          confirmingCorrectId === issue.id ? (
                            <div className="mark-correct-confirm">
                              <input
                                type="text"
                                className="resolution-note-input"
                                placeholder="Add a note (optional)..."
                                value={resolutionNote}
                                onChange={(e) => setResolutionNote(e.target.value)}
                                autoFocus
                              />
                              <button
                                className="confirm-correct-btn"
                                onClick={() => {
                                  onIssueCorrect?.(issue.id, resolutionNote || undefined);
                                  setConfirmingCorrectId(null);
                                  setResolutionNote('');
                                }}
                              >
                                ✓ Confirm
                              </button>
                              <button
                                className="cancel-correct-btn"
                                onClick={() => {
                                  setConfirmingCorrectId(null);
                                  setResolutionNote('');
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              className="issue-action-btn mark-correct"
                              onClick={() => {
                                setResolutionNote(`Reviewed by ${preparerName}`);
                                setConfirmingCorrectId(issue.id);
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Mark as correct
                            </button>
                          )
                        ) : (
                          <span className="issue-correct-label">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Correct
                            {issue.resolutionNote && (
                              <span className="resolution-note-display" title={issue.resolutionNote}>
                                — {issue.resolutionNote}
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
