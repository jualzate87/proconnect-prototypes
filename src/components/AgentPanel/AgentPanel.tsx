import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgentThinking } from './AgentThinking';
import { ReviewProgressCard } from './ReviewProgressCard';
import { IssueCategoryList } from './IssueCategoryList';
import { DocumentSummary } from './DocumentSummary';
import { AgentChatInput } from './AgentChatInput';
import { Avatar, IconIntuitAssist, IconClose, IconMenu, ChatMessage, TypingIndicator, IconChevronUp, IconChevronDown } from '../ProConnectLibrary';
import type { ReviewIssue, ReturnDocument, IssueCategory } from '../../types';
import type { ChatMessageData } from '../ProConnectLibrary';
import './AgentPanel.css';

const THINKING_DELAY_MS = 1800;
const CHAT_HEIGHT_MIN = 80;
const CHAT_HEIGHT_MAX = 400;
const CHAT_HEIGHT_DEFAULT = 200;
const CHAT_HEIGHT_KEY = 'agent-chat-height';
const CHAT_MINIMIZED_KEY = 'agent-chat-minimized';

const getAgentResponse = (question: string, issues: ReviewIssue[]): string => {
  const q = question.toLowerCase();
  const openIssues = issues.filter((i) => i.status === 'open');

  if (q.includes('wage') || q.includes('income drop') || q.includes('year over year') || q.includes('yoy')) {
    const yoy = openIssues.find((i) => i.category === 'yoy-analysis' && i.affectedFields?.some((f) => f.includes('line-1')));
    if (yoy) {
      return `${yoy.explanation}\n\n${yoy.suggestedAction}`;
    }
    return "I've identified a significant year-over-year income variance. The Bing Equipment W-2 dropped by about $22k compared to last year. I recommend verifying the wages amount against the source document, as the scan confidence is 72%.";
  }
  if (q.includes('scan') || q.includes('confidence') || q.includes('ocr')) {
    const scan = openIssues.find((i) => i.category === 'scan-quality');
    if (scan) {
      return `${scan.explanation}\n\n${scan.suggestedAction}`;
    }
    return "Several documents have lower OCR confidence. The W2-Bing document is at 72% confidence for wages. I recommend opening the source document to verify the extracted values against the image.";
  }
  if (q.includes('withhold') || q.includes('sufficient')) {
    return "Based on the return data, withholding appears generally sufficient. The total federal withholding is $10,000. I've flagged the W2-Bing wages for verification due to low scan confidence—if the wages amount changes, withholding may need adjustment.";
  }
  if (q.includes('missing') || q.includes('document')) {
    const missing = openIssues.find((i) => i.missingDocuments && i.missingDocuments.length > 0);
    if (missing?.missingDocuments) {
      return `The following documents may be missing:\n\n• ${missing.missingDocuments.join('\n• ')}\n\n${missing.suggestedAction}`;
    }
    return "I've flagged a potential missing 1099-INT from Chase Bank that was present last year. Contact the client to confirm if the account was closed or if the document hasn't been uploaded yet.";
  }
  if (q.includes('priorit') || q.includes('review next') || q.includes('first')) {
    const high = openIssues.filter((i) => i.severity === 'high');
    if (high.length > 0) {
      const first = high[0];
      return `I recommend reviewing "${first.title}" first. ${first.explanation}\n\n${first.suggestedAction}`;
    }
    return "Start with the highest-severity issues: the income drop and the potential missing Chase Bank 1099-INT. Both could affect the accuracy of the return.";
  }
  if (q.includes('risk') || q.includes('biggest')) {
    const high = openIssues.filter((i) => i.severity === 'high');
    const titles = high.map((i) => `• ${i.title}`).join('\n');
    return `The main risks in this return:\n\n${titles}\n\nI recommend addressing these before filing.`;
  }
  if (q.includes('penalty') || q.includes('underpayment')) {
    return "The underpayment penalty is calculated based on the amount of tax owed vs. amounts paid through withholding and estimated taxes. If you underpaid during the year, the IRS may assess a penalty. Check Form 2210 for the specific calculation.";
  }
  if (q.includes('compare') && q.includes('withhold')) {
    return "Prior year withholding was higher due to the larger wages amount. This year's total withholding ($10,000) reflects the reduced W-2 wages. If the Bing wages are corrected upward, you may need to review estimated tax payments.";
  }
  if (q.includes('breakdown') || q.includes('calculation')) {
    return "The tax calculation flows from wages and other income through deductions to taxable income, then applies the tax tables. Key lines: Line 1a (wages), Line 11 (AGI), and the standard deduction. I've flagged variances in wages that could affect the final number.";
  }

  return "I'm analyzing your return. Based on the imported documents and issues I've found, I recommend reviewing the year-over-year income variance and the potential missing Chase Bank 1099-INT first. Let me know if you'd like more detail on any specific area.";
};

