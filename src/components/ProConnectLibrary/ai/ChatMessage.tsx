import React from 'react';
import './ChatMessage.css';
import { Avatar } from '../ui/Avatar';
import { IconThumbsUp, IconThumbsDown, IconCopy, IconRefresh } from '../icons/Icons';

export interface ChatMessageData {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  status?: 'sending' | 'sent' | 'error';
  /** For assistant messages: structured content blocks */
  blocks?: ChatContentBlock[];
}

export interface ChatContentBlock {
  type: 'text' | 'code' | 'list' | 'table' | 'action';
  content: string;
  language?: string;
  items?: string[];
  actionLabel?: string;
  onAction?: () => void;
}

interface ChatMessageProps {
  message: ChatMessageData;
  /** User name for avatar */
  userName?: string;
  /** Show feedback controls (thumbs up/down) */
  showFeedback?: boolean;
  onFeedback?: (messageId: string, type: 'up' | 'down') => void;
  onCopy?: (messageId: string) => void;
  onRetry?: (messageId: string) => void;
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  userName,
  showFeedback = true,
  onFeedback,
  onCopy,
  onRetry,
  className = '',
}) => {
  const isAssistant = message.role === 'assistant';

  const renderBlocks = (blocks: ChatContentBlock[]) => {
    return blocks.map((block, idx) => {
      switch (block.type) {
        case 'code':
          return (
            <div key={idx} className="pc-chat-msg__code-block">
              {block.language && (
                <div className="pc-chat-msg__code-header">
                  <span className="pc-chat-msg__code-lang">{block.language}</span>
                  <button
                    className="pc-chat-msg__code-copy"
                    onClick={() => navigator.clipboard.writeText(block.content)}
                    aria-label="Copy code"
                  >
                    <IconCopy size={12} />
                  </button>
                </div>
              )}
              <pre className="pc-chat-msg__code"><code>{block.content}</code></pre>
            </div>
          );
        case 'list':
          return (
            <ul key={idx} className="pc-chat-msg__list">
              {block.items?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          );
        case 'action':
          return (
            <button key={idx} className="pc-chat-msg__action-btn" onClick={block.onAction}>
              {block.actionLabel || block.content}
            </button>
          );
        default:
          return <p key={idx} className="pc-chat-msg__text">{block.content}</p>;
      }
    });
  };

  return (
    <div className={`pc-chat-msg pc-chat-msg--${message.role} ${className}`}>
      <div className="pc-chat-msg__avatar">
        {isAssistant ? (
          <Avatar name="IA" variant="ai" size="sm" />
        ) : (
          <Avatar name={userName} size="sm" />
        )}
      </div>

      <div className="pc-chat-msg__body">
        <div className="pc-chat-msg__bubble">
          {message.blocks && message.blocks.length > 0 ? (
            renderBlocks(message.blocks)
          ) : (
            <p className="pc-chat-msg__text">{message.content}</p>
          )}
        </div>

        {/* Metadata row */}
        <div className="pc-chat-msg__meta">
          {message.timestamp && (
            <span className="pc-chat-msg__time">{message.timestamp}</span>
          )}
          {message.status === 'error' && (
            <span className="pc-chat-msg__error">Failed to send</span>
          )}
        </div>

        {/* Actions for assistant messages — only render when at least one action is provided */}
        {isAssistant && (onCopy || onRetry || (showFeedback && onFeedback)) && (
          <div className="pc-chat-msg__actions">
            {onCopy && (
              <button
                className="pc-chat-msg__action"
                onClick={() => onCopy(message.id)}
                aria-label="Copy"
              >
                <IconCopy size={14} />
              </button>
            )}
            {onRetry && (
              <button
                className="pc-chat-msg__action"
                onClick={() => onRetry(message.id)}
                aria-label="Regenerate"
              >
                <IconRefresh size={14} />
              </button>
            )}
            {showFeedback && onFeedback && (
              <>
                <button
                  className="pc-chat-msg__action"
                  onClick={() => onFeedback(message.id, 'up')}
                  aria-label="Thumbs up"
                >
                  <IconThumbsUp size={14} />
                </button>
                <button
                  className="pc-chat-msg__action"
                  onClick={() => onFeedback(message.id, 'down')}
                  aria-label="Thumbs down"
                >
                  <IconThumbsDown size={14} />
                </button>
              </>
            )}
          </div>
        )}

        {/* Retry for failed user messages */}
        {!isAssistant && message.status === 'error' && onRetry && (
          <button className="pc-chat-msg__retry" onClick={() => onRetry(message.id)}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};
