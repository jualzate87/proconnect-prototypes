import React, { useState, useCallback, useRef } from 'react';
import { ReturnReviewHeader } from './ReturnReviewHeader';
import { DiagnosticsBar } from './DiagnosticsBar';
import { Form1040Viewer } from './Form1040Viewer';
import { FieldPopover } from './FieldPopover';
import { SourceDocumentTrowser } from './SourceDocumentTrowser';
import { CalculationPopover } from './CalculationPopover';
import { AgentPanel } from '../AgentPanel/AgentPanel';
import formData from '../../data/form1040.json';
import issuesData from '../../data/reviewIssues.json';
import clientData from '../../data/jordanWellsReturn.json';
import type { Form1040Field, ReviewIssue, SourceReference, ReturnDocument } from '../../types';
import './ReturnReviewLayout.css';

export const ReturnReviewLayout: React.FC = () => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [fields, setFields] = useState<Form1040Field[]>(formData.fields as Form1040Field[]);
  const [issues, setIssues] = useState<ReviewIssue[]>(issuesData as ReviewIssue[]);

  // Field popover state
  const [selectedField, setSelectedField] = useState<Form1040Field | null>(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  // Source trowser state
  const [selectedSource, setSelectedSource] = useState<SourceReference | null>(null);

  // Calculation popover state
  const [calcIssue, setCalcIssue] = useState<ReviewIssue | null>(null);
  const [calcPos, setCalcPos] = useState({ top: 0, left: 0 });

  // Highlighted fields from agent panel
  const [highlightedFieldIds, setHighlightedFieldIds] = useState<string[]>([]);

  const formRef = useRef<HTMLDivElement>(null);

  const handleStartReview = () => {
    setIsAgentOpen(true);
    // Auto-highlight fields with issues
    const issueFieldIds = issues.flatMap((i) => i.affectedFields);
    setHighlightedFieldIds(issueFieldIds);
  };

  const handleFieldClick = useCallback((field: Form1040Field) => {
    // Position popover near center of viewport
    setPopoverPos({
      top: window.innerHeight / 2 - 150,
      left: Math.min(window.innerWidth / 2 - 180, window.innerWidth - 400),
    });
    setSelectedField(field);
  }, []);

  const handleSourceClick = useCallback((source: SourceReference) => {
    setSelectedField(null);
    setSelectedSource(source);
  }, []);

  const handleSourceSave = useCallback((newValue: number | string) => {
    if (!selectedSource) return;
    // Update the field value from source
    setFields((prev) =>
      prev.map((f) => {
        const sourceIdx = f.sources?.findIndex(
          (s) => s.documentId === selectedSource.documentId
        );
        if (sourceIdx === undefined || sourceIdx < 0) return f;

        const updatedSources = [...(f.sources || [])];
        updatedSources[sourceIdx] = {
          ...updatedSources[sourceIdx],
          extractedValue: newValue,
        };

        // Recalculate current value from sources
        const numericSources = updatedSources.filter(
          (s) => typeof s.extractedValue === 'number'
        );
        const newTotal = numericSources.reduce(
          (sum, s) => sum + (s.extractedValue as number),
          0
        );

        return {
          ...f,
          sources: updatedSources,
          currentValue: numericSources.length > 0 ? newTotal : f.currentValue,
          reviewStatus: 'corrected' as const,
        };
      })
    );
  }, [selectedSource]);

  const handleDocumentClick = useCallback((documentId: string) => {
    // Find a source reference for this document from any field
    const field = fields.find((f) =>
      f.sources?.some((s) => s.documentId === documentId)
    );
    if (field) {
      const source = field.sources!.find((s) => s.documentId === documentId)!;
      setSelectedSource(source);
    } else {
      // Create a minimal source reference for documents without field mappings
      const doc = (clientData.documents as ReturnDocument[]).find((d) => d.id === documentId);
      if (doc) {
        setSelectedSource({
          documentId: doc.id,
          documentName: doc.name,
          documentType: doc.type,
          extractedValue: 0,
          confidence: doc.ocrConfidence ?? 95,
          page: 1,
          fieldName: 'Overview',
        });
      }
    }
  }, [fields]);

  const handleIssueClick = useCallback((issue: ReviewIssue) => {
    setHighlightedFieldIds(issue.affectedFields);
    // Scroll to first affected field
    if (issue.affectedFields[0] && formRef.current) {
      const fieldEl = formRef.current.querySelector(
        `[data-field-id="${issue.affectedFields[0]}"]`
      );
      fieldEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleFieldPersonalReview = useCallback((fieldId: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === fieldId ? { ...f, personalReview: true } : f
      )
    );
  }, []);

  const handleIssueCorrect = useCallback((issueId: string, note?: string) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId
          ? { ...issue, status: 'correct' as const, resolutionNote: note }
          : issue
      )
    );
  }, []);

  const handleIssueAction = useCallback((issue: ReviewIssue, action: string) => {
    if (action === 'view-sources' || action === 'view-details') {
      // Open the field popover for the first affected field
      const field = fields.find((f) => issue.affectedFields.includes(f.id));
      if (field) {
        handleFieldClick(field);
      }
    } else if (action === 'view-document') {
      // Open the trowser for the scan quality issue
      const field = fields.find((f) => issue.affectedFields.includes(f.id));
      if (field && field.sources && field.sources.length > 0) {
        setSelectedSource(field.sources[0]);
      }
    } else if (action === 'view-calculation') {
      setCalcPos({
        top: window.innerHeight / 2 - 200,
        left: Math.min(window.innerWidth / 2 - 210, window.innerWidth - 450),
      });
      setCalcIssue(issue);
    }
  }, [fields, handleFieldClick]);

  return (
    <div className="review-layout">
      {/* Header */}
      <ReturnReviewHeader
        clientName={formData.clientName}
        taxYear={2024}
        returnType="1040"
        onStartReview={handleStartReview}
        isReviewActive={isAgentOpen}
      />

      {/* Main body */}
      <div className="review-body">
        <div className="review-main" ref={formRef}>
          <DiagnosticsBar />
          <Form1040Viewer
            fields={fields}
            clientName={formData.clientName}
            ssn={formData.ssn}
            address={formData.address}
            cityStateZip={formData.cityStateZip}
            filingStatus={formData.filingStatus}
            onFieldClick={handleFieldClick}
            onFieldPersonalReview={handleFieldPersonalReview}
            highlightedFieldIds={highlightedFieldIds}
            activeFieldId={selectedField?.id}
          />
        </div>

        {/* Agent Panel */}
        <AgentPanel
          isOpen={isAgentOpen}
          issues={issues}
          documents={clientData.documents as ReturnDocument[]}
          onIssueClick={handleIssueClick}
          onIssueCorrect={handleIssueCorrect}
          onIssueAction={handleIssueAction}
          onFieldHighlight={setHighlightedFieldIds}
          onDocumentClick={handleDocumentClick}
          onClose={() => setIsAgentOpen(false)}
        />
      </div>

      {/* Field Popover */}
      {selectedField && (
        <FieldPopover
          field={selectedField}
          allFields={fields}
          position={popoverPos}
          onClose={() => setSelectedField(null)}
          onSourceClick={handleSourceClick}
        />
      )}

      {/* Source Document Trowser */}
      {selectedSource && (
        <SourceDocumentTrowser
          source={selectedSource}
          isOpen={!!selectedSource}
          onClose={() => setSelectedSource(null)}
          onSave={handleSourceSave}
        />
      )}

      {/* Calculation Popover */}
      {calcIssue && (
        <CalculationPopover
          issue={calcIssue}
          position={calcPos}
          onClose={() => setCalcIssue(null)}
        />
      )}
    </div>
  );
};
