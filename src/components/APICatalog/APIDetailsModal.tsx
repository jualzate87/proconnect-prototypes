import React from 'react';
import { Modal } from '../Shared/Modal';
import { Button } from '../Shared/Button';
import { Badge } from '../Shared/Badge';
import { API } from '../../types';
import './APIDetailsModal.css';

interface APIDetailsModalProps {
  api: API;
  isOpen: boolean;
  onClose: () => void;
  onOpenDocumentation: (api: API) => void;
}

export const APIDetailsModal: React.FC<APIDetailsModalProps> = ({
  api,
  isOpen,
  onClose,
  onOpenDocumentation,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={api.name}
      size="lg"
      slideOver
    >
      <div className="api-details">
        <div className="api-details-header">
          <Badge variant="info">{api.category}</Badge>
          <p className="api-details-description">{api.description}</p>
        </div>

        <div className="api-details-section">
          <h3 className="api-details-section-title">How It Works</h3>
          <div className="api-details-logic-flow">
            {api.logicFlow.split('→').map((step, index) => (
              <div key={index} className="logic-step">
                <span className="logic-step-number">{index + 1}</span>
                <span className="logic-step-text">{step.trim()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="api-details-section">
          <h3 className="api-details-section-title">Use Case</h3>
          <p className="api-details-use-case">{api.useCase}</p>
        </div>

        <div className="api-details-section">
          <h3 className="api-details-section-title">Endpoints</h3>
          <div className="api-details-endpoints">
            {api.endpoints.map((endpoint, index) => (
              <div key={index} className="endpoint-item">
                <div className="endpoint-method">
                  <Badge
                    variant={
                      endpoint.method === 'GET'
                        ? 'info'
                        : endpoint.method === 'POST'
                        ? 'success'
                        : endpoint.method === 'PUT'
                        ? 'warning'
                        : 'error'
                    }
                  >
                    {endpoint.method}
                  </Badge>
                  <code className="endpoint-path">{endpoint.path}</code>
                </div>
                <p className="endpoint-description">{endpoint.description}</p>
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div className="endpoint-parameters">
                    <strong>Parameters:</strong>
                    <ul>
                      {endpoint.parameters.map((param, pIndex) => (
                        <li key={pIndex}>
                          <code>{param.name}</code> ({param.type})
                          {param.required && (
                            <Badge variant="error" size="sm">
                              Required
                            </Badge>
                          )}
                          {' - '}
                          {param.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="api-details-actions">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={() => {
            window.location.href = '/settings/api-portal/keys';
            onClose();
          }}>
            Generate API Key
          </Button>
          <Button variant="primary" onClick={() => {
            onOpenDocumentation(api);
          }}>
            View Full Documentation
          </Button>
        </div>
      </div>
    </Modal>
  );
};
