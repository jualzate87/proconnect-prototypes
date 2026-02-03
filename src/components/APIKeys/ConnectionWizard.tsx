import React, { useState } from 'react';
import { Modal } from '../Shared/Modal';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';
import { ScopeSelector } from './ScopeSelector';
import { APIKey } from '../../types';
import './ConnectionWizard.css';

interface ConnectionWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyGenerated: (key: APIKey) => void;
}

export const ConnectionWizard: React.FC<ConnectionWizardProps> = ({
  isOpen,
  onClose,
  onKeyGenerated,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [generatedKey, setGeneratedKey] = useState<string>('');

  const handleNext = () => {
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && selectedScopes.length > 0) {
      // Generate a mock API key
      const mockKey = `pk_live_${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;
      setGeneratedKey(mockKey);
      setStep(3);
    }
  };

  const handleFinish = () => {
    const newKey: APIKey = {
      id: `key-${Date.now()}`,
      name,
      description,
      key: generatedKey,
      status: 'active',
      scopes: selectedScopes,
      createdAt: new Date().toISOString(),
      clientName: name,
    };
    onKeyGenerated(newKey);
    // Reset form
    setStep(1);
    setName('');
    setDescription('');
    setSelectedScopes([]);
    setGeneratedKey('');
  };

  const handleClose = () => {
    setStep(1);
    setName('');
    setDescription('');
    setSelectedScopes([]);
    setGeneratedKey('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Generate API Key"
      size="lg"
    >
      <div className="wizard">
        <div className="wizard-steps">
          <div className={`wizard-step ${step >= 1 ? 'wizard-step-active' : ''}`}>
            <div className="wizard-step-number">1</div>
            <div className="wizard-step-label">Credentials</div>
          </div>
          <div className={`wizard-step ${step >= 2 ? 'wizard-step-active' : ''}`}>
            <div className="wizard-step-number">2</div>
            <div className="wizard-step-label">Scopes</div>
          </div>
          <div className={`wizard-step ${step >= 3 ? 'wizard-step-active' : ''}`}>
            <div className="wizard-step-number">3</div>
            <div className="wizard-step-label">Token</div>
          </div>
        </div>

        <div className="wizard-content">
          {step === 1 && (
            <div className="wizard-step-content">
              <h3 className="wizard-step-title">Generate Credentials</h3>
              <p className="wizard-step-description">
                Provide a name and description for your API key to help you
                identify it later.
              </p>
              <div className="wizard-form">
                <Input
                  label="Key Name"
                  placeholder="e.g., Production - Karbon Integration"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Description (Optional)"
                  placeholder="Describe what this key will be used for"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step-content">
              <h3 className="wizard-step-title">Configure Scopes</h3>
              <p className="wizard-step-description">
                Select the permissions this API key should have. Use the
                principle of least privilege.
              </p>
              <ScopeSelector
                selectedScopes={selectedScopes}
                onScopesChange={setSelectedScopes}
              />
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step-content">
              <h3 className="wizard-step-title">Copy Production Token</h3>
              <p className="wizard-step-description">
                Your API key has been generated. Copy it now - you won't be able
                to see it again!
              </p>
              <div className="wizard-token">
                <div className="wizard-token-display">
                  <code className="wizard-token-code">{generatedKey}</code>
                  <button
                    className="wizard-token-copy"
                    onClick={async () => {
                      await navigator.clipboard.writeText(generatedKey);
                      alert('API key copied to clipboard!');
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div className="wizard-callout wizard-callout-warning">
                  <strong>Important:</strong> Store this key securely. It provides
                  full access to your ProConnect Tax data based on the selected
                  scopes.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="wizard-actions">
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <div className="wizard-actions-right">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={
                  (step === 1 && !name.trim()) ||
                  (step === 2 && selectedScopes.length === 0)
                }
              >
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={handleFinish}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
