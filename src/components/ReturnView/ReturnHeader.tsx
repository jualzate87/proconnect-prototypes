import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '../ProConnectLibrary/ui/Dropdown';
import type { DropdownItem } from '../ProConnectLibrary/ui/Dropdown';
import './ReturnHeader.css';

interface ReturnHeaderProps {
  clientName: string;
  taxYear: number;
  returnType: string;
  activeTab?: string;
  savedAt?: string;
  prepTime?: string;
  onAuditLogClick?: () => void;
}

const returnActionsSections = [
  {
    items: [
      { id: 'copy-return', label: 'Copy Return' },
      { id: 'rename-return', label: 'Rename Return' },
      { id: 'restrict-access', label: 'Restrict Access' },
      { id: 'lock-return', label: 'Lock Return' },
    ],
  },
  {
    items: [
      { id: 'collect-data', label: 'Collect Data - Intuit Link' },
      { id: 'esignature', label: 'eSignature' },
      { id: 'efile-letter', label: 'E-File Confirmation Letter' },
      { id: 'invoice', label: 'Invoice' },
      { id: 'invoice-qb', label: 'Invoice via QuickBooks' },
      { id: 'support-tools', label: 'Customer Support Tools' },
      { id: 'send-intuit', label: 'Send to Intuit' },
    ],
  },
  {
    items: [
      { id: 'audit-log', label: 'Audit log' },
    ],
  },
];

const workflowTabs = [
  { id: 'profile', label: 'Profile', icon: 'list' },
  { id: 'launch', label: 'Launch return', icon: 'rocket' },
  { id: 'input', label: 'Input return', icon: 'edit' },
  { id: 'check', label: 'Check return', icon: 'check' },
  { id: 'file', label: 'File return', icon: 'send' },
];

export const ReturnHeader: React.FC<ReturnHeaderProps> = ({
  clientName,
  taxYear,
  returnType,
  activeTab = 'launch',
  savedAt,
  prepTime,
  onAuditLogClick,
}) => {
  const navigate = useNavigate();

  const handleReturnAction = (item: DropdownItem) => {
    if (item.id === 'audit-log') {
      onAuditLogClick?.();
    }
  };

  return (
    <div className="return-header">
      <div className="return-header-top">
        <div className="return-header-left">
          <span className="return-header-firm">JOHNSON TAX</span>
        </div>
        <div className="return-header-right-actions">
          <button className="return-header-icon-btn" aria-label="Help">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 14V10M10 6H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Help</span>
          </button>
          <button className="return-header-icon-btn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M15 7C15 5.4 14.37 3.88 13.24 2.76C12.12 1.63 10.59 1 9 1C7.41 1 5.88 1.63 4.76 2.76C3.63 3.88 3 5.41 3 7C3 12 1 14 1 14H17C17 14 15 12 15 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Notifications</span>
          </button>
          <button className="return-header-icon-btn" aria-label="Settings">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 1V3M10 17V19M1 10H3M17 10H19M3.5 3.5L5 5M15 15L16.5 16.5M16.5 3.5L15 5M5 15L3.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Settings</span>
          </button>
          <div className="return-header-avatar">S</div>
        </div>
      </div>

      <div className="return-header-client-bar">
        <div className="return-header-client-info">
          <span className="return-header-client-name">{clientName}</span>
          <button className="return-header-lock-btn" aria-label="Lock">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="return-header-client-profile">Client profile</span>
          <div className="return-header-meta-divider" />
          <div className="return-header-meta">
            <span className="return-header-meta-label">Tax year</span>
            <span className="return-header-meta-value">{taxYear}</span>
          </div>
          <div className="return-header-meta">
            <span className="return-header-meta-label">Return type</span>
            <span className="return-header-meta-value">{returnType}</span>
          </div>
        </div>
        <div className="return-header-client-actions">
          <div className="return-header-assignee-dots">
            <span className="return-header-dot dot-purple">D</span>
            <span className="return-header-dot dot-green">H</span>
            <span className="return-header-dot dot-count">+1</span>
          </div>
          <button className="return-header-select-btn">Select Assignee ▾</button>
          <button className="return-header-select-btn">Select Status ▾</button>
          <button className="return-header-notes-btn">Notes</button>
          <Dropdown
            trigger={
              <button className="return-header-actions-btn">Return actions ▾</button>
            }
            sections={returnActionsSections}
            align="right"
            width={260}
            onItemClick={handleReturnAction}
          />
        </div>
      </div>

      <div className="return-header-tabs-bar">
        <div className="return-header-tabs">
          {workflowTabs.map((tab) => (
            <button
              key={tab.id}
              className={`return-header-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                if (tab.id === 'launch') {
                  // Already on launch
                }
              }}
            >
              <span className="return-tab-icon">
                {tab.id === 'profile' && '≡'}
                {tab.id === 'launch' && '◎'}
                {tab.id === 'input' && '✎'}
                {tab.id === 'check' && '☑'}
                {tab.id === 'file' && '▶'}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="return-header-tabs-right">
          {savedAt && (
            <span className="return-header-saved">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Saved at {savedAt}
            </span>
          )}
          {prepTime && (
            <span className="return-header-prep">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Prep time: {prepTime}
            </span>
          )}
          <button className="return-header-refresh-btn" onClick={() => navigate(0)}>
            Refresh forms
          </button>
        </div>
      </div>
    </div>
  );
};
