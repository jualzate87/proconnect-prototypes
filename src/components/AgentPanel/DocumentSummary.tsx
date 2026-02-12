import React, { useState } from 'react';
import type { ReturnDocument } from '../../types';
import './DocumentSummary.css';

interface DocumentSummaryProps {
  documents: ReturnDocument[];
  onDocumentClick?: (documentId: string) => void;
}

const docTypeIcons: Record<string, string> = {
  'W-2': '📄',
  '1099-DIV': '📊',
  '1099-INT': '🏦',
  'K-1': '📋',
  '1099-MISC': '📑',
  '1099-NEC': '📑',
  '1099-R': '🏛️',
  'other': '📎',
};

const getConfidenceClass = (confidence: number | undefined | null): string => {
  if (confidence === undefined || confidence === null) return '';
  if (confidence >= 90) return 'high';
  if (confidence >= 75) return 'medium';
  return 'low';
};

export const DocumentSummary: React.FC<DocumentSummaryProps> = ({
  documents,
  onDocumentClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const importedDocs = documents.filter((d) => d.importStatus === 'imported' || d.importStatus === 'ready');

  return (
    <div className={`doc-summary-category ${isExpanded ? 'expanded' : ''}`}>
      <button
        className="doc-summary-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="doc-summary-icon">📂</span>
        <span className="doc-summary-label">Imported Documents</span>
        <span className="doc-summary-count">{importedDocs.length}</span>
        <span className={`doc-summary-chevron ${isExpanded ? 'rotated' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {isExpanded && (
        <div className="doc-summary-body">
          {/* Callout banner */}
          <div className="doc-summary-callout">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="callout-icon">
              <circle cx="8" cy="8" r="7" stroke="#0077C5" strokeWidth="1.5"/>
              <path d="M8 5V8.5M8 11H8.01" stroke="#0077C5" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="callout-text">
              To make corrections, open the source document and edit the extracted values. Changes will automatically recalculate the 1040.
            </span>
          </div>

          {/* Document list */}
          <div className="doc-summary-list">
            {importedDocs.map((doc) => (
              <button
                key={doc.id}
                className="doc-summary-item"
                onClick={() => onDocumentClick?.(doc.id)}
              >
                <span className="doc-item-icon">
                  {docTypeIcons[doc.type] || docTypeIcons['other']}
                </span>
                <div className="doc-item-info">
                  <span className="doc-item-name">{doc.name}</span>
                  <span className="doc-item-meta">
                    {doc.type}
                    {doc.pages ? ` · ${doc.pages} ${doc.pages === 1 ? 'page' : 'pages'}` : ''}
                  </span>
                </div>
                {doc.ocrConfidence !== undefined && doc.ocrConfidence !== null && (
                  <span className={`doc-item-confidence ${getConfidenceClass(doc.ocrConfidence)}`}>
                    {doc.ocrConfidence}%
                  </span>
                )}
                <span className="doc-item-action">
                  View
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
