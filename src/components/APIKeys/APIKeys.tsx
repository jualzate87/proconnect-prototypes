import React, { useState } from 'react';
import { ConnectionWizard } from './ConnectionWizard';
import { KeyList } from './KeyList';
import { Button } from '../Shared/Button';
import apiKeysData from '../../data/apiKeys.json';
import { APIKey } from '../../types';
import './APIKeys.css';

export const APIKeys: React.FC = () => {
  const [keys, setKeys] = useState<APIKey[]>(apiKeysData as APIKey[]);
  const [showWizard, setShowWizard] = useState(false);

  const handleKeyGenerated = (newKey: APIKey) => {
    setKeys([newKey, ...keys]);
    setShowWizard(false);
  };

  const handleRevoke = (keyId: string) => {
    setKeys(keys.map((key) => 
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    ));
  };

  return (
    <div className="api-keys">
      <div className="api-keys-header">
        <div>
          <h1 className="api-keys-title">API Keys</h1>
          <p className="api-keys-description">
            Manage your API keys and credentials. Generate new keys, configure
            scopes, and monitor key usage.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowWizard(true)}>
          Generate New API Key
        </Button>
      </div>

      <KeyList keys={keys} onRevoke={handleRevoke} />

      {showWizard && (
        <ConnectionWizard
          isOpen={showWizard}
          onClose={() => setShowWizard(false)}
          onKeyGenerated={handleKeyGenerated}
        />
      )}
    </div>
  );
};
