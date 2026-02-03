import React, { useState } from 'react';
import { Table } from '../Shared/Table';
import { Badge } from '../Shared/Badge';
import { Button } from '../Shared/Button';
import { Modal } from '../Shared/Modal';
import { APIKey } from '../../types';
import './KeyList.css';

interface KeyListProps {
  keys: APIKey[];
  onRevoke: (keyId: string) => void;
}

export const KeyList: React.FC<KeyListProps> = ({ keys, onRevoke }) => {
  const [revokeKeyId, setRevokeKeyId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Key Name',
      render: (key: APIKey) => (
        <div>
          <div className="key-name">{key.name}</div>
          {key.description && (
            <div className="key-description">{key.description}</div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (key: APIKey) => (
        <Badge
          variant={key.status === 'active' ? 'success' : 'error'}
          size="sm"
        >
          {key.status}
        </Badge>
      ),
    },
    {
      key: 'scopes',
      header: 'Scopes',
      render: (key: APIKey) => (
        <div className="key-scopes">
          {key.scopes.slice(0, 2).map((scope) => (
            <Badge key={scope} variant="neutral" size="sm">
              {scope.split(':')[1]}
            </Badge>
          ))}
          {key.scopes.length > 2 && (
            <span className="key-scopes-more">+{key.scopes.length - 2} more</span>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (key: APIKey) => formatDate(key.createdAt),
    },
    {
      key: 'lastUsed',
      header: 'Last Used',
      render: (key: APIKey) =>
        key.lastUsed ? formatDate(key.lastUsed) : 'Never',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (key: APIKey) => (
        <div className="key-actions">
          {key.status === 'active' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setRevokeKeyId(key.id)}
            >
              Revoke
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table<APIKey> columns={columns} data={keys} />
      {revokeKeyId && (
        <Modal
          isOpen={!!revokeKeyId}
          onClose={() => setRevokeKeyId(null)}
          title="Revoke API Key"
          size="sm"
        >
          <div className="revoke-modal">
            <p>
              Are you sure you want to revoke this API key? This action cannot
              be undone and will immediately stop all API requests using this
              key.
            </p>
            <div className="revoke-modal-actions">
              <Button variant="secondary" onClick={() => setRevokeKeyId(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onRevoke(revokeKeyId);
                  setRevokeKeyId(null);
                }}
              >
                Revoke Key
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
