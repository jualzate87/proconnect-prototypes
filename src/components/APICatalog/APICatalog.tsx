import React, { useState, useMemo } from 'react';
import { APICard } from './APICard';
import { APIDetailsModal } from './APIDetailsModal';
import { SearchFilter } from './SearchFilter';
import { ProConnectAdvantage } from './ProConnectAdvantage';
import apiCatalogData from '../../data/apiCatalog.json';
import { API } from '../../types';
import './APICatalog.css';

export const APICatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAPI, setSelectedAPI] = useState<API | null>(null);

  const apis = apiCatalogData as API[];

  const categories = useMemo(() => {
    const cats = new Set(apis.map((api) => api.category));
    return ['all', ...Array.from(cats)];
  }, [apis]);

  const filteredAPIs = useMemo(() => {
    return apis.filter((api) => {
      const matchesSearch =
        api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        api.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || api.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apis, searchQuery, selectedCategory]);

  return (
    <div className="api-catalog">
      <div className="api-catalog-header">
        <h1 className="api-catalog-title">API Catalog</h1>
        <p className="api-catalog-description">
          Browse and explore all available APIs to integrate with ProConnect Tax.
          Each API provides detailed information about endpoints, authentication,
          and usage examples.
        </p>
      </div>

      <ProConnectAdvantage />

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="api-catalog-grid">
        {filteredAPIs.map((api) => (
          <APICard key={api.id} api={api} onClick={() => setSelectedAPI(api)} />
        ))}
      </div>

      {selectedAPI && (
        <APIDetailsModal
          api={selectedAPI}
          isOpen={!!selectedAPI}
          onClose={() => setSelectedAPI(null)}
        />
      )}
    </div>
  );
};
