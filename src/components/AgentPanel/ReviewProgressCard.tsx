import React, { useState, useEffect } from 'react';
import type { ReviewIssue, IssueCategory } from '../../types';
import './ReviewProgressCard.css';

interface ReviewProgressCardProps {
  issues: ReviewIssue[];
}

const categoryLabels: Record<IssueCategory, string> = {
  'yoy-analysis': 'Year-over-Year Analysis',
  'scan-quality': 'Scan Quality & Inputs',
  'irs-compliance': 'IRS Compliance',
  'credits-deductions': 'Credits & Deductions',
};

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

  // Group by category
  const categories = Object.keys(categoryLabels) as IssueCategory[];
  const categoryStats = categories
    .map((cat) => {
      const catIssues = issues.filter((i) => i.category === cat);
      const catCorrect = catIssues.filter((i) => i.status === 'correct' || i.status === 'resolved').length;
      return { category: cat, total: catIssues.length, correct: catCorrect };
    })
    .filter((s) => s.total > 0);

  return (
    <div className="review-progress-card">
      <div className="progress-card-header">
        <h3 className="progress-card-title">Review Progress</h3>
        <span className="progress-card-count">
          {openIssues > 0 ? (
            <><strong>{openIssues}</strong> {openIssues === 1 ? 'item' : 'items'} to review</>
          ) : (
            <span className="progress-complete-label">All items reviewed</span>
          )}
        </span>
      </div>

      {/* Main progress bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-track">
          <div
            className={`progress-bar-fill ${progressPercent === 100 ? 'complete' : ''}`}
            style={{ width: animate ? `${progressPercent}%` : '0%' }}
          />
        </div>
        <span className="progress-bar-label">{correctIssues} of {totalIssues}</span>
      </div>

      {/* Per-category breakdown */}
      <div className="progress-category-list">
        {categoryStats.map((stat) => (
          <div key={stat.category} className="progress-category-row">
            <span className="progress-category-name">{categoryLabels[stat.category]}</span>
            <span className="progress-category-count">
              {stat.correct}/{stat.total}
            </span>
            <div className="progress-category-bar-track">
              <div
                className={`progress-category-bar-fill ${stat.correct === stat.total ? 'complete' : ''}`}
                style={{
                  width: animate
                    ? `${stat.total > 0 ? (stat.correct / stat.total) * 100 : 0}%`
                    : '0%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
