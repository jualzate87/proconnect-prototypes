import React from 'react';
import type { ReturnDocument } from '../../types';
import './DocumentImportProgress.css';

interface DocumentImportProgressProps {
  documents: ReturnDocument[];
  importingIndex: number;
  totalImportable: number;
}

export const DocumentImportProgress: React.FC<DocumentImportProgressProps> = ({
  documents,
  importingIndex,
  totalImportable,
}) => {
  const importedCount = documents.filter((d) => d.importStatus === 'imported').length;
  const progressPercent = totalImportable > 0 ? (importedCount / totalImportable) * 100 : 0;
  const importableDocs = documents.filter((d) => d.type !== 'K-1');
  const currentDoc = importableDocs[importingIndex];

  return (
    <div className="import-progress">
      <div className="import-progress-header">
        <span className="import-progress-title">Document Readiness</span>
        <span className="import-progress-count">
          {importedCount}/{totalImportable}
        </span>
      </div>
      <div className="import-progress-bar-track">
        <div
          className="import-progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      {currentDoc && (
        <p className="import-progress-current">
          Importing <strong>{currentDoc.name}</strong>...
        </p>
      )}
      {!currentDoc && importedCount >= totalImportable && (
        <p className="import-progress-current import-progress-done">
          All documents imported successfully!
        </p>
      )}
    </div>
  );
};
