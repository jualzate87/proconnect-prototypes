import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import type { Form1040Field, ReviewIssue, SourceReference, ReturnDocument, IssueCategory } from '../../types';
import './ReturnReviewLayout.css';

const AGENT_PANEL_WIDTH_KEY = 'agent-panel-width';
const PANEL_WIDTH_MIN = 320;
const PANEL_WIDTH_MAX = 600;
const PANEL_WIDTH_DEFAULT = 384;

const POPOVER_WIDTH = 360;
const POPOVER_HEIGHT_EST = 400;
const POPOVER_GAP = 8;

export type PopoverPosition = { top: number; left: number };

/** Returns the topmost (smallest rect.top) field element from the given IDs. */
function getTopmostFieldElement(
  formRef: React.RefObject<HTMLDivElement | null>,
  fieldIds: string[]
): HTMLElement | null {
  if (!formRef.current || fieldIds.length === 0) return null;
  let topmost: HTMLElement | null = null;
  let minTop = Infinity;
  for (const id of fieldIds) {
    const el = formRef.current.querySelector(`[data-field-id="${id}"]`) as HTMLElement | null;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < minTop) {
        minTop = rect.top;
        topmost = el;
      }
    }
  }
  return topmost;
}

/** Returns position for popover: 8px above field top (or below if no room). Top-based, no vertical clamping. */
function getPopoverPosition(fieldEl: HTMLElement): PopoverPosition {
  const rect = fieldEl.getBoundingClientRect();

  let top: number;
  const spaceAbove = rect.top;
  if (spaceAbove >= 200) {
    top = rect.top - POPOVER_HEIGHT_EST - POPOVER_GAP;
  } else {
    top = rect.bottom + POPOVER_GAP;
  }

  let left = rect.left + rect.width / 2 - POPOVER_WIDTH / 2;
  left = Math.max(16, Math.min(left, window.innerWidth - POPOVER_WIDTH - 16));

  return { top, left };
}

function getStoredPanelWidth(): number {
  try {
    const stored = localStorage.getItem(AGENT_PANEL_WIDTH_KEY);
    if (stored) {
      const n = parseInt(stored, 10);
      if (!isNaN(n) && n >= PANEL_WIDTH_MIN && n <= PANEL_WIDTH_MAX) return n;
    }
  } catch {
    /* ignore */
  }
  return PANEL_WIDTH_DEFAULT;
}

