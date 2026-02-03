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

export interface APIKey {
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

export interface TrafficLog {
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
