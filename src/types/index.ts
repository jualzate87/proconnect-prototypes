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
