import React, { useState, useEffect } from 'react';
import { ReturnHeader } from './ReturnHeader';
import { ReturnUtilityRail } from './ReturnUtilityRail';
import { DocumentImportProgress } from './DocumentImportProgress';
import { ImportSuccess } from './ImportSuccess';
import { AuditLogPanel } from '../AuditLog/AuditLogPanel';
import returnData from '../../data/jordanWellsReturn.json';
import auditLogData from '../../data/auditLog.json';
import type { ReturnDocument, AuditLogEntry } from '../../types';
import './LaunchReturn.css';

type ImportState = 'idle' | 'importing' | 'success';

export const LaunchReturn: React.FC = () => {
  const [importState, setImportState] = useState<ImportState>('idle');
  const [documents, setDocuments] = useState<ReturnDocument[]>(
    returnData.documents as ReturnDocument[]
  );
  const [importingIndex, setImportingIndex] = useState(-1);
  const [auditLogOpen, setAuditLogOpen] = useState(false);

  const readyDocs = documents.filter(
    (d) => d.importStatus === 'ready' || d.importStatus === 'imported'
  );
  const importableDocs = documents.filter(
    (d) => d.type !== 'K-1' && d.importStatus !== 'imported'
  );

  const handleStartImport = () => {
    setImportState('importing');
    setImportingIndex(0);
  };

  useEffect(() => {
    if (importState !== 'importing' || importingIndex < 0) return;

    if (importingIndex >= importableDocs.length) {
      // All done
      setTimeout(() => {
        setImportState('success');
      }, 600);
      return;
    }

    const timer = setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === importableDocs[importingIndex].id
            ? { ...doc, importStatus: 'imported' as const }
            : doc
        )
      );
      setImportingIndex((i) => i + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [importState, importingIndex, importableDocs]);

  if (importState === 'success') {
    return (
      <div className="launch-return-page">
        <ReturnHeader
          clientName={returnData.clientName}
          taxYear={returnData.taxYear}
          returnType={returnData.returnType}
          activeTab="launch"
          savedAt={returnData.savedAt}
          prepTime={returnData.prepTime}
          onAuditLogClick={() => setAuditLogOpen(true)}
        />
        <div className="launch-return-body">
          <div className="launch-return-content">
            <ImportSuccess clientId={returnData.clientId} />
          </div>
          <ReturnUtilityRail />
        </div>
        <AuditLogPanel
          isOpen={auditLogOpen}
          onClose={() => setAuditLogOpen(false)}
          entries={auditLogData as AuditLogEntry[]}
          clientName={returnData.clientName}
        />
      </div>
    );
  }

  return (
    <div className="launch-return-page">
      <ReturnHeader
        clientName={returnData.clientName}
        taxYear={returnData.taxYear}
        returnType={returnData.returnType}
        activeTab="launch"
        savedAt={returnData.savedAt}
        prepTime={returnData.prepTime}
        onAuditLogClick={() => setAuditLogOpen(true)}
      />
      <div className="launch-return-body">
        <div className="launch-return-content">
          <div className="launch-return-hero">
            <h1 className="launch-return-title">You're making progress</h1>
            <p className="launch-return-subtitle">
              When you're ready, select documents to import. We'll import them and take you to review your return.
            </p>
          </div>

          {/* Upload Area */}
          <div className="launch-return-upload-area">
            <div className="upload-drop-label">Drop files here or click to upload</div>
            <div className="upload-options">
              <button className="upload-option">
                <span className="upload-option-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 16V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V16M16 8L12 4M12 4L8 8M12 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Upload from this device</span>
              </button>
              <button className="upload-option">
                <span className="upload-option-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 12H8M16 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>Get from cloud apps</span>
              </button>
            </div>
          </div>

          {/* Import Progress (when importing) */}
          {importState === 'importing' && (
            <DocumentImportProgress
              documents={documents}
              importingIndex={importingIndex}
              totalImportable={importableDocs.length}
            />
          )}

          {/* Document Checklist */}
          <div className="launch-return-checklist">
            <div className="checklist-header">
              <div className="checklist-title-row">
                <h2 className="checklist-title">TY 2024 Document Checklist</h2>
                <span className="checklist-badge">SENT</span>
              </div>
              <button className="checklist-toggle">Show less ▲</button>
            </div>

            <p className="checklist-instructions">
              You can use the <strong>Import Hub on the right panel</strong> for specialized forms like K-1s, Schedule D, and Depreciation.{' '}
              <a href="#" className="checklist-link">See all ways to import data</a>
            </p>

            <div className="checklist-tabs">
              <button className="checklist-tab active">
                Received <span className="checklist-tab-count">{readyDocs.length}</span>
              </button>
              <button className="checklist-tab">
                Needed <span className="checklist-tab-count">0</span>
              </button>
            </div>

            <table className="checklist-table">
              <thead>
                <tr>
                  <th style={{ width: 40 }}></th>
                  <th>Name ⇅</th>
                  <th>Import status</th>
                  <th>Type ⇅</th>
                  <th>Updated ⇅</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={doc.type !== 'K-1'}
                        readOnly
                        className="checklist-checkbox"
                      />
                    </td>
                    <td>
                      <span className="checklist-doc-name">{doc.name}</span>
                    </td>
                    <td>
                      <span className={`checklist-status ${doc.importStatus}`}>
                        {doc.importStatus === 'ready' && (
                          <>
                            <span className="status-icon ready">⊙</span>
                            Ready to import
                          </>
                        )}
                        {doc.importStatus === 'importing' && (
                          <>
                            <span className="status-icon importing">⟳</span>
                            Importing...
                          </>
                        )}
                        {doc.importStatus === 'imported' && (
                          <>
                            <span className="status-icon imported">✓</span>
                            Imported
                          </>
                        )}
                        {doc.type === 'K-1' && doc.importStatus === 'ready' && (
                          <span style={{ color: 'var(--color-text-tertiary)' }}>
                            Apply via Import Hub
                          </span>
                        )}
                      </span>
                    </td>
                    <td>
                      <span className="checklist-type-select">
                        {doc.type} ▾
                      </span>
                    </td>
                    <td className="checklist-date">{doc.uploadDate}</td>
                    <td>
                      <button className="checklist-more-btn" aria-label="More options">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="checklist-footer">
              <button className="checklist-edit-btn">Edit request</button>
              <button
                className="checklist-import-btn"
                onClick={handleStartImport}
                disabled={importState === 'importing'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 5V11M5 8H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Import ready documents
              </button>
            </div>
          </div>
        </div>
        <ReturnUtilityRail />
      </div>
      <AuditLogPanel
        isOpen={auditLogOpen}
        onClose={() => setAuditLogOpen(false)}
        entries={auditLogData as AuditLogEntry[]}
        clientName={returnData.clientName}
      />
    </div>
  );
};
