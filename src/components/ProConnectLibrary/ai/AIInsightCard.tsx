import React from 'react';
import './AIInsightCard.css';
import { IconSparkle } from '../icons/Icons';

interface AIInsightCardProps {
  /** Insight title */
  title: string;
  /** Insight content/description */
  description: string;
  /** Type of insight for visual styling */
  type?: 'suggestion' | 'alert' | 'info' | 'action';
  /** Icon override */
  icon?: React.ReactNode;
  /** Primary action */
  primaryAction?: { label: string; onClick: () => void };
  /** Secondary action */
  secondaryAction?: { label: string; onClick: () => void };
  /** Dismiss handler */
  onDismiss?: () => void;
  /** Whether the card is compact */
  compact?: boolean;
  className?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  description,
  type = 'suggestion',
  icon,
  primaryAction,
  secondaryAction,
  onDismiss,
  compact = false,
  className = '',
}) => {
  return (
    <div className={`pc-ai-insight pc-ai-insight--${type} ${compact ? 'pc-ai-insight--compact' : ''} ${className}`}>
      <div className="pc-ai-insight__header">
        <span className="pc-ai-insight__icon">
          {icon || <IconSparkle size={16} />}
        </span>
        <span className="pc-ai-insight__badge">AI</span>
        {onDismiss && (
          <button className="pc-ai-insight__dismiss" onClick={onDismiss} aria-label="Dismiss">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="pc-ai-insight__body">
        <h4 className="pc-ai-insight__title">{title}</h4>
        <p className="pc-ai-insight__description">{description}</p>
      </div>

      {(primaryAction || secondaryAction) && (
        <div className="pc-ai-insight__actions">
          {primaryAction && (
            <button className="pc-ai-insight__action pc-ai-insight__action--primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button className="pc-ai-insight__action pc-ai-insight__action--secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
