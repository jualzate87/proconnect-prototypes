import React, { useState } from 'react';
import type { ReviewIssue } from '../../types';
import './AgentChatInput.css';

interface AgentChatInputProps {
  issues?: ReviewIssue[];
  onSendMessage?: (message: string) => void;
}

const defaultSuggestions = [
  'What are the biggest risks in this return?',
  'Explain the income drop year over year',
  'Is the withholding sufficient?',
  'Are there any missing documents?',
  'Show me the tax calculation breakdown',
  'What should I prioritize reviewing first?',
];

const getContextualSuggestions = (issues: ReviewIssue[]): string[] => {
  const suggestions: string[] = [];
  const openIssues = issues.filter((i) => i.status === 'open');

  const hasYoy = openIssues.some((i) => i.category === 'yoy-analysis');
  const hasScan = openIssues.some((i) => i.category === 'scan-quality');
  const hasCompliance = openIssues.some((i) => i.category === 'irs-compliance');

  if (hasYoy) suggestions.push('Why did the wages drop this year?');
  if (hasScan) suggestions.push('Which fields have low scan confidence?');
  if (hasCompliance) suggestions.push('How is the underpayment penalty calculated?');

  suggestions.push('What should I review next?');
  suggestions.push('Compare withholding to last year');

  const hasMissing = openIssues.some((i) => i.missingDocuments && i.missingDocuments.length > 0);
  if (hasMissing) suggestions.push('What documents are we missing?');

  return suggestions.slice(0, 6);
};

export const AgentChatInput: React.FC<AgentChatInputProps> = ({
  issues = [],
  onSendMessage,
}) => {
  const [message, setMessage] = useState('');

  const suggestions = issues.length > 0 ? getContextualSuggestions(issues) : defaultSuggestions;

  const handleSend = (text?: string) => {
    const toSend = text || message;
    if (toSend.trim()) {
      onSendMessage?.(toSend);
      setMessage('');
    }
  };

  return (
    <div className="agent-chat-input-container">
      {/* Suggestion chips */}
      <div className="suggestion-chips-container">
        <div className="suggestion-chips-scroll">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="suggestion-chip"
              onClick={() => handleSend(suggestion)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="chip-sparkle">
                <path d="M6 1L7 4L10 5L7 6L6 9L5 6L2 5L5 4L6 1Z" fill="currentColor"/>
              </svg>
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="agent-chat-input-wrapper">
        <button className="chat-input-add-btn" aria-label="Add attachment">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <input
          type="text"
          className="chat-input-field"
          placeholder="Ask anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button
          className={`chat-input-send-btn ${message.trim() ? 'active' : ''}`}
          onClick={() => handleSend()}
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M16 2L8 10M16 2L11 16L8 10M16 2L2 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <p className="agent-chat-disclaimer">
        <a href="#" className="disclaimer-link">Important information about how we use generative AI</a>
      </p>
    </div>
  );
};
