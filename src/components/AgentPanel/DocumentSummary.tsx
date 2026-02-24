import React, { useState } from 'react';
import type { ReturnDocument } from '../../types';
import { Tooltip, IconInfo } from '../ProConnectLibrary';
import './DocumentSummary.css';

const CONFIDENCE_TOOLTIP = 'OCR confidence indicates how accurately the document was scanned and extracted. Lower values may need manual verification.';

interface DocumentSummaryProps {
  documents: ReturnDocument[];
  onDocumentClick?: (documentId: string) => void;
  onDocumentReview?: (documentId: string, reviewed: boolean) => void;
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
  onDocumentReview,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredDocId, setHoveredDocId] = useState<string | null>(null);

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
          {/* Column header with confidence label + tooltip */}
          {importedDocs.some((d) => d.ocrConfidence != null) && (
            <div className="doc-summary-list-header">
              <span className="doc-summary-header-doc">Document</span>
              <Tooltip content={CONFIDENCE_TOOLTIP} position="top">
                <span className="doc-summary-header-confidence">
                  Confidence
                  <IconInfo size={12} color="#64748b" className="doc-summary-confidence-info" />
                </span>
              </Tooltip>
            </div>
          )}
          <div className="doc-summary-list">
            {importedDocs.map((doc) => {
              const isReviewed = !!doc.reviewedBy;
              const isHovered = hoveredDocId === doc.id;
              return (
                <div
                  key={doc.id}
                  className="doc-summary-item-row"
                  onMouseEnter={() => setHoveredDocId(doc.id)}
                  onMouseLeave={() => setHoveredDocId(null)}
                >
                  <button
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
                      {doc.reviewedBy && (
                        <span className="doc-item-reviewed">Reviewed by {doc.reviewedBy}</span>
                      )}
                    </div>
                    {doc.ocrConfidence !== undefined && doc.ocrConfidence !== null && (
                      <span className={`doc-item-confidence ${getConfidenceClass(doc.ocrConfidence)}`}>
                        {doc.ocrConfidence}%
                      </span>
                    )}
                    {isReviewed && (
                      <button
                        type="button"
                        className="doc-item-reviewed-check"
                        title="Reviewed — click to clear"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDocumentReview?.(doc.id, false);
                        }}
                        aria-label={`Clear reviewed status for ${doc.name}`}
                      >
                        ✓
                      </button>
                    )}
                    {isHovered && !isReviewed && (
                      <button
                        type="button"
                        className="doc-item-review-btn"
                        title="Mark as reviewed"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDocumentReview?.(doc.id, true);
                        }}
                        aria-label={`Mark ${doc.name} as reviewed`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                    <span className="doc-item-action">
                      View
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
