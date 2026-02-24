import React from 'react';
import type { ReviewIssue } from '../../types';
import './CalculationPopover.css';

interface CalculationPopoverProps {
  issue: ReviewIssue;
  position: { top: number; left: number };
  onClose: () => void;
}

export const CalculationPopover: React.FC<CalculationPopoverProps> = ({
  issue,
  position,
  onClose,
}) => {
  return (
    <>
      <div className="calc-popover-backdrop" onClick={onClose} />
      <div
        className="calc-popover"
        style={{ top: position.top, left: position.left }}
      >
        <div className="calc-popover-header">
          <div className="calc-popover-title-row">
            <span className="calc-popover-icon">🧮</span>
            <span className="calc-popover-title">{issue.title}</span>
          </div>
          <button className="calc-popover-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Explanation */}
        {issue.explanation && (
          <p className="calc-popover-explanation">{issue.explanation}</p>
        )}

        {/* Calculation steps */}
        {issue.calculations && issue.calculations.length > 0 && (
          <div className="calc-steps">
            <span className="calc-steps-title">Calculation Breakdown</span>
            {issue.calculations.map((step, idx) => (
              <div key={idx} className="calc-step">
                <span className="calc-step-label">{step.label}</span>
                <div className="calc-step-right">
                  {step.formula && (
                    <span className="calc-step-formula">{step.formula}</span>
                  )}
                  <span className="calc-step-result">{step.result}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Penalty breakdown */}
        {issue.estimatedPenalty && (
          <div className="calc-penalty">
            <span className="calc-penalty-header">Penalty Assessment</span>
            <div className="calc-penalty-amount">
              <span className="calc-penalty-value">${issue.estimatedPenalty.amount.toLocaleString()}</span>
              <span className="calc-penalty-label">estimated penalty</span>
            </div>
            <p className="calc-penalty-desc">{issue.estimatedPenalty.calculation}</p>

            {/* Safe harbor visualization */}
            {issue.estimatedPenalty.safeHarborThreshold && issue.estimatedPenalty.currentWithholding && (
              <div className="safe-harbor-viz">
                <span className="safe-harbor-title">Safe Harbor Threshold</span>
                <div className="safe-harbor-bar">
                  <div
                    className="safe-harbor-fill current"
                    style={{
                      width: `${Math.min(
                        (issue.estimatedPenalty.currentWithholding / issue.estimatedPenalty.safeHarborThreshold) * 100,
                        100
                      )}%`,
                    }}
                  />
                  <div className="safe-harbor-threshold-line" />
                </div>
                <div className="safe-harbor-labels">
                  <span className="safe-harbor-current">
                    Current: ${issue.estimatedPenalty.currentWithholding.toLocaleString()}
                  </span>
                  <span className="safe-harbor-target">
                    Required: ${issue.estimatedPenalty.safeHarborThreshold.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Q4 payment recommendation */}
            {issue.estimatedPenalty.quarterlyPayment && (
              <div className="calc-q4-rec">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#0077C5" strokeWidth="1.5"/>
                  <path d="M7 4V7.5M7 10H7.01" stroke="#0077C5" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>
                  Recommended Q4 estimated payment: <strong>${issue.estimatedPenalty.quarterlyPayment.toLocaleString()}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
