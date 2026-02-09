import React from 'react';
import { Modal } from '../Shared/Modal';
import { EndpointDoc } from '../Documentation/EndpointDoc';
import { API } from '../../types';
import sampleResponsesData from '../../data/sampleResponses.json';
import './APIDocumentationTrowser.css';

interface APIDocumentationTrowserProps {
  api: API | null;
  isOpen: boolean;
  onClose: () => void;
}

const apiIdToSampleKey: Record<string, string> = {
  'client-service': 'client-service',
  'engagement-service': 'engagement-service',
  'import-service': 'import-service',
  'export-service': 'export-service',
};

export const APIDocumentationTrowser: React.FC<APIDocumentationTrowserProps> = ({
  api,
  isOpen,
  onClose,
}) => {
  if (!api) return null;

  const sampleKey = apiIdToSampleKey[api.id];
  const samples = sampleKey ? (sampleResponsesData as any)[sampleKey] : {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" slideOver>
      <div className="api-doc-trowser">
        <div className="api-doc-trowser-header">
          <div>
            <h1 className="api-doc-trowser-title">{api.name}</h1>
            <p className="api-doc-trowser-description">{api.description}</p>
          </div>
        </div>

        <div className="api-doc-trowser-content">
          <div className="api-doc-section">
            <h2 className="api-doc-section-title">Base URL</h2>
            <code className="api-doc-base-url">
              https://api.proconnect.intuit.com
            </code>
          </div>

          <div className="api-doc-section">
            <h2 className="api-doc-section-title">Endpoints</h2>
            <div className="api-doc-endpoints">
              {renderEndpoints(api, samples)}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

function renderEndpoints(api: API, samples: any) {
  if (api.id === 'client-service') {
    return (
      <>
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
              description: 'Filter by client status (active, inactive)',
            },
            {
              name: 'lastUpdated',
              type: 'date',
              required: false,
              description: 'Filter clients updated after specified date',
            },
          ]}
          responseSample={samples['GET /v2/clients']?.success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Unique client identifier' },
            { field: 'name', type: 'string', description: 'Client name' },
            { field: 'email', type: 'string', description: 'Primary email' },
            { field: 'status', type: 'string', description: 'Client status' },
            { field: 'taxId', type: 'string', description: 'Tax ID (EIN or SSN)' },
          ]}
          errorSamples={samples['GET /v2/clients']?.errors}
        />

        <EndpointDoc
          method="GET"
          path="/v2/clients/{clientId}"
          description="Get detailed information about a specific client."
          requiredScopes={['read:clients']}
          responseSample={samples['GET /v2/clients/{clientId}']?.success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Client identifier' },
            { field: 'name', type: 'string', description: 'Client name' },
            { field: 'email', type: 'string', description: 'Primary email' },
            { field: 'status', type: 'string', description: 'Client status' },
            { field: 'taxId', type: 'string', description: 'Tax ID (EIN or SSN)' },
            { field: 'entityType', type: 'string', description: 'Entity type' },
          ]}
          errorSamples={samples['GET /v2/clients/{clientId}']?.errors}
        />

        <EndpointDoc
          method="POST"
          path="/v2/clients"
          description="Create a new client record."
          requiredScopes={['write:clients']}
          requestSample={samples['POST /v2/clients']?.request}
          responseSample={samples['POST /v2/clients']?.success}
          errorSamples={samples['POST /v2/clients']?.errors}
        />

        <EndpointDoc
          method="PUT"
          path="/v2/clients/{clientId}"
          description="Update existing client information."
          requiredScopes={['write:clients']}
          requestSample={samples['PUT /v2/clients/{clientId}']?.request}
          responseSample={samples['PUT /v2/clients/{clientId}']?.success}
        />

        <EndpointDoc
          method="DELETE"
          path="/v2/clients/{clientId}"
          description="Archive or delete a client record."
          requiredScopes={['delete:clients']}
          responseSample={samples['DELETE /v2/clients/{clientId}']?.success}
        />
      </>
    );
  }

  if (api.id === 'engagement-service') {
    return (
      <>
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
              description: 'Filter by status (draft, in-progress, complete)',
            },
            {
              name: 'efileStatus',
              type: 'string',
              required: false,
              description: 'Filter by e-file status',
            },
          ]}
          responseSample={samples['GET /v2/engagements']?.success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Engagement identifier' },
            { field: 'clientId', type: 'string', description: 'Associated client' },
            { field: 'year', type: 'integer', description: 'Tax year' },
            { field: 'returnType', type: 'string', description: 'Return form type' },
            { field: 'status', type: 'string', description: 'Engagement status' },
            { field: 'efileStatus', type: 'string', description: 'E-file status' },
          ]}
          errorSamples={samples['GET /v2/engagements']?.errors}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}"
          description="Get detailed engagement information."
          requiredScopes={['read:returns']}
          responseSample={samples['GET /v2/engagements/{engagementId}']?.success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Engagement identifier' },
            { field: 'clientId', type: 'string', description: 'Associated client' },
            { field: 'clientName', type: 'string', description: 'Client name' },
            { field: 'year', type: 'integer', description: 'Tax year' },
            { field: 'returnType', type: 'string', description: 'Return form type' },
            { field: 'status', type: 'string', description: 'Engagement status' },
            { field: 'efileStatus', type: 'string', description: 'E-file status' },
            { field: 'dueDate', type: 'string', description: 'Due date' },
          ]}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/returns"
          description="Get all tax returns for an engagement."
          requiredScopes={['read:returns']}
          responseSample={samples['GET /v2/engagements/{engagementId}/returns']?.success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Return identifier' },
            { field: 'formType', type: 'string', description: 'Tax form type' },
            { field: 'year', type: 'integer', description: 'Tax year' },
            { field: 'status', type: 'string', description: 'Return status' },
            { field: 'efileStatus', type: 'string', description: 'E-file status' },
            { field: 'calculations', type: 'object', description: 'Tax calculations (income, deductions, tax)' },
          ]}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/projects"
          description="Get project details for an engagement."
          requiredScopes={['read:returns']}
          responseSample={samples['GET /v2/engagements/{engagementId}/projects']?.success}
          responseFields={[
            { field: 'id', type: 'string', description: 'Project identifier' },
            { field: 'name', type: 'string', description: 'Project name' },
            { field: 'status', type: 'string', description: 'Project status' },
            { field: 'completionPercent', type: 'number', description: 'Completion percentage' },
          ]}
        />
      </>
    );
  }

  if (api.id === 'import-service') {
    return (
      <>
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
              description: 'Type of data (forms, client-data, prior-year)',
            },
            {
              name: 'source',
              type: 'string',
              required: false,
              description: 'Source system (quickbooks, adp, csv)',
            },
          ]}
          requestSample={samples['POST /v2/engagements/{engagementId}/import']?.request}
          responseSample={samples['POST /v2/engagements/{engagementId}/import']?.success}
          responseFields={[
            { field: 'importId', type: 'string', description: 'Import identifier' },
            { field: 'status', type: 'string', description: 'Import status' },
            { field: 'recordsImported', type: 'number', description: 'Records imported' },
          ]}
          errorSamples={samples['POST /v2/engagements/{engagementId}/import']?.errors}
        />

        <EndpointDoc
          method="POST"
          path="/v2/engagements/{engagementId}/import/validate"
          description="Validate import data before committing."
          requiredScopes={['write:returns']}
          requestSample={samples['POST /v2/engagements/{engagementId}/import/validate']?.request}
          responseSample={samples['POST /v2/engagements/{engagementId}/import/validate']?.success}
          responseFields={[
            { field: 'valid', type: 'boolean', description: 'Data is valid' },
            { field: 'warnings', type: 'array', description: 'Validation warnings (field, message)' },
          ]}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/import/history"
          description="Get import history for an engagement."
          requiredScopes={['read:returns']}
          responseSample={samples['GET /v2/engagements/{engagementId}/import/history']?.success}
          responseFields={[
            { field: 'importId', type: 'string', description: 'Import identifier' },
            { field: 'dataType', type: 'string', description: 'Data type imported' },
            { field: 'status', type: 'string', description: 'Import status' },
          ]}
        />
      </>
    );
  }

  if (api.id === 'export-service') {
    return (
      <>
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
              description: 'Export format (json, csv, xml, pdf)',
            },
          ]}
          responseSample={samples['GET /v2/engagements/{engagementId}/export']?.success}
          responseFields={[
            { field: 'exportId', type: 'string', description: 'Export identifier' },
            { field: 'format', type: 'string', description: 'Export format' },
            { field: 'status', type: 'string', description: 'Export status' },
            { field: 'data', type: 'object', description: 'Exported engagement data' },
          ]}
          errorSamples={samples['GET /v2/engagements/{engagementId}/export']?.errors}
        />

        <EndpointDoc
          method="GET"
          path="/v2/engagements/{engagementId}/export/forms"
          description="Export forms and schedules as PDFs."
          requiredScopes={['read:returns']}
          responseSample={samples['GET /v2/engagements/{engagementId}/export/forms']?.success}
          responseFields={[
            { field: 'exportId', type: 'string', description: 'Export identifier' },
            { field: 'format', type: 'string', description: 'Export format' },
            { field: 'files', type: 'array', description: 'Downloadable PDF files (formType, fileName, downloadUrl)' },
          ]}
        />

        <EndpointDoc
          method="POST"
          path="/v2/engagements/export/bulk"
          description="Export data from multiple engagements."
          requiredScopes={['read:returns', 'read:clients']}
          requestSample={samples['POST /v2/engagements/export/bulk']?.request}
          responseSample={samples['POST /v2/engagements/export/bulk']?.success}
          responseFields={[
            { field: 'exportId', type: 'string', description: 'Export identifier' },
            { field: 'status', type: 'string', description: 'Export status (processing, completed)' },
            { field: 'engagementCount', type: 'number', description: 'Number of engagements' },
            { field: 'downloadUrl', type: 'string', description: 'Download URL (null while processing)' },
          ]}
        />
      </>
    );
  }

  return null;
}
