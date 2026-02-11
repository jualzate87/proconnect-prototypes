import React, { useRef, useEffect } from 'react';
import './ChatPanel.css';
import { IconClose, IconSparkle, IconMoreVertical } from '../icons/Icons';
import { Avatar } from '../ui/Avatar';

interface ChatPanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Panel title */
  title?: string;
  /** Subtitle / status text */
  subtitle?: string;
  /** Panel width override */
  width?: number;
  /** Whether to show as overlay or inline */
  mode?: 'overlay' | 'inline';
  /** The chat messages area */
  children: React.ReactNode;
  /** Input area rendered at bottom */
  footer?: React.ReactNode;
  /** Optional more menu handler */
  onMoreClick?: () => void;
  className?: string;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  isOpen,
  onClose,
  title = 'Intuit Assist',
  subtitle,
  width,
  mode = 'overlay',
  children,
  footer,
  onMoreClick,
  className = '',
}) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when children change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [children]);

  if (!isOpen) return null;

  return (
    <>
      {mode === 'overlay' && <div className="pc-chat-panel__scrim" onClick={onClose} />}
      <aside
        className={`pc-chat-panel pc-chat-panel--${mode} ${className}`}
        style={width ? { width } : undefined}
      >
        {/* Header */}
        <div className="pc-chat-panel__header">
          <div className="pc-chat-panel__header-left">
            <Avatar name="IA" variant="ai" size="sm" />
            <div className="pc-chat-panel__header-text">
              <h3 className="pc-chat-panel__title">
                <IconSparkle size={14} color="var(--pc-color-ai-sparkle, #7C3AED)" />
                {title}
              </h3>
              {subtitle && <p className="pc-chat-panel__subtitle">{subtitle}</p>}
            </div>
          </div>
          <div className="pc-chat-panel__header-actions">
            {onMoreClick && (
              <button className="pc-chat-panel__header-btn" onClick={onMoreClick} aria-label="More options">
                <IconMoreVertical size={16} />
              </button>
            )}
            <button className="pc-chat-panel__header-btn" onClick={onClose} aria-label="Close">
              <IconClose size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="pc-chat-panel__messages" ref={messagesRef}>
          {children}
        </div>

        {/* Footer / Input */}
        {footer && (
          <div className="pc-chat-panel__footer">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};
