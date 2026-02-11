import React from 'react';
import './PromptSuggestions.css';
import { IconSparkle } from '../icons/Icons';

export interface PromptSuggestion {
  id: string;
  text: string;
  icon?: React.ReactNode;
  description?: string;
  category?: string;
}

interface PromptSuggestionsProps {
  title?: string;
  suggestions: PromptSuggestion[];
  onSelect: (suggestion: PromptSuggestion) => void;
  layout?: 'list' | 'grid';
  className?: string;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  title = 'Suggested prompts',
  suggestions,
  onSelect,
  layout = 'list',
  className = '',
}) => {
  return (
    <div className={`pc-prompt-suggestions pc-prompt-suggestions--${layout} ${className}`}>
      {title && <h4 className="pc-prompt-suggestions__title">{title}</h4>}
      <div className="pc-prompt-suggestions__list">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            className="pc-prompt-suggestion"
            onClick={() => onSelect(suggestion)}
          >
            <span className="pc-prompt-suggestion__icon">
              {suggestion.icon || <IconSparkle size={16} color="var(--pc-color-ai-sparkle, #7C3AED)" />}
            </span>
            <div className="pc-prompt-suggestion__content">
              <span className="pc-prompt-suggestion__text">{suggestion.text}</span>
              {suggestion.description && (
                <span className="pc-prompt-suggestion__desc">{suggestion.description}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
