import React, { useState, useMemo } from 'react';
import type { AuditLogEntry, AuditActionCategory } from '../../types';
import { AuditLogEntryComponent } from './AuditLogEntry';
import './AuditLogPanel.css';

interface AuditLogPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entries: AuditLogEntry[];
  clientName?: string;
}

type FilterOption = 'all' | AuditActionCategory;

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All activity' },
  { value: 'document', label: 'Documents' },
  { value: 'return-data', label: 'Data changes' },
  { value: 'review', label: 'Review' },
  { value: 'status', label: 'Status changes' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'filing', label: 'Filing' },
  { value: 'version', label: 'Versions' },
];

function groupEntriesByDate(entries: AuditLogEntry[]): { label: string; entries: AuditLogEntry[] }[] {
  const groups: Map<string, AuditLogEntry[]> = new Map();

  for (const entry of entries) {
    const date = new Date(entry.timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let label: string;
    if (date.toDateString() === today.toDateString()) {
      label = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = 'Yesterday';
    } else {
      label = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }

    if (!groups.has(label)) {
      groups.set(label, []);
    }
    groups.get(label)!.push(entry);
  }

  return Array.from(groups.entries()).map(([label, entries]) => ({ label, entries }));
}

export const AuditLogPanel: React.FC<AuditLogPanelProps> = ({
  isOpen,
  onClose,
  entries,
  clientName,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filteredEntries = useMemo(() => {
    const sorted = [...entries].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    if (activeFilter === 'all') return sorted;
    return sorted.filter((e) => e.category === activeFilter);
  }, [entries, activeFilter]);

  const groupedEntries = useMemo(() => groupEntriesByDate(filteredEntries), [filteredEntries]);

  const activeFilterLabel = FILTER_OPTIONS.find((f) => f.value === activeFilter)?.label ?? 'All activity';

  return (
    <div className={`audit-log-overlay ${isOpen ? 'open' : ''}`}>
      <div className="audit-log-backdrop" onClick={onClose} />
      <div className={`audit-log-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="audit-log-header">
          <div className="audit-log-header-left">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="audit-log-header-icon">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="audit-log-header-text">
              <h2 className="audit-log-title">Activity log</h2>
              {clientName && <span className="audit-log-subtitle">{clientName}</span>}
            </div>
          </div>
          <button className="audit-log-close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Filter bar */}
        <div className="audit-log-filter-bar">
          <div className="audit-log-filter-wrapper">
            <button
              className="audit-log-filter-btn"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {activeFilterLabel}
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="audit-filter-chevron">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showFilterMenu && (
              <div className="audit-log-filter-menu">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`audit-log-filter-option ${activeFilter === option.value ? 'active' : ''}`}
                    onClick={() => {
                      setActiveFilter(option.value);
                      setShowFilterMenu(false);
                    }}
                  >
                    {activeFilter === option.value && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="audit-log-count">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {/* Timeline */}
        <div className="audit-log-body">
          {groupedEntries.length === 0 ? (
            <div className="audit-log-empty">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="#e0e0e0" strokeWidth="2"/>
                <path d="M20 12V20L25 25" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p>No activity to show</p>
              <span>Activity for this return will appear here</span>
            </div>
          ) : (
            groupedEntries.map((group) => (
              <div key={group.label} className="audit-log-group">
                <div className="audit-log-group-label">{group.label}</div>
                <div className="audit-log-group-entries">
                  {group.entries.map((entry) => (
                    <AuditLogEntryComponent
                      key={entry.id}
                      entry={entry}
                      onRestore={(e) => console.log('Restore:', e.id)}
                      onViewSnapshot={(e) => console.log('View snapshot:', e.id)}
                      onCompare={(e) => console.log('Compare:', e.id)}
                      onCopyLink={(e) => {
                        navigator.clipboard?.writeText(`${window.location.origin}/return/${e.returnId}?audit=${e.id}`);
                      }}
                      onAddLabel={(e) => console.log('Add label:', e.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
