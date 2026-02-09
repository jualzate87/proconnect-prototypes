import React from 'react';
import { CodeBlock } from './CodeBlock';
import { EndpointDoc } from './EndpointDoc';
import apiCatalogData from '../../data/apiCatalog.json';
import sampleResponsesData from '../../data/sampleResponses.json';
import './DocContent.css';

interface DocContentProps {
  section: string;
}

const content: Record<string, { title: string; content: React.ReactNode }> = {
  quickstart: {
    title: 'Quickstart Guide',
    content: (
      <>
        <p>
          Get started with ProConnect Tax APIs in minutes. This guide will walk
          you through generating your first API key and making your first API call.
        </p>
        <h2>Step 1: Generate an API Key</h2>
        <p>
          Navigate to the API Keys section and generate a new API key. Make sure
          to select the appropriate scopes for your integration needs.
        </p>
        <h2>Step 2: Make Your First Request</h2>
        <p>Use your API key to authenticate requests:</p>
        <CodeBlock
          language="javascript"
          code={`// Example: Fetch all tax returns
const response = await fetch('https://api.proconnect.intuit.com/v2/returns', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const returns = await response.json();
console.log(returns);`}
        />
        <h2>Step 3: Handle Responses</h2>
        <p>
          All API responses are in JSON format. Check the status code and handle
          errors appropriately.
        </p>
      </>
    ),
  },
  authentication: {
    title: 'Authentication',
    content: (
      <>
        <p>
          ProConnect Tax APIs use API key authentication with scope-based permissions.
          Generate <strong>one API key</strong> in the API Keys section, and use it to
          access <strong>all APIs</strong> (Client Service, Engagement Service, Import
          Service, Export Service).
        </p>

        <h2>How It Works</h2>
        <div className="auth-flow-steps">
          <div className="auth-step">
            <div className="auth-step-number">1</div>
            <div className="auth-step-content">
              <strong>Generate API Key</strong>
              <p>Navigate to API Keys section and generate a new key</p>
            </div>
          </div>
          <div className="auth-step">
            <div className="auth-step-number">2</div>
            <div className="auth-step-content">
              <strong>Select Scopes</strong>
              <p>Choose which resources and actions the key can access</p>
            </div>
          </div>
          <div className="auth-step">
            <div className="auth-step-number">3</div>
            <div className="auth-step-content">
              <strong>Use Same Key for All APIs</strong>
              <p>The scopes determine what you can access within each API</p>
            </div>
          </div>
        </div>

        <h2>API Key Format</h2>
        <p>Include your API key in the Authorization header with the "Bearer" prefix:</p>
        <CodeBlock
          language="bash"
          code={`curl https://api.proconnect.intuit.com/v2/clients \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
        />

        <h2>Scope Mapping</h2>
        <p>
          When generating an API key, select scopes based on which APIs you need to access:
        </p>
        <div className="scope-mapping-table">
          <table>
            <thead>
              <tr>
                <th>API</th>
                <th>Required Scopes</th>
                <th>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Client Service API</strong></td>
                <td><code>read:clients</code>, <code>write:clients</code></td>
                <td>Sync client data with CRM systems</td>
              </tr>
              <tr>
                <td><strong>Engagement Service API</strong></td>
                <td><code>read:returns</code>, <code>read:efile</code></td>
                <td>Track return status and e-file progress</td>
              </tr>
              <tr>
                <td><strong>Import Service API</strong></td>
                <td><code>write:returns</code></td>
                <td>Import data from payroll/accounting systems</td>
              </tr>
              <tr>
                <td><strong>Export Service API</strong></td>
                <td><code>read:returns</code>, <code>read:clients</code></td>
                <td>Export data to analytics and document management</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Available Scopes</h2>
        <div className="scopes-grid">
          <div className="scope-category">
            <h4>Tax Returns</h4>
            <ul>
              <li><code>read:returns</code> - View tax return data and status</li>
              <li><code>write:returns</code> - Create and update tax returns</li>
              <li><code>delete:returns</code> - Delete tax returns</li>
            </ul>
          </div>
          <div className="scope-category">
            <h4>Clients</h4>
            <ul>
              <li><code>read:clients</code> - View client information</li>
              <li><code>write:clients</code> - Create and update clients</li>
              <li><code>delete:clients</code> - Delete client records</li>
            </ul>
          </div>
          <div className="scope-category">
            <h4>E-file & Documents</h4>
            <ul>
              <li><code>read:efile</code> - View e-file submission status</li>
              <li><code>write:efile</code> - Submit returns for e-filing</li>
              <li><code>read:documents</code> - View and download documents</li>
              <li><code>write:documents</code> - Upload and manage documents</li>
            </ul>
          </div>
        </div>

        <div className="doc-callout doc-callout-warning">
          <strong>Security Best Practice:</strong> Never commit API keys to version
          control. Store them securely as environment variables. Use the principle of
          least privilege—only select scopes your integration actually needs.
        </div>
      </>
    ),
  },
  webhooks: {
    title: 'Webhooks',
    content: (
      <>
        <p>
          Webhooks allow you to receive real-time notifications when events occur
          in ProConnect Tax.
        </p>
        <h2>Setting Up Webhooks</h2>
        <p>Configure your webhook endpoint URL in the API Keys section.</p>
        <CodeBlock
          language="python"
          code={`from flask import Flask, request

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    data = request.json
    event_type = data.get('event_type')
    
    if event_type == 'return.accepted':
        # Handle return acceptance
        return_id = data.get('return_id')
        print(f"Return {return_id} was accepted")
    
    return {'status': 'ok'}, 200`}
        />
        <h2>Event Types</h2>
        <ul>
          <li>
            <code>return.accepted</code> - A tax return was accepted
          </li>
          <li>
            <code>return.rejected</code> - A tax return was rejected
          </li>
          <li>
            <code>client.updated</code> - Client information was updated
          </li>
        </ul>
      </>
    ),
  },
  returns: {
    title: 'Tax Returns API',
    content: (
      <>
        <h2>Get All Returns</h2>
        <CodeBlock
          language="javascript"
          code={`const response = await fetch(
  'https://api.proconnect.intuit.com/v2/returns?status=filed',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}
        />
        <h2>Get a Specific Return</h2>
        <CodeBlock
          language="javascript"
          code={`const response = await fetch(
  'https://api.proconnect.intuit.com/v2/returns/{returnId}',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}
        />
      </>
    ),
  },
  clients: {
    title: 'Client Sync API',
    content: (
      <>
        <h2>List Clients</h2>
        <CodeBlock
          language="python"
          code={`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.proconnect.intuit.com/v2/clients',
    headers=headers
)

clients = response.json()`}
        />
      </>
    ),
  },
  documents: {
    title: 'Document Bridge API',
    content: (
      <>
        <h2>Upload a Document</h2>
        <CodeBlock
          language="javascript"
          code={`const formData = new FormData();
formData.append('file', fileBlob);
formData.append('clientId', '12345');
formData.append('returnId', '67890');

const response = await fetch(
  'https://api.proconnect.intuit.com/v2/documents/upload',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  }
);`}
        />
      </>
    ),
  },
  'best-practices': {
    title: 'Best Practices',
    content: (
      <>
        <h2>Error Handling</h2>
        <p>Always check response status codes and handle errors gracefully:</p>
        <CodeBlock
          language="javascript"
          code={`try {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Handle error appropriately
}`}
        />
        <h2>Rate Limiting</h2>
        <p>
          API requests are rate-limited. Implement exponential backoff when you
          receive 429 (Too Many Requests) responses.
        </p>
        <div className="doc-callout doc-callout-info">
          <strong>Rate Limits:</strong> 100 requests per minute per API key
        </div>
        <h2>Data Pagination</h2>
        <p>
          Use pagination parameters when fetching large datasets to avoid
          performance issues.
        </p>
      </>
    ),
  },
  'client-service': {
    title: 'Client Service API',
    content: (
      <>
        <p>
          {apiCatalogData[0].description}
        </p>
        <h2>Base URL</h2>
        <code className="base-url">https://api.proconnect.intuit.com</code>

        <h2>Endpoints</h2>

        <EndpointDoc
          method="GET"
          path="/v2/clients"
          description="Retrieve a list of all clients with optional filtering."
          requiredScopes={['read:clients']}
          parameters={[
            {
              name: 'status',
              type: 'string',
              required: false,
              description: 'Filter by client status (active, inactive, archived)',
            },
            {
              name: 'lastUpdated',
              type: 'date',
              required: false,
              description: 'Filter clients updated after specified date (ISO 8601 format)',
            },
            {
              name: 'page',
              type: 'integer',
              required: false,
              description: 'Page number for pagination (default: 1)',
            },
            {
              name: 'limit',
              type: 'integer',
              required: false,
              description: 'Number of results per page (default: 50, max: 100)',
            },
          ]}
          responseSample={sampleResponsesData['client-service']['GET /v2/clients'].success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Unique client identifier' },
            { field: 'name', type: 'string', description: 'Client or company name' },
            { field: 'email', type: 'string', description: 'Primary email address' },
            { field: 'phone', type: 'string', description: 'Primary phone number' },
            { field: 'status', type: 'string', description: 'Client status (active, inactive, archived)' },
            { field: 'address', type: 'object', description: 'Client mailing address' },
            { field: 'taxId', type: 'string', description: 'Tax identification number (EIN or SSN)' },
            { field: 'createdAt', type: 'string', description: 'ISO 8601 timestamp of creation' },
            { field: 'updatedAt', type: 'string', description: 'ISO 8601 timestamp of last update' },
          ]}
          errorSamples={sampleResponsesData['client-service']['GET /v2/clients'].errors}
        />

        <EndpointDoc
          method="GET"
          path="/v2/clients/{clientId}"
          description="Get detailed information about a specific client."
          requiredScopes={['read:clients']}
          responseSample={sampleResponsesData['client-service']['GET /v2/clients/{clientId}'].success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Unique client identifier' },
            { field: 'name', type: 'string', description: 'Client or company name' },
            { field: 'entityType', type: 'string', description: 'Entity type (C-Corp, S-Corp, LLC, Individual, etc.)' },
            { field: 'fiscalYearEnd', type: 'string', description: 'Fiscal year end date (MM-DD format)' },
            { field: 'contacts', type: 'array', description: 'Array of contact persons for the client' },
            { field: 'metadata', type: 'object', description: 'Additional custom metadata' },
          ]}
          errorSamples={sampleResponsesData['client-service']['GET /v2/clients/{clientId}'].errors}
        />

        <EndpointDoc
          method="POST"
          path="/v2/clients"
          description="Create a new client record."
          requiredScopes={['write:clients']}
          requestSample={sampleResponsesData['client-service']['POST /v2/clients'].request}
          responseSample={sampleResponsesData['client-service']['POST /v2/clients'].success}
          errorSamples={sampleResponsesData['client-service']['POST /v2/clients'].errors}
        />

        <EndpointDoc
          method="PUT"
          path="/v2/clients/{clientId}"
          description="Update existing client information."
          requiredScopes={['write:clients']}
          requestSample={sampleResponsesData['client-service']['PUT /v2/clients/{clientId}'].request}
          responseSample={sampleResponsesData['client-service']['PUT /v2/clients/{clientId}'].success}
        />

        <EndpointDoc
          method="DELETE"
          path="/v2/clients/{clientId}"
          description="Archive or delete a client record."
          requiredScopes={['delete:clients']}
          responseSample={sampleResponsesData['client-service']['DELETE /v2/clients/{clientId}'].success}
        />
      </>
    ),
  },
  'engagement-service': {
    title: 'Engagement Service API',
    content: (
      <>
        <p>
          {apiCatalogData[1].description}
        </p>
        <h2>Base URL</h2>
        <code className="base-url">https://api.proconnect.intuit.com</code>

        <h2>Endpoints</h2>

        <EndpointDoc
          method="GET"
          path="/v2/engagements"
          description="List all engagements with filtering options."
          requiredScopes={['read:returns']}
          parameters={[
            {
              name: 'year',
              type: 'integer',
              required: false,
              description: 'Filter by tax year',
            },
            {
              name: 'status',
              type: 'string',
              required: false,
              description: 'Filter by engagement status (draft, in-progress, review, complete)',
            },
            {
              name: 'efileStatus',
              type: 'string',
              required: false,
              description: 'Filter by e-file status (not-filed, pending, transmitted, accepted, rejected)',
            },
            {
              name: 'page',
              type: 'integer',
              required: false,
              description: 'Page number for pagination (default: 1)',
            },
            {
              name: 'limit',
              type: 'integer',
              required: false,
              description: 'Number of results per page (default: 50, max: 100)',
            },
          ]}
          responseSample={sampleResponsesData['engagement-service']['GET /v2/engagements'].success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Unique engagement identifier' },
            { field: 'clientId', type: 'string', description: 'Associated client ID' },
            { field: 'year', type: 'integer', description: 'Tax year' },
            { field: 'returnType', type: 'string', description: 'Return form type (1040, 1120, 1065, etc.)' },
            { field: 'status', type: 'string', description: 'Engagement status' },
            { field: 'efileStatus', type: 'string', description: 'E-file submission status' },
            { field: 'assignee', type: 'object', description: 'Assigned team member' },
            { field: 'dueDate', type: 'string', description: 'Filing due date' },
          ]}
          errorSamples={sampleResponsesData['engagement-service']['GET /v2/engagements'].errors}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}"
          description="Get detailed engagement information including returns, projects, and plans."
          requiredScopes={['read:returns']}
          responseSample={sampleResponsesData['engagement-service']['GET /v2/engagements/{engagementId}'].success}
          responseFields={[
            { field: 'returns', type: 'array', description: 'All tax returns associated with this engagement' },
            { field: 'projects', type: 'array', description: 'Project details and task completion status' },
          ]}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/returns"
          description="Get all tax returns associated with an engagement."
          requiredScopes={['read:returns']}
          responseSample={sampleResponsesData['engagement-service']['GET /v2/engagements/{engagementId}/returns'].success}
          responseFields={[
            { field: 'formType', type: 'string', description: 'Tax form type (1040, 1120, etc.)' },
            { field: 'calculations', type: 'object', description: 'Key tax calculations and amounts' },
            { field: 'filingType', type: 'string', description: 'Filing type (original, amended, extension)' },
          ]}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/projects"
          description="Get project details for a specific engagement."
          requiredScopes={['read:returns']}
          responseSample={sampleResponsesData['engagement-service']['GET /v2/engagements/{engagementId}/projects'].success}
          responseFields={[
            { field: 'completionPercent', type: 'number', description: 'Project completion percentage (0-100)' },
            { field: 'tasks', type: 'array', description: 'Individual tasks with status and completion dates' },
          ]}
        />
      </>
    ),
  },
  'import-service': {
    title: 'Import Service API',
    content: (
      <>
        <p>
          {apiCatalogData[2].description}
        </p>
        <h2>Base URL</h2>
        <code className="base-url">https://api.proconnect.intuit.com</code>

        <h2>Endpoints</h2>

        <EndpointDoc
          method="POST"
          path="/v2/engagements/{engagementId}/import"
          description="Import data into a specific engagement."
          requiredScopes={['write:returns']}
          parameters={[
            {
              name: 'dataType',
              type: 'string',
              required: true,
              description: 'Type of data being imported (forms, client-data, prior-year)',
            },
            {
              name: 'source',
              type: 'string',
              required: false,
              description: 'Source system or file format (quickbooks, adp, paychex, csv, etc.)',
            },
          ]}
          requestSample={sampleResponsesData['import-service']['POST /v2/engagements/{engagementId}/import'].request}
          responseSample={sampleResponsesData['import-service']['POST /v2/engagements/{engagementId}/import'].success}
          responseFields={[
            { field: 'importId', type: 'string', description: 'Unique import operation identifier' },
            { field: 'status', type: 'string', description: 'Import status (completed, failed, partial)' },
            { field: 'recordsImported', type: 'number', description: 'Number of records successfully imported' },
            { field: 'summary', type: 'object', description: 'Summary of import operation including forms created and warnings' },
            { field: 'importedAt', type: 'string', description: 'ISO 8601 timestamp of import completion' },
          ]}
          errorSamples={sampleResponsesData['import-service']['POST /v2/engagements/{engagementId}/import'].errors}
        />

        <EndpointDoc
          method="POST"
          path="/v2/engagements/{engagementId}/import/validate"
          description="Validate import data before committing to engagement."
          requiredScopes={['write:returns']}
          requestSample={sampleResponsesData['import-service']['POST /v2/engagements/{engagementId}/import/validate'].request}
          responseSample={sampleResponsesData['import-service']['POST /v2/engagements/{engagementId}/import/validate'].success}
          responseFields={[
            { field: 'valid', type: 'boolean', description: 'Whether the data is valid for import' },
            { field: 'warnings', type: 'array', description: 'List of warnings about missing or invalid data' },
            { field: 'summary', type: 'object', description: 'Estimated impact of the import operation' },
          ]}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/import/history"
          description="Get import history and status for an engagement."
          requiredScopes={['read:returns']}
          responseSample={sampleResponsesData['import-service']['GET /v2/engagements/{engagementId}/import/history'].success}
          responseFields={[
            { field: 'importId', type: 'string', description: 'Unique import operation identifier' },
            { field: 'dataType', type: 'string', description: 'Type of data that was imported' },
            { field: 'source', type: 'string', description: 'Source system' },
            { field: 'importedBy', type: 'object', description: 'User who performed the import' },
          ]}
        />
      </>
    ),
  },
  'export-service': {
    title: 'Export Service API',
    content: (
      <>
        <p>
          {apiCatalogData[3].description}
        </p>
        <h2>Base URL</h2>
        <code className="base-url">https://api.proconnect.intuit.com</code>

        <h2>Endpoints</h2>

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/export"
          description="Export engagement data and calculated values."
          requiredScopes={['read:returns', 'read:clients']}
          parameters={[
            {
              name: 'format',
              type: 'string',
              required: false,
              description: 'Export format (json, csv, xml, pdf). Default: json',
            },
            {
              name: 'includeCalculations',
              type: 'boolean',
              required: false,
              description: 'Include calculated values in export. Default: false',
            },
            {
              name: 'dataFields',
              type: 'array',
              required: false,
              description: 'Specific fields to include in export (comma-separated)',
            },
          ]}
          responseSample={sampleResponsesData['export-service']['GET /v2/engagements/{engagementId}/export'].success}
          responseFields={[
            { field: 'exportId', type: 'string', description: 'Unique export operation identifier' },
            { field: 'format', type: 'string', description: 'Export format used' },
            { field: 'data', type: 'object', description: 'Exported engagement data' },
            { field: 'exportedAt', type: 'string', description: 'ISO 8601 timestamp of export' },
          ]}
          errorSamples={sampleResponsesData['export-service']['GET /v2/engagements/{engagementId}/export'].errors}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/export/forms"
          description="Export forms and schedules as PDFs."
          requiredScopes={['read:returns']}
          responseSample={sampleResponsesData['export-service']['GET /v2/engagements/{engagementId}/export/forms'].success}
          responseFields={[
            { field: 'files', type: 'array', description: 'Array of downloadable PDF files' },
            { field: 'downloadUrl', type: 'string', description: 'Temporary download URL (expires in 24 hours)' },
            { field: 'expiresAt', type: 'string', description: 'Expiration timestamp for download URLs' },
          ]}
        />

        <EndpointDoc
          method="POST"
          path="/v2/engagements/export/bulk"
          description="Export data from multiple engagements at once."
          requiredScopes={['read:returns', 'read:clients']}
          requestSample={sampleResponsesData['export-service']['POST /v2/engagements/export/bulk'].request}
          responseSample={sampleResponsesData['export-service']['POST /v2/engagements/export/bulk'].success}
          responseFields={[
            { field: 'status', type: 'string', description: 'Export status (processing, completed, failed)' },
            { field: 'engagementCount', type: 'number', description: 'Number of engagements being exported' },
            { field: 'estimatedCompletionTime', type: 'string', description: 'Estimated time of completion' },
            { field: 'downloadUrl', type: 'string', description: 'Download URL (null until processing completes)' },
          ]}
        />
      </>
    ),
  },
};

export const DocContent: React.FC<DocContentProps> = ({ section }) => {
  const sectionContent = content[section] || content.quickstart;

  return (
    <div className="doc-content">
      <h1 className="doc-content-title">{sectionContent.title}</h1>
      <div className="doc-content-body">{sectionContent.content}</div>
    </div>
  );
};
