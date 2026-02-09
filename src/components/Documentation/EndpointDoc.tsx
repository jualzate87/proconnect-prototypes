import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Badge } from '../Shared/Badge';
import './EndpointDoc.css';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface EndpointDocProps {
  method: string;
  path: string;
  description: string;
  requiredScopes?: string[];
  parameters?: Parameter[];
  requestSample?: any;
  responseSample?: any;
  responseFields?: Array<{
    field: string;
    type: string;
    description: string;
  }>;
  errorSamples?: Record<string, any>;
}

export const EndpointDoc: React.FC<EndpointDocProps> = ({
  method,
  path,
  description,
  requiredScopes,
  parameters,
  requestSample,
  responseSample,
  responseFields,
  errorSamples,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJs, setCopiedJs] = useState(false);

  const methodVariant =
    method === 'GET'
      ? 'info'
      : method === 'POST'
      ? 'success'
      : method === 'PUT'
      ? 'warning'
      : 'error';

  const baseUrl = 'https://api.proconnect.intuit.com';
  
  // Build curl example
  const curlExample = `curl ${baseUrl}${path}${parameters && parameters.length > 0 ? '?param=value' : ''} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"${requestSample ? ` \\
  -d '${JSON.stringify(requestSample, null, 2)}'` : ''}`;

  // Build JavaScript example
  const jsExample = requestSample
    ? `const response = await fetch(
  '${baseUrl}${path}',
  {
    method: '${method}',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(${JSON.stringify(requestSample, null, 2)})
  }
);

const data = await response.json();
console.log(data);`
    : `const response = await fetch(
  '${baseUrl}${path}${parameters && parameters.length > 0 ? '?param=value' : ''}',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const data = await response.json();
console.log(data);`;

  const handleCopy = (text: string, type: 'curl' | 'js') => {
    navigator.clipboard.writeText(text);
    if (type === 'curl') {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    } else {
      setCopiedJs(true);
      setTimeout(() => setCopiedJs(false), 2000);
    }
  };

  return (
    <div className="endpoint-doc">
      <button
        className="endpoint-doc-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="endpoint-doc-header-content">
          <div className="endpoint-doc-method-path">
            <Badge variant={methodVariant} size="md">
              {method}
            </Badge>
            <code className="endpoint-doc-path">{path}</code>
          </div>
          <p className="endpoint-doc-description">{description}</p>
        </div>
        <svg
          className={`endpoint-doc-chevron ${isExpanded ? 'endpoint-doc-chevron-expanded' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="endpoint-doc-content">{renderContent()}</div>
      )}
    </div>
  );

  function renderContent() {
    return (
      <>

      {requiredScopes && requiredScopes.length > 0 && (
        <div className="endpoint-doc-section">
          <h4 className="endpoint-doc-section-title">Required Scopes</h4>
          <div className="endpoint-doc-scopes">
            {requiredScopes.map((scope, index) => (
              <code key={index} className="endpoint-doc-scope">
                {scope}
              </code>
            ))}
          </div>
        </div>
      )}

      {parameters && parameters.length > 0 && (
        <div className="endpoint-doc-section">
          <h4 className="endpoint-doc-section-title">Parameters</h4>
          <div className="endpoint-doc-table-wrapper">
            <table className="endpoint-doc-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index}>
                    <td>
                      <code>{param.name}</code>
                    </td>
                    <td>
                      <span className="endpoint-doc-type">{param.type}</span>
                    </td>
                    <td>
                      {param.required ? (
                        <Badge variant="error" size="sm">
                          Required
                        </Badge>
                      ) : (
                        <span className="endpoint-doc-optional">Optional</span>
                      )}
                    </td>
                    <td>{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="endpoint-doc-section">
        <h4 className="endpoint-doc-section-title">Sample Request</h4>
        <div className="endpoint-doc-code-tabs">
          <div className="endpoint-doc-code-tab">
            <div className="endpoint-doc-code-header">
              <span>cURL</span>
              <button
                className="endpoint-doc-copy-btn"
                onClick={() => handleCopy(curlExample, 'curl')}
              >
                {copiedCurl ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <CodeBlock language="bash" code={curlExample} />
          </div>
          <div className="endpoint-doc-code-tab">
            <div className="endpoint-doc-code-header">
              <span>JavaScript</span>
              <button
                className="endpoint-doc-copy-btn"
                onClick={() => handleCopy(jsExample, 'js')}
              >
                {copiedJs ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <CodeBlock language="javascript" code={jsExample} />
          </div>
        </div>
      </div>

      {responseSample && (
        <div className="endpoint-doc-section">
          <h4 className="endpoint-doc-section-title">Sample Response</h4>
          <div className="endpoint-doc-response-status">
            <Badge variant="success">200 OK</Badge>
          </div>
          <CodeBlock
            language="json"
            code={JSON.stringify(responseSample, null, 2)}
          />
        </div>
      )}

      {responseFields && responseFields.length > 0 && (
        <div className="endpoint-doc-section">
          <h4 className="endpoint-doc-section-title">Response Fields</h4>
          <div className="endpoint-doc-table-wrapper">
            <table className="endpoint-doc-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {responseFields.map((field, index) => (
                  <tr key={index}>
                    <td>
                      <code>{field.field}</code>
                    </td>
                    <td>
                      <span className="endpoint-doc-type">{field.type}</span>
                    </td>
                    <td>{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {errorSamples && Object.keys(errorSamples).length > 0 && (
        <div className="endpoint-doc-section">
          <h4 className="endpoint-doc-section-title">Error Responses</h4>
          {Object.entries(errorSamples).map(([statusCode, errorData]) => (
            <div key={statusCode} className="endpoint-doc-error">
              <div className="endpoint-doc-response-status">
                <Badge variant="error">{statusCode} {getStatusText(statusCode)}</Badge>
              </div>
              <CodeBlock language="json" code={JSON.stringify(errorData, null, 2)} />
            </div>
          ))}
        </div>
      )}
      </>
    );
  }
};

function getStatusText(code: string): string {
  const statusTexts: Record<string, string> = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '429': 'Too Many Requests',
    '500': 'Internal Server Error',
  };
  return statusTexts[code] || '';
}
