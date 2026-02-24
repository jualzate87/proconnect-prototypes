import React, { useState } from 'react';
import type { ReviewIssue } from '../../types';
import { IconSend, IconAttach } from '../ProConnectLibrary';
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
        <h3 className="suggestion-chips-header">Suggested questions</h3>
        <div className="suggestion-chips-scroll">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="suggestion-chip"
              onClick={() => handleSend(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="agent-chat-input-wrapper">
        <button className="chat-input-add-btn" aria-label="Add attachment">
          <IconAttach size={18} />
        </button>
        <input
          type="text"
          className="chat-input-field"
          placeholder="Ask Intuit Assist..."
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
          <IconSend size={18} />
        </button>
      </div>
      <p className="agent-chat-disclaimer">
        Intuit Assist can make mistakes. Review important information.
      </p>
    </div>
  );
};
