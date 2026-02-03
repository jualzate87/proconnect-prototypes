import React from 'react';
import scopesData from '../../data/scopes.json';
import type { Scope } from '../../types';
import './ScopeSelector.css';

interface ScopeSelectorProps {
  selectedScopes: string[];
  onScopesChange: (scopes: string[]) => void;
}

const scopes = scopesData as Scope[];

export const ScopeSelector: React.FC<ScopeSelectorProps> = ({
  selectedScopes,
  onScopesChange,
}) => {
  const groupedScopes = scopes.reduce((acc, scope) => {
    if (!acc[scope.category]) {
      acc[scope.category] = [];
    }
    acc[scope.category].push(scope);
    return acc;
  }, {} as Record<string, Scope[]>);

  const handleToggle = (scopeId: string) => {
    if (selectedScopes.includes(scopeId)) {
      onScopesChange(selectedScopes.filter((id) => id !== scopeId));
    } else {
      onScopesChange([...selectedScopes, scopeId]);
    }
  };

  return (
    <div className="scope-selector">
      {Object.entries(groupedScopes).map(([category, categoryScopes]) => (
        <div key={category} className="scope-category">
          <h4 className="scope-category-title">{category}</h4>
          <div className="scope-list">
            {categoryScopes.map((scope) => (
              <label key={scope.id} className="scope-item">
                <input
                  type="checkbox"
                  checked={selectedScopes.includes(scope.id)}
                  onChange={() => handleToggle(scope.id)}
                />
                <div className="scope-item-content">
                  <div className="scope-item-name">{scope.name}</div>
                  <div className="scope-item-description">{scope.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
