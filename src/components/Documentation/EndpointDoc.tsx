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

interface RequestBodyField {
  name: string;
  type: string;
  required: boolean | string; // Can be boolean or "Conditionally required"
  description: string;
  children?: RequestBodyField[]; // For nested objects
}

interface EndpointDocProps {
  method: string;
  path: string;
  description: string;
  requiredScopes?: string[];
  queryParameters?: Parameter[]; // Query parameters
  requestBodyFields?: RequestBodyField[]; // Request body attributes
  parameters?: Parameter[]; // Legacy support - maps to queryParameters
  requestSample?: any;
  responseSample?: any;
  responseFields?: Array<{
    field: string;
    type: string;
    description: string;
  }>;
}

export const EndpointDoc: React.FC<EndpointDocProps> = ({
  method,
  path,
  description,
  requiredScopes,
  queryParameters,
  requestBodyFields,
  parameters, // Legacy support
  requestSample,
  responseSample,
  responseFields,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const methodVariant =
    method === 'GET'
      ? 'info'
      : method === 'POST'
      ? 'success'
      : method === 'PUT'
      ? 'warning'
      : 'error';

  const baseUrl = 'https://api.proconnect.intuit.com';
  
  // Use queryParameters if provided, otherwise fall back to parameters for legacy support
  const effectiveQueryParams = queryParameters || parameters;

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
    const hasAttributes = (effectiveQueryParams && effectiveQueryParams.length > 0) || 
                         (requestBodyFields && requestBodyFields.length > 0);

    return (
      <>
        {/* Attributes Section - Combining query parameters and request body fields */}
        {hasAttributes && (
          <div className="endpoint-doc-section">
            <h4 className="endpoint-doc-section-title">Attributes</h4>
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
                  {/* Render query parameters first */}
                  {effectiveQueryParams && effectiveQueryParams.map((param, index) => (
                    <tr key={`query-${index}`}>
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
                  {/* Render request body fields */}
                  {requestBodyFields && requestBodyFields.map((field, index) => (
                    <tr key={`body-${index}`}>
                      <td>
                        <code>{field.name}</code>
                      </td>
                      <td>
                        <span className="endpoint-doc-type">{field.type}</span>
                      </td>
                      <td>
                        {typeof field.required === 'string' ? (
                          <span className="endpoint-doc-conditional">{field.required}</span>
                        ) : field.required ? (
                          <Badge variant="error" size="sm">
                            Required
                          </Badge>
                        ) : (
                          <span className="endpoint-doc-optional">Optional</span>
                        )}
                      </td>
                      <td>{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Request URL Section */}
        <div className="endpoint-doc-section">
          <h4 className="endpoint-doc-section-title">Request URL</h4>
          <div className="endpoint-doc-request-url">
            <Badge variant={methodVariant} size="md">
              {method}
            </Badge>
            <code className="endpoint-doc-url">{baseUrl}{path}</code>
          </div>
        </div>

        {/* Request Body Section */}
        {requestSample && (
          <div className="endpoint-doc-section">
            <h4 className="endpoint-doc-section-title">Request Body</h4>
            <CodeBlock
              language="json"
              code={JSON.stringify(requestSample, null, 2)}
            />
          </div>
        )}

        {/* Returns Section */}
        {responseSample && (
          <div className="endpoint-doc-section">
            <h4 className="endpoint-doc-section-title">Returns</h4>
            <div className="endpoint-doc-response-status">
              <Badge variant="success">200 OK</Badge>
            </div>
            <CodeBlock
              language="json"
              code={JSON.stringify(responseSample, null, 2)}
            />
          </div>
        )}

        {/* Response Fields - Keep this for additional documentation */}
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

        {/* Required Scopes - Move to bottom, less prominent */}
        {requiredScopes && requiredScopes.length > 0 && (
          <div className="endpoint-doc-section endpoint-doc-scopes-section">
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
      </>
    );
  }
};
