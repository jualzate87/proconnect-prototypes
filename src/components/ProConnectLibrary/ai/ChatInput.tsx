import React, { useState, useRef, useEffect } from 'react';
import './ChatInput.css';
import { IconSend, IconSparkle } from '../icons/Icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  /** Suggested prompts to show above input */
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = 'Ask Intuit Assist...',
  disabled = false,
  loading = false,
  suggestions,
  onSuggestionClick,
  className = '',
}) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled && !loading) {
      onSend(trimmed);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [value]);

  return (
    <div className={`pc-chat-input ${className}`}>
      {suggestions && suggestions.length > 0 && (
        <div className="pc-chat-input__suggestions">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="pc-chat-input__suggestion"
              onClick={() => onSuggestionClick?.(suggestion)}
            >
              <IconSparkle size={12} color="var(--pc-color-ai-sparkle, #7C3AED)" />
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="pc-chat-input__field">
        <textarea
          ref={textareaRef}
          className="pc-chat-input__textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          rows={1}
        />
        <button
          className={`pc-chat-input__send ${value.trim() ? 'pc-chat-input__send--active' : ''}`}
          onClick={handleSend}
          disabled={!value.trim() || disabled || loading}
          aria-label="Send message"
        >
          {loading ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="30" strokeDashoffset="10" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.8s" repeatCount="indefinite" />
              </circle>
            </svg>
          ) : (
            <IconSend size={16} />
          )}
        </button>
      </div>

      <p className="pc-chat-input__disclaimer">
        Intuit Assist can make mistakes. Review important information.
      </p>
    </div>
  );
};