interface AgentPanelProps {
  isOpen: boolean;
  width?: number;
  isResizing?: boolean;
  issues: ReviewIssue[];
  documents?: ReturnDocument[];
  onIssueClick?: (issue: ReviewIssue) => void;
  onIssueCorrect?: (issueId: string, note?: string) => void;
  onIssueAction?: (issue: ReviewIssue, action: string) => void;
  onFieldHighlight?: (fieldIds: string[]) => void;
  onExpandedCategoryChange?: (category: IssueCategory | null) => void;
  onDocumentClick?: (documentId: string) => void;
  onDocumentReview?: (documentId: string, reviewed: boolean) => void;
  fields?: import('../../types').Form1040Field[];
  onClose?: () => void;
}

type AgentState = 'loading' | 'thinking' | 'report';

export const AgentPanel: React.FC<AgentPanelProps> = ({
  isOpen,
  width,
  isResizing = false,
  issues,
  documents = [],
  onIssueClick,
  onIssueCorrect,
  onIssueAction,
  onFieldHighlight,
  onExpandedCategoryChange,
  onDocumentClick,
  onDocumentReview,
  fields = [],
  onClose,
}) => {
  const [agentState, setAgentState] = useState<AgentState>('loading');
  const [showThinking, setShowThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageData[]>([]);
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [chatHeight, setChatHeight] = useState(() => {
    try {
      const stored = localStorage.getItem(CHAT_HEIGHT_KEY);
      if (stored) {
        const n = parseInt(stored, 10);
        if (!isNaN(n) && n >= CHAT_HEIGHT_MIN && n <= CHAT_HEIGHT_MAX) return n;
      }
    } catch {
      /* ignore */
    }
    return CHAT_HEIGHT_DEFAULT;
  });
  const [chatMinimized, setChatMinimized] = useState(() => {
    try {
      const stored = localStorage.getItem(CHAT_MINIMIZED_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });
  const [isChatResizing, setIsChatResizing] = useState(false);
  const chatResizeStartRef = useRef({ startY: 0, startHeight: 0 });
  const lastChatHeightRef = useRef(chatHeight);

  useEffect(() => {
    lastChatHeightRef.current = chatHeight;
  }, [chatHeight]);

  const handleChatResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    chatResizeStartRef.current = { startY: e.clientY, startHeight: chatHeight };
    setIsChatResizing(true);
  }, [chatHeight]);

  useEffect(() => {
    if (!isChatResizing) return;
    const handleMove = (e: MouseEvent) => {
      const { startY, startHeight } = chatResizeStartRef.current;
      const delta = e.clientY - startY;
      const newHeight = Math.max(
        CHAT_HEIGHT_MIN,
        Math.min(CHAT_HEIGHT_MAX, startHeight + delta)
      );
      lastChatHeightRef.current = newHeight;
      setChatHeight(newHeight);
    };
    const handleUp = () => {
      setIsChatResizing(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      try {
        localStorage.setItem(CHAT_HEIGHT_KEY, String(lastChatHeightRef.current));
      } catch {
        /* ignore */
      }
    };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'row-resize';
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isChatResizing]);

  const handleChatMinimizeToggle = useCallback(() => {
    setChatMinimized((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(CHAT_MINIMIZED_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessageData = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsAgentThinking(true);

    setTimeout(() => {
      const response = getAgentResponse(text, issues);
      const blocks = response
        .split(/\n\n+/)
        .map((p) => ({ type: 'text' as const, content: p.trim() }))
        .filter((b) => b.content);
      const assistantMsg: ChatMessageData = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        blocks: blocks.length > 0 ? blocks : undefined,
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
      setIsAgentThinking(false);
    }, THINKING_DELAY_MS);
  };

  useEffect(() => {
    if (chatMessages.length > 0 || isAgentThinking) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAgentThinking]);

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

  const effectiveWidth = width ?? 384;
  const panelClass = [
    'agent-panel',
    isOpen && 'open',
    isResizing && 'agent-panel--resizing',
    isChatResizing && 'agent-panel--chat-resizing',
  ]
    .filter(Boolean)
    .join(' ');

  const chatMessageCount = chatMessages.length + (isAgentThinking ? 1 : 0);

  return (
    <div
      className={panelClass}
      style={
        isOpen
          ? { width: effectiveWidth, minWidth: effectiveWidth }
          : undefined
      }
    >
      {/* Header — Intuit Assist branding */}
      <div className="agent-panel-header">
        <div className="agent-panel-header-left">
          <Avatar name="IA" variant="ai" size="sm" />
          <div className="agent-panel-title">
            <IconIntuitAssist size={14} color="var(--ai-color-sparkle, #7C3AED)" className="agent-panel-sparkle" />
            <span className="agent-panel-title-text">Intuit Assist</span>
          </div>
        </div>
        <div className="agent-panel-header-actions">
          <button className="agent-panel-header-btn" aria-label="Menu">
            <IconMenu size={18} />
          </button>
          <button className="agent-panel-header-btn" aria-label="Close" onClick={onClose}>
            <IconClose size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="agent-panel-content">
        {agentState === 'loading' && (
          <div className="agent-panel-loading">
            <div className="intuit-assist-sparkle">
              <IconIntuitAssist size={40} color="var(--ai-color-sparkle, #7C3AED)" />
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
              onDocumentReview={onDocumentReview}
            />

            <div className="agent-panel-corrections-callout">
              <span className="corrections-callout-icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5V8.5M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="corrections-callout-text">
                To make corrections, open the source document and edit the extracted values. Changes will automatically recalculate the 1040.
              </span>
            </div>

            <ReviewProgressCard issues={issues} />

            <IssueCategoryList
              issues={issues}
              fields={fields}
              onIssueClick={onIssueClick}
              onCategoryExpand={(fieldIds) => onFieldHighlight?.(fieldIds)}
              onExpandedCategoryChange={onExpandedCategoryChange}
              onIssueCorrect={onIssueCorrect}
              onIssueAction={onIssueAction}
            />
          </div>
        )}
      </div>

      {/* Chat thread — appears when user sends a message */}
      {(chatMessages.length > 0 || isAgentThinking) && (
        <div
          className={`agent-chat-thread ${chatMinimized ? 'agent-chat-thread--minimized' : ''}`}
          style={!chatMinimized ? { height: chatHeight } : undefined}
        >
          {!chatMinimized && (
            <div
              className="agent-chat-resize-handle"
              onMouseDown={handleChatResizeStart}
              title="Drag to resize chat"
              aria-label="Resize chat — drag up or down"
            >
              <span className="agent-chat-resize-gripper" aria-hidden />
            </div>
          )}
          <button
            type="button"
            className="agent-chat-minimize-header"
            onClick={handleChatMinimizeToggle}
            aria-expanded={!chatMinimized}
            aria-label={chatMinimized ? 'Expand chat' : 'Minimize chat'}
            title={chatMinimized ? 'Expand chat' : 'Minimize chat'}
          >
            <span className="agent-chat-minimize-label">
              Chat ({chatMessageCount} {chatMessageCount === 1 ? 'message' : 'messages'})
            </span>
            {chatMinimized ? (
              <IconChevronUp size={16} className="agent-chat-chevron" />
            ) : (
              <IconChevronDown size={16} className="agent-chat-chevron" />
            )}
          </button>
          {!chatMinimized && (
            <div className="agent-chat-thread-inner">
              {chatMessages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} showFeedback={false} />
              ))}
              {isAgentThinking && (
                <TypingIndicator label="Intuit Assist is thinking" showAvatar />
              )}
              <div ref={chatEndRef} aria-hidden />
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <AgentChatInput issues={issues} onSendMessage={handleSendMessage} />
    </div>
  );
};
