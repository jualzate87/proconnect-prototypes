import React, { useState, useRef, useEffect } from 'react';
import type { AuditLogEntry as AuditLogEntryType } from '../../types';
import './AuditLogEntry.css';

interface AuditLogEntryProps {
  entry: AuditLogEntryType;
  onRestore?: (entry: AuditLogEntryType) => void;
  onViewSnapshot?: (entry: AuditLogEntryType) => void;
  onCompare?: (entry: AuditLogEntryType) => void;
  onCopyLink?: (entry: AuditLogEntryType) => void;
  onAddLabel?: (entry: AuditLogEntryType) => void;
}

const getActionIcon = (action: AuditLogEntryType['action']): React.ReactNode => {
  switch (action) {
    case 'document_uploaded':
    case 'document_replaced':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 1V11M8 1L4 5M8 1L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 11V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'document_deleted':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 4H13M6 4V3C6 2.45 6.45 2 7 2H9C9.55 2 10 2.45 10 3V4M5 4V13C5 13.55 5.45 14 6 14H10C10.55 14 11 13.55 11 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'document_imported':
    case 'bulk_import_completed':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 11V1M8 11L4 7M8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 11V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'field_value_changed':
    case 'field_value_restored':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 1.5L14.5 4.5L5.5 13.5H2.5V10.5L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'review_started':
    case 'review_completed':
    case 'field_marked_reviewed':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'issue_flagged':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L14.93 13H1.07L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6V9M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'issue_resolved':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'status_changed':
    case 'return_locked':
    case 'return_unlocked':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'assignee_changed':
    case 'return_shared':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M1 14C1 11.24 3.24 9 6 9C8.76 9 11 11.24 11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 5L13 7L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'comment_added':
    case 'comment_resolved':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 2H14V11H5L2 14V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'return_efiled':
    case 'efile_accepted':
    case 'efile_rejected':
    case 'return_printed':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 4L8 8L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
    case 'version_saved':
    case 'version_restored':
    case 'version_compared':
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 3V7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.5 10A5.5 5.5 0 1 0 4.9 5.4L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
  }
};

const getCategoryColor = (category: AuditLogEntryType['category']): string => {
  switch (category) {
    case 'document': return '#0077C5';
    case 'return-data': return '#7B61FF';
    case 'review': return '#FF9800';
    case 'status': return '#00A651';
    case 'collaboration': return '#E91E63';
    case 'filing': return '#009688';
    case 'version': return '#5C6BC0';
    default: return '#8C8C8C';
  }
};

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export const AuditLogEntryComponent: React.FC<AuditLogEntryProps> = ({
  entry,
  onRestore,
  onViewSnapshot,
  onCompare,
  onCopyLink,
  onAddLabel,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  const categoryColor = getCategoryColor(entry.category);
  const isVersionable = ['field_value_changed', 'version_saved', 'bulk_import_completed', 'document_replaced', 'field_value_restored'].includes(entry.action);

  return (
    <div className="audit-entry">
      <div className="audit-entry-timeline">
        <div className="audit-entry-icon" style={{ color: categoryColor, borderColor: categoryColor }}>
          {getActionIcon(entry.action)}
        </div>
        <div className="audit-entry-line" />
      </div>

      <div className="audit-entry-content">
        <div className="audit-entry-header">
          <div className="audit-entry-user">
            <span className="audit-entry-avatar" style={{ backgroundColor: entry.user.color }}>
              {entry.user.initials}
            </span>
            <span className="audit-entry-user-name">{entry.user.name}</span>
          </div>
          <div className="audit-entry-meta">
            <span className="audit-entry-time" title={new Date(entry.timestamp).toLocaleString()}>
              {formatRelativeTime(entry.timestamp)}
            </span>
            <div className="audit-entry-overflow-wrapper" ref={menuRef}>
              <button
                className="audit-entry-overflow-btn"
                onClick={() => setShowMenu(!showMenu)}
                aria-label="More actions"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="4" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
                </svg>
              </button>
              {showMenu && (
                <div className="audit-entry-menu">
                  {isVersionable && (
                    <button
                      className="audit-entry-menu-item"
                      onClick={() => { onRestore?.(entry); setShowMenu(false); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3V7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 10A5.5 5.5 0 1 0 4.9 5.4L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Restore to this version
                    </button>
                  )}
                  <button
                    className="audit-entry-menu-item"
                    onClick={() => { onViewSnapshot?.(entry); setShowMenu(false); }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M1 8C3 4 5 2 8 2C11 2 13 4 15 8C13 12 11 14 8 14C5 14 3 12 1 8Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    View snapshot
                  </button>
                  {isVersionable && (
                    <button
                      className="audit-entry-menu-item"
                      onClick={() => { onCompare?.(entry); setShowMenu(false); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2V14M2 5H6M10 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      Compare with current
                    </button>
                  )}
                  <div className="audit-entry-menu-divider" />
                  <button
                    className="audit-entry-menu-item"
                    onClick={() => { onCopyLink?.(entry); setShowMenu(false); }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6.5 9.5L9.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M9 10L11 8C12.1 6.9 12.1 5.1 11 4L12 3C10.9 1.9 9.1 1.9 8 3L6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M7 6L5 8C3.9 9.1 3.9 10.9 5 12C6.1 13.1 7.9 13.1 9 12L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Copy link to entry
                  </button>
                  {isVersionable && (
                    <button
                      className="audit-entry-menu-item"
                      onClick={() => { onAddLabel?.(entry); setShowMenu(false); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 3H9L14 8L9 13H2V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="5" cy="8" r="1" fill="currentColor"/>
                      </svg>
                      Add a label
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="audit-entry-description">{entry.description}</p>
        <span className="audit-entry-timestamp">{formatTime(entry.timestamp)}</span>

        {entry.details && (
          <div className="audit-entry-details">
            {entry.details.oldValue !== undefined && entry.details.newValue !== undefined && (
              <div className="audit-entry-diff">
                <span className="audit-diff-old">
                  {typeof entry.details.oldValue === 'number'
                    ? `$${entry.details.oldValue.toLocaleString()}`
                    : entry.details.oldValue}
                </span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="audit-diff-new">
                  {typeof entry.details.newValue === 'number'
                    ? `$${entry.details.newValue.toLocaleString()}`
                    : entry.details.newValue}
                </span>
              </div>
            )}
            {entry.details.versionLabel && (
              <span className="audit-entry-version-label">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3H9L14 8L9 13H2V3Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {entry.details.versionLabel}
              </span>
            )}
            {entry.details.score !== undefined && (
              <span className="audit-entry-score">
                Score: {entry.details.score}/100
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
