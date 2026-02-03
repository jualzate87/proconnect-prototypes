import React, { useState } from 'react';
import './Home.css';

const returns = [
  { client: 'Wells, Jordan', returnName: 'Wells, Jordan', assignee: 'Sonia Miller', status: 'Not started' },
  { client: 'Melissa Tahan', returnName: 'Tahan, Melissa', assignee: 'Brandon Williams', status: 'Not started' },
  { client: 'Melissa London', returnName: 'London, Melissa', assignee: 'Sonia Miller', status: 'Not started' },
  { client: 'Anne Seurat', returnName: 'Seurat, Anne', assignee: 'Sonia Miller', status: 'Not started' },
  { client: 'Stephanie Zau', returnName: 'Zau, Stephanie', assignee: 'Sonia Miller', status: 'Not started' },
  { client: 'Andy Hoobing', returnName: 'Hoobing, Andy', assignee: 'Sonia Miller', status: 'Not started' },
  { client: 'Yvonne Hobbs', returnName: 'Hobbs, Yvonne', assignee: 'Sonia Miller', status: 'Not started' },
  { client: 'Shannon Carus', returnName: 'Carus, Shannon', assignee: 'Brandon Williams', status: 'Not started' },
  { client: 'Lisa Pifko', returnName: 'Pifko, Lisa', assignee: 'Brandon Williams', status: 'Not started' },
  { client: 'Bill Smith', returnName: 'Smith, Bill', assignee: 'Sonia Miller', status: 'Not started' },
];

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('by-return-type');
  const [activeReturnType, setActiveReturnType] = useState('all');

  return (
    <div className="tax-hub">
      <div className="tax-hub-header">
        <div className="tax-hub-title-section">
          <h1 className="tax-hub-title">Tax Returns 2025 <span className="tax-hub-dropdown-icon">▾</span></h1>
        </div>
        <div className="tax-hub-actions">
          <button className="tax-hub-btn-secondary">Batch actions ▾</button>
          <button className="tax-hub-btn-primary">Create tax return</button>
        </div>
      </div>

      <div className="tax-hub-tabs">
        <button 
          className={`tax-hub-tab ${activeTab === 'by-return-type' ? 'active' : ''}`}
          onClick={() => setActiveTab('by-return-type')}
        >
          By return type
        </button>
        <button 
          className={`tax-hub-tab ${activeTab === 'by-efile' ? 'active' : ''}`}
          onClick={() => setActiveTab('by-efile')}
        >
          By e-file progress
        </button>
        <button 
          className={`tax-hub-tab ${activeTab === 'by-signature' ? 'active' : ''}`}
          onClick={() => setActiveTab('by-signature')}
        >
          By eSignature status
        </button>
        <button 
          className={`tax-hub-tab ${activeTab === 'by-status' ? 'active' : ''}`}
          onClick={() => setActiveTab('by-status')}
        >
          By return status
        </button>
        <button 
          className={`tax-hub-tab ${activeTab === 'by-assignee' ? 'active' : ''}`}
          onClick={() => setActiveTab('by-assignee')}
        >
          By assignee
        </button>
      </div>

      <div className="tax-hub-status-cards">
        <button 
          className={`tax-hub-status-card ${activeReturnType === 'all' ? 'active' : ''}`}
          onClick={() => setActiveReturnType('all')}
        >
          <div className="status-card-header">
            <span className="status-card-title">All</span>
            <span className="status-card-count">10</span>
          </div>
          <div className="status-card-stats">
            <div className="status-stat"><span className="status-number">0</span> Rejected</div>
            <div className="status-stat"><span className="status-number">10</span> Not e-filed</div>
            <div className="status-stat"><span className="status-number">0</span> Transmitted</div>
            <div className="status-stat"><span className="status-number">0</span> Accepted</div>
          </div>
        </button>

        <button 
          className={`tax-hub-status-card ${activeReturnType === '1040' ? 'active' : ''}`}
          onClick={() => setActiveReturnType('1040')}
        >
          <div className="status-card-header">
            <span className="status-card-title">1040 <span className="status-card-type">Individual</span></span>
            <span className="status-card-count">5</span>
          </div>
          <div className="status-card-stats">
            <div className="status-stat"><span className="status-number">0</span> Rejected</div>
            <div className="status-stat"><span className="status-number">5</span> Not e-filed</div>
            <div className="status-stat"><span className="status-number">0</span> Transmitted</div>
            <div className="status-stat"><span className="status-number">0</span> Accepted</div>
          </div>
        </button>

        <button 
          className={`tax-hub-status-card ${activeReturnType === '1120' ? 'active' : ''}`}
          onClick={() => setActiveReturnType('1120')}
        >
          <div className="status-card-header">
            <span className="status-card-title">1120 <span className="status-card-type">Corporate</span></span>
            <span className="status-card-count">0</span>
          </div>
          <div className="status-card-stats">
            <div className="status-stat"><span className="status-number">0</span> Rejected</div>
            <div className="status-stat"><span className="status-number">0</span> Not e-filed</div>
            <div className="status-stat"><span className="status-number">0</span> Transmitted</div>
            <div className="status-stat"><span className="status-number">0</span> Accepted</div>
          </div>
        </button>

        <button 
          className={`tax-hub-status-card ${activeReturnType === '1065' ? 'active' : ''}`}
          onClick={() => setActiveReturnType('1065')}
        >
          <div className="status-card-header">
            <span className="status-card-title">1065 <span className="status-card-type">Partnership</span></span>
            <span className="status-card-count">0</span>
          </div>
          <div className="status-card-stats">
            <div className="status-stat"><span className="status-number">0</span> Rejected</div>
            <div className="status-stat"><span className="status-number">0</span> Not e-filed</div>
            <div className="status-stat"><span className="status-number">0</span> Transmitted</div>
            <div className="status-stat"><span className="status-number">0</span> Accepted</div>
          </div>
        </button>

        <button 
          className={`tax-hub-status-card ${activeReturnType === '1120s' ? 'active' : ''}`}
          onClick={() => setActiveReturnType('1120s')}
        >
          <div className="status-card-header">
            <span className="status-card-title">1120S <span className="status-card-type">S-Corporate</span></span>
            <span className="status-card-count">5</span>
          </div>
          <div className="status-card-stats">
            <div className="status-stat"><span className="status-number">0</span> Rejected</div>
            <div className="status-stat"><span className="status-number">5</span> Not e-filed</div>
            <div className="status-stat"><span className="status-number">0</span> Transmitted</div>
            <div className="status-stat"><span className="status-number">0</span> Accepted</div>
          </div>
        </button>
      </div>

      <div className="tax-hub-table-section">
        <div className="tax-hub-table-header">
          <div className="tax-hub-filter">
            <span className="tax-hub-filter-label">2025 - All</span>
            <input type="text" placeholder="Filter" className="tax-hub-filter-input" />
          </div>
          <div className="tax-hub-table-actions">
            <button className="tax-hub-icon-btn" aria-label="Refresh">⟳</button>
            <button className="tax-hub-icon-btn" aria-label="Download">↓</button>
            <button className="tax-hub-icon-btn" aria-label="Settings">⚙</button>
          </div>
        </div>

        <div className="tax-hub-table-wrapper">
          <table className="tax-hub-table">
            <thead>
              <tr>
                <th>CLIENT NAME</th>
                <th>RETURN NAME</th>
                <th>ASSIGNEE</th>
                <th>DATA</th>
                <th>STATUS</th>
                <th>ESIGNATURE</th>
                <th>FEDERAL EFILE</th>
                <th>STATE EFILE</th>
                <th>DELIVERABLES</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnItem, index) => (
                <tr key={index}>
                  <td className="tax-hub-cell-name">{returnItem.client}</td>
                  <td className="tax-hub-cell-link">{returnItem.returnName}</td>
                  <td>
                    <span className="tax-hub-assignee">{returnItem.assignee} ▾</span>
                  </td>
                  <td>
                    <button className="tax-hub-action-link">Send a request</button>
                  </td>
                  <td className="tax-hub-cell-status">{returnItem.status}</td>
                  <td className="tax-hub-cell-muted">Not sent</td>
                  <td className="tax-hub-cell-muted">Not e-filed</td>
                  <td className="tax-hub-cell-muted">Not e-filed</td>
                  <td></td>
                  <td>
                    <button className="tax-hub-btn-view">View return ▾</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tax-hub-pagination">
          <span className="tax-hub-pagination-info">1-10 of 160 items</span>
          <div className="tax-hub-pagination-controls">
            <button className="tax-hub-pagination-btn">‹</button>
            <button className="tax-hub-pagination-btn active">1</button>
            <button className="tax-hub-pagination-btn">2</button>
            <button className="tax-hub-pagination-btn">3</button>
            <button className="tax-hub-pagination-btn">4</button>
            <button className="tax-hub-pagination-btn">5</button>
            <span className="tax-hub-pagination-ellipsis">...</span>
            <button className="tax-hub-pagination-btn">16</button>
            <button className="tax-hub-pagination-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};
