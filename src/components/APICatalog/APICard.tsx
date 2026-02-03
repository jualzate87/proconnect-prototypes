import React from 'react';
import { Card } from '../Shared/Card';
import { Badge } from '../Shared/Badge';
import { API } from '../../types';
import './APICard.css';

interface APICardProps {
  api: API;
  onClick: () => void;
}

export const APICard: React.FC<APICardProps> = ({ api, onClick }) => {
  return (
    <Card className="api-card" hover onClick={onClick}>
      <div className="api-card-header">
        <div className="api-card-icon">{api.icon || '🔌'}</div>
        <Badge variant="info" size="sm">
          {api.category}
        </Badge>
      </div>
      <h3 className="api-card-title">{api.name}</h3>
      <p className="api-card-description">{api.description}</p>
      <div className="api-card-footer">
        <span className="api-card-endpoints">
          {api.endpoints.length} endpoint{api.endpoints.length !== 1 ? 's' : ''}
        </span>
        <span className="api-card-arrow">→</span>
      </div>
    </Card>
  );
};
