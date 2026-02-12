import React from 'react';
import './ImportSuccess.css';

interface ImportSuccessProps {
  clientId: string;
}

export const ImportSuccess: React.FC<ImportSuccessProps> = ({ clientId }) => {
  const handleReviewReturn = () => {
    // Open in a NEW browser tab — completely separate context
    const reviewUrl = `${window.location.origin}${import.meta.env.BASE_URL}return/${clientId}/review`;
    window.open(reviewUrl, '_blank');
  };

  return (
    <div className="import-success">
      <div className="import-success-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" fill="#E6F9ED" stroke="#00A651" strokeWidth="3"/>
          <path
            d="M20 33L28 41L44 25"
            stroke="#00A651"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="import-success-title">The return is ready for review</h1>
      <p className="import-success-subtitle">
        Your review starts in a <strong>new tab</strong>, showing output forms first
      </p>
      <div className="import-success-progress">
        <div className="import-success-bar" />
      </div>
      <button className="import-success-btn" onClick={handleReviewReturn}>
        Review the return
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 3H3C2.44772 3 2 3.44772 2 4V13C2 13.5523 2.44772 14 3 14H12C12.5523 14 13 13.5523 13 13V10M9 2H14M14 2V7M14 2L7 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