export const ReturnReviewLayout: React.FC = () => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(getStoredPanelWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [fields, setFields] = useState<Form1040Field[]>(formData.fields as Form1040Field[]);
  const [issues, setIssues] = useState<ReviewIssue[]>(issuesData as ReviewIssue[]);
  const [documents, setDocuments] = useState<ReturnDocument[]>(
    (clientData.documents as ReturnDocument[]).map((d) => ({ ...d }))
  );

  // Field popover state
  const [selectedField, setSelectedField] = useState<Form1040Field | null>(null);
  const [popoverPos, setPopoverPos] = useState<PopoverPosition>({ top: 0, left: 0 });

  // Source trowser state
  const [selectedSource, setSelectedSource] = useState<SourceReference | null>(null);

  // Calculation popover state
  const [calcIssue, setCalcIssue] = useState<ReviewIssue | null>(null);
  const [calcPos, setCalcPos] = useState<PopoverPosition>({ top: 0, left: 0 });

  // Highlighted fields from agent panel (context-aware: only when category expanded)
  const [highlightedFieldIds, setHighlightedFieldIds] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<IssueCategory | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(panelWidth);

  // Reposition popover when form scrolls so it stays 8px above the topmost highlighted field
  useEffect(() => {
    if (!selectedField) return;
    const scrollEl = formRef.current?.querySelector('.form-1040-viewer');
    if (!scrollEl) return;
    const updatePos = () => {
      const ids = highlightedFieldIds.length > 0 ? highlightedFieldIds : [selectedField.id];
      const fieldEl = getTopmostFieldElement(formRef, ids);
      if (fieldEl) setPopoverPos(getPopoverPosition(fieldEl));
    };
    scrollEl.addEventListener('scroll', updatePos, { passive: true });
    return () => scrollEl.removeEventListener('scroll', updatePos);
  }, [selectedField, highlightedFieldIds]);

  useEffect(() => {
    lastWidthRef.current = panelWidth;
  }, [panelWidth]);

  // Escape to close popover when open
  useEffect(() => {
    if (!selectedField && !calcIssue) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedField(null);
        setCalcIssue(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedField, calcIssue]);

  useEffect(() => {
    if (!isResizing) return;
    const handleMove = (e: MouseEvent) => {
      const newWidth = Math.max(
        PANEL_WIDTH_MIN,
        Math.min(PANEL_WIDTH_MAX, window.innerWidth - e.clientX)
      );
      lastWidthRef.current = newWidth;
      setPanelWidth(newWidth);
    };
    const handleUp = () => {
      setIsResizing(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      try {
        localStorage.setItem(AGENT_PANEL_WIDTH_KEY, String(lastWidthRef.current));
      } catch {
        /* ignore */
      }
    };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isResizing]);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleStartReview = () => {
    setIsAgentOpen(true);
    // No blanket highlight — fields highlight only when user expands a category
    setHighlightedFieldIds([]);
    setExpandedCategory(null);
  };

  const handleFieldClick = useCallback((field: Form1040Field) => {
    const fieldEl = formRef.current?.querySelector(
      `[data-field-id="${field.id}"]`
    ) as HTMLElement | null;
    if (fieldEl) {
      setPopoverPos(getPopoverPosition(fieldEl));
    } else {
      setPopoverPos({
        top: window.innerHeight / 2 - 150,
        left: Math.min(window.innerWidth / 2 - 180, window.innerWidth - 400),
      });
    }
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

  const PREPARER_NAME = 'Sonia Miller';

  const getIssueAffectedFieldIdsForDocument = useCallback(
    (documentId: string): string[] => {
      const ids = new Set<string>();
      for (const issue of issues.filter((i) => i.category === 'scan-quality')) {
        for (const fid of issue.affectedFields) {
          const field = fields.find((f) => f.id === fid);
          if (field?.sources?.some((s) => s.documentId === documentId)) ids.add(fid);
        }
      }
      return Array.from(ids);
    },
    [issues, fields]
  );

  const handleDocumentReview = useCallback((documentId: string, reviewed: boolean) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === documentId
          ? {
              ...d,
              reviewedBy: reviewed ? PREPARER_NAME : undefined,
              reviewedAt: reviewed ? new Date().toISOString() : undefined,
            }
          : d
      )
    );
  }, []);

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
      const doc = documents.find((d) => d.id === documentId);
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
  }, [fields, documents]);

  const handleIssueClick = useCallback((issue: ReviewIssue) => {
    setHighlightedFieldIds(issue.affectedFields);
    const fieldEl = getTopmostFieldElement(formRef, issue.affectedFields);
    if (fieldEl) {
      const fieldId = fieldEl.getAttribute('data-field-id');
      const field = fieldId ? fields.find((f) => f.id === fieldId) : undefined;
      fieldEl.scrollIntoView({ behavior: 'auto', block: 'center' });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPopoverPos(getPopoverPosition(fieldEl));
        });
      });
      if (field) setSelectedField(field);
    }
  }, [fields]);

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
    if (action === 'view-sources' || action === 'view-document') {
      // Open the source document trowser for the first affected field with sources (same behavior for YoY and Scan)
      const field = fields.find((f) => issue.affectedFields.includes(f.id));
      if (field && field.sources && field.sources.length > 0) {
        setSelectedSource(field.sources[0]);
      } else if (action === 'view-sources') {
        // Fallback: open field popover if no sources (e.g., calculated fields only)
        if (field) handleFieldClick(field);
      }
    } else if (action === 'view-calculation') {
      const field = fields.find((f) => issue.affectedFields.includes(f.id));
      const fieldEl = field && formRef.current
        ? (formRef.current.querySelector(`[data-field-id="${field.id}"]`) as HTMLElement | null)
        : null;
      if (fieldEl) {
        setCalcPos(getPopoverPosition(fieldEl));
      } else {
        setCalcPos({
          top: window.innerHeight / 2 - 200,
          left: Math.min(window.innerWidth / 2 - 210, window.innerWidth - 450),
        });
      }
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
            expandedCategory={expandedCategory}
          />
        </div>

        {/* Resize handle — between form and panel */}
        {isAgentOpen && (
          <div
            className="agent-panel-resize-handle"
            onMouseDown={handleResizeStart}
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize agent panel"
          />
        )}

        {/* Agent Panel */}
        <AgentPanel
          isOpen={isAgentOpen}
          width={panelWidth}
          isResizing={isResizing}
          issues={issues}
          documents={documents}
          fields={fields}
          onIssueClick={handleIssueClick}
          onIssueCorrect={handleIssueCorrect}
          onIssueAction={handleIssueAction}
          onFieldHighlight={setHighlightedFieldIds}
          onExpandedCategoryChange={setExpandedCategory}
          onDocumentClick={handleDocumentClick}
          onDocumentReview={handleDocumentReview}
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
          issueAffectedFieldIds={getIssueAffectedFieldIdsForDocument(selectedSource.documentId)}
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
