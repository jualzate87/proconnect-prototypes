import React, { useState, useEffect } from 'react';
import { AgentThinking } from './AgentThinking';
import { ReviewProgressCard } from './ReviewProgressCard';
import { IssueCategoryList } from './IssueCategoryList';
import { DocumentSummary } from './DocumentSummary';
import { AgentChatInput } from './AgentChatInput';
import type { ReviewIssue, ReturnDocument } from '../../types';
import './AgentPanel.css';

interface AgentPanelProps {
  isOpen: boolean;
  issues: ReviewIssue[];
  documents?: ReturnDocument[];
  onIssueClick?: (issue: ReviewIssue) => void;
  onIssueCorrect?: (issueId: string, note?: string) => void;
  onIssueAction?: (issue: ReviewIssue, action: string) => void;
  onFieldHighlight?: (fieldIds: string[]) => void;
  onDocumentClick?: (documentId: string) => void;
  onClose?: () => void;
}

type AgentState = 'loading' | 'thinking' | 'report';

export const AgentPanel: React.FC<AgentPanelProps> = ({
  isOpen,
  issues,
  documents = [],
  onIssueClick,
  onIssueCorrect,
  onIssueAction,
  onFieldHighlight,
  onDocumentClick,
  onClose,
}) => {
  const [agentState, setAgentState] = useState<AgentState>('loading');
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAgentState('loading');
      return;
    }

    // Start thinking after a brief delay
    const thinkTimer = setTimeout(() => {
      setAgentState('thinking');
    }, 500);

    return () => clearTimeout(thinkTimer);
  }, [isOpen]);

  const handleThinkingComplete = () => {
    setAgentState('report');
  };

  return (
    <div className={`agent-panel ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="agent-panel-header">
        <button className="agent-panel-header-btn" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="agent-panel-title">
          <span className="agent-panel-title-text">Tax Prep Agent</span>
        </div>
        <div className="agent-panel-header-actions">
          <button className="agent-panel-header-btn" aria-label="New conversation">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15 1L9.5 6.5M1 17L3.5 8.5L14.5 1.5L11.5 14.5L3.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="agent-panel-header-btn" aria-label="Close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="agent-panel-content">
        {agentState === 'loading' && (
          <div className="agent-panel-loading">
            <div className="intuit-assist-sparkle">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L24 14L34 18L24 22L20 32L16 22L6 18L16 14L20 4Z" fill="#0077C5" opacity="0.8"/>
                <path d="M20 8L23 15L30 18L23 21L20 28L17 21L10 18L17 15L20 8Z" fill="#0077C5"/>
              </svg>
            </div>
          </div>
        )}

        {agentState === 'thinking' && (
          <AgentThinking onComplete={handleThinkingComplete} />
        )}

        {agentState === 'report' && (
          <div className="agent-panel-report">
            <button
              className="agent-panel-show-thinking"
              onClick={() => setShowThinking(!showThinking)}
            >
              Show thinking {showThinking ? '▲' : '▼'}
            </button>

            {showThinking && (
              <div className="agent-panel-thinking-recap">
                <AgentThinking isRecap />
              </div>
            )}

            <p className="agent-panel-report-intro">
              I've reviewed Jordan Wells' 2024 return. Here's a summary of the imported documents and the issues I found.
            </p>

            <DocumentSummary
              documents={documents}
              onDocumentClick={onDocumentClick}
            />

            <ReviewProgressCard issues={issues} />

            <IssueCategoryList
              issues={issues}
              onIssueClick={onIssueClick}
              onCategoryExpand={(fieldIds) => onFieldHighlight?.(fieldIds)}
              onIssueCorrect={onIssueCorrect}
              onIssueAction={onIssueAction}
            />

            {/* Feedback */}
            <div className="agent-panel-feedback">
              <button className="feedback-btn" aria-label="Thumbs up">👍</button>
              <button className="feedback-btn" aria-label="Thumbs down">👎</button>
              <button className="feedback-btn" aria-label="Copy">📋</button>
              <button className="feedback-btn" aria-label="Download">⬇</button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <AgentChatInput issues={issues} />
    </div>
  );
};
