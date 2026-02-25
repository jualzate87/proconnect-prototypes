import React from 'react';
import './ReturnReviewHeader.css';

interface ReturnReviewHeaderProps {
  clientName: string;
  taxYear: number;
  returnType: string;
  onStartReview?: () => void;
  isReviewActive?: boolean;
}

export const ReturnReviewHeader: React.FC<ReturnReviewHeaderProps> = ({
  clientName,
  taxYear,
  returnType,
  onStartReview,
  isReviewActive = false,
}) => {
  return (
    <header className="review-header">
      <div className="review-header-left">
        <div className="review-header-client">
          <span className="review-header-name">{clientName}</span>
        </div>
        <div className="review-header-divider" />
        <div className="review-header-meta">
          <span className="review-header-meta-label">Tax year</span>
          <span className="review-header-meta-value">{taxYear}</span>
        </div>
        <div className="review-header-meta">
          <span className="review-header-meta-label">Return type</span>
          <span className="review-header-meta-value">{returnType}</span>
        </div>
      </div>
      <div className="review-header-right">
        {!isReviewActive && onStartReview && (
          <button className="review-header-start-btn" onClick={onStartReview}>
            <span className="assist-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7.5L18 10L12.5 12.5L10 18L7.5 12.5L2 10L7.5 7.5L10 2Z" fill="currentColor"/>
              </svg>
            </span>
            Start assisted review
          </button>
        )}
        <button className="review-header-refresh-btn">Refresh forms</button>
      </div>
    </header>
  );
};
