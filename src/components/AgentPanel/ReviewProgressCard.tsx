import React, { useState, useEffect } from 'react';
import type { ReviewIssue } from '../../types';
import './ReviewProgressCard.css';

interface ReviewProgressCardProps {
  issues: ReviewIssue[];
}

export const ReviewProgressCard: React.FC<ReviewProgressCardProps> = ({ issues }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const totalIssues = issues.length;
  const correctIssues = issues.filter((i) => i.status === 'correct' || i.status === 'resolved').length;
  const openIssues = totalIssues - correctIssues;
  const progressPercent = totalIssues > 0 ? Math.round((correctIssues / totalIssues) * 100) : 0;

  return (
    <div className="review-progress-card">
      <div className="progress-card-header">
        <div className="progress-card-title-row">
          <h3 className="progress-card-title">Items to Review</h3>
          <span className="progress-card-count">
            {openIssues > 0 ? (
              <><strong>{openIssues}</strong> {openIssues === 1 ? 'item' : 'items'} remaining</>
            ) : (
              <span className="progress-complete-label">All items reviewed</span>
            )}
          </span>
        </div>
        <p className="progress-card-intro">
          Track issues that need your review and address. Expand a category below to see details.
        </p>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill ${progressPercent === 100 ? 'complete' : ''}`}
            style={{ width: animate ? `${progressPercent}%` : '0%' }}
          />
        </div>
        <span className="progress-bar-label">{correctIssues} of {totalIssues}</span>
      </div>
    </div>
  );
};
