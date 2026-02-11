import React from 'react';
import './TypingIndicator.css';
import { Avatar } from '../ui/Avatar';

interface TypingIndicatorProps {
  /** Label shown next to dots */
  label?: string;
  /** Whether to show the AI avatar */
  showAvatar?: boolean;
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  label = 'Intuit Assist is thinking',
  showAvatar = true,
  className = '',
}) => {
  return (
    <div className={`pc-typing ${className}`}>
      {showAvatar && (
        <div className="pc-typing__avatar">
          <Avatar name="IA" variant="ai" size="sm" />
        </div>
      )}
      <div className="pc-typing__bubble">
        <div className="pc-typing__dots">
          <span className="pc-typing__dot" />
          <span className="pc-typing__dot" />
          <span className="pc-typing__dot" />
        </div>
        {label && <span className="pc-typing__label">{label}</span>}
      </div>
    </div>
  );
};
