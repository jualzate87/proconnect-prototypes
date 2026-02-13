export interface API {
  id: string;
  name: string;
  description: string;
  category: string;
  endpoints: Endpoint[];
  useCase: string;
  logicFlow: string;
  icon?: string;
}

export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: Parameter[];
  response?: ResponseExample;
}

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ResponseExample {
  status: number;
  body: Record<string, unknown>;
}

export interface APIKey extends Record<string, unknown> {
  id: string;
  name: string;
  description?: string;
  key: string;
  status: 'active' | 'revoked';
  scopes: string[];
  createdAt: string;
  lastUsed?: string;
  clientName?: string;
}

export interface Scope {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface APIHealthMetric {
  apiName: string;
  uptime: number;
  successRate: number;
  latency: number;
  status: 'healthy' | 'degraded' | 'down';
}

export interface TrafficLog extends Record<string, unknown> {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  statusCode: number;
  clientName: string;
  responseTime: number;
}

export interface DocSection {
  id: string;
  title: string;
  content: string;
  subsections?: DocSection[];
}

export interface CodeExample {
  language: 'javascript' | 'python' | 'curl';
  code: string;
  description?: string;
}

// ============================================
// Audit Log Types
// ============================================

export type AuditActionType =
  | 'document_uploaded'
  | 'document_deleted'
  | 'document_replaced'
  | 'document_imported'
  | 'field_value_changed'
  | 'field_value_restored'
  | 'bulk_import_completed'
  | 'review_started'
  | 'review_completed'
  | 'issue_flagged'
  | 'issue_resolved'
  | 'field_marked_reviewed'
  | 'status_changed'
  | 'return_locked'
  | 'return_unlocked'
  | 'assignee_changed'
  | 'comment_added'
  | 'comment_resolved'
  | 'return_shared'
  | 'return_efiled'
  | 'efile_accepted'
  | 'efile_rejected'
  | 'return_printed'
  | 'version_saved'
  | 'version_restored'
  | 'version_compared';

export type AuditActionCategory =
  | 'document'
  | 'return-data'
  | 'review'
  | 'status'
  | 'collaboration'
  | 'filing'
  | 'version';

export interface AuditLogEntry {
  id: string;
  returnId: string;
  action: AuditActionType;
  category: AuditActionCategory;
  timestamp: string;
  user: {
    name: string;
    initials: string;
    color: string;
  };
  description: string;
  details?: {
    fieldId?: string;
    fieldLabel?: string;
    oldValue?: string | number;
    newValue?: string | number;
    documentName?: string;
    documentType?: string;
    status?: string;
    previousStatus?: string;
    versionLabel?: string;
    score?: number;
    assigneeName?: string;
    commentText?: string;
    issueTitle?: string;
  };
}

// ============================================
// Agentic Review Types
// ============================================

export interface TaxReturn {
  clientId: string;
  clientName: string;
  spouseName?: string;
  taxYear: number;
  returnType: '1040' | '1120' | '1065' | '1120S';
  status: 'not-started' | 'documents-received' | 'importing' | 'ready-for-review' | 'in-review' | 'completed';
  documents: ReturnDocument[];
  assignees: string[];
  savedAt?: string;
  prepTime?: string;
}

export interface ReturnDocument {
  id: string;
  name: string;
  type: 'W-2' | '1099-DIV' | '1099-INT' | 'K-1' | '1099-MISC' | '1099-NEC' | '1099-R' | 'other';
  importStatus: 'ready' | 'importing' | 'imported' | 'error';
  uploadDate: string;
  ocrConfidence?: number; // 0-100
  pages?: number;
}

export interface Form1040Field {
  id: string;
  line: string;
  label: string;
  section: 'personal' | 'filing-status' | 'income' | 'adjustments' | 'deductions' | 'tax-credits' | 'payments' | 'refund';
  currentValue: number | string;
  priorYearValue?: number | string;
  sources?: SourceReference[];
  isHighlighted?: boolean;
  reviewStatus: 'unreviewed' | 'reviewed' | 'corrected';
  personalReview?: boolean; // personal tracking -- "I looked at this field"
  changePercent?: number;
  calculationComponents?: string[]; // IDs of fields that contribute to this computed field
}

export interface SourceReference {
  documentId: string;
  documentName: string;
  documentType: string;
  extractedValue: number | string;
  confidence: number; // 0-100
  page?: number;
  fieldName?: string;
}

export type IssueSeverity = 'high' | 'medium' | 'low';
export type IssueCategory = 'yoy-analysis' | 'scan-quality' | 'irs-compliance' | 'credits-deductions';

export interface ReviewIssue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  rootCause: string;
  explanation?: string; // concise human-readable summary (1-2 sentences)
  affectedFields: string[]; // Form1040Field ids
  suggestedAction: string;
  status: 'open' | 'correct' | 'resolved';
  whyItMatters?: string;
  resolutionNote?: string; // optional note from the tax pro when marking correct
  missingDocuments?: string[]; // document names expected but not received
  calculations?: CalculationStep[]; // for calculated fields
  estimatedPenalty?: PenaltyBreakdown; // for IRS compliance issues
  estimatedTaxImpact?: string; // e.g., "~$490 impact on total tax"
  details?: IssueDetail[]; // structured detail items for progressive disclosure
}

export interface CalculationStep {
  label: string;
  formula?: string;
  result: string;
}

export interface PenaltyBreakdown {
  amount: number;
  calculation: string;
  quarterlyPayment?: number;
  safeHarborThreshold?: number;
  currentWithholding?: number;
}

export interface IssueDetail {
  label: string;
  value: string;
}

export interface AgentThinkingStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
  substeps?: string[];
  durationMs: number;
}

export interface ReviewScore {
  overall: number;
  accuracy: number;
  completeness: number;
  risk: number;
}

export interface AgentMessage {
  id: string;
  role: 'agent' | 'user';
  content: string;
  timestamp: string;
  type: 'thinking' | 'response' | 'suggestion' | 'summary';
  embeddedContent?: {
    type: 'table' | 'calculation' | 'document-ref';
    data: Record<string, unknown>;
  };
}
