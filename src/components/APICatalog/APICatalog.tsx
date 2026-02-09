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
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

      <div className="api-catalog-cta">
        <button 
          className="api-catalog-signup-btn"
          onClick={() => setShowSignupModal(true)}
        >
          Sign Up to Access APIs
        </button>
      </div>

      {selectedAPI && (
        <APIDetailsModal
          api={selectedAPI}
          isOpen={!!selectedAPI}
          onClose={() => setSelectedAPI(null)}
        />
      )}

      {showSignupModal && (
        <div className="signup-modal-overlay" onClick={() => setShowSignupModal(false)}>
          <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <h2 className="signup-modal-title">Sign Up to Access APIs</h2>
                <p className="signup-modal-description">
                  Enter your lead engineer's email to start the integration process. 
                  We'll contact you with next steps.
                </p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Lead Engineer Email:', email);
                  setSubmitted(true);
                }}>
                  <div className="signup-modal-field">
                    <label htmlFor="email">Lead Engineer Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@firm.com"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="signup-modal-actions">
                    <button 
                      type="button"
                      className="signup-modal-btn-secondary"
                      onClick={() => setShowSignupModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="signup-modal-btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="signup-modal-success">
                  <div className="signup-modal-success-icon">✓</div>
                  <h2 className="signup-modal-title">Thank You!</h2>
                  <p className="signup-modal-description">
                    We've received your request. Our team will contact you at {email} to 
                    start the integration process.
                  </p>
                  <button 
                    className="signup-modal-btn-primary"
                    onClick={() => {
                      setShowSignupModal(false);
                      setSubmitted(false);
                      setEmail('');
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
