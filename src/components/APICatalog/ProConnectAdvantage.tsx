import React from 'react';
import { Card } from '../Shared/Card';
import './ProConnectAdvantage.css';

export const ProConnectAdvantage: React.FC = () => {
  return (
    <div className="proconnect-advantage">
      <div className="advantage-hero">
        <h2 className="advantage-hero-title">The ProConnect Advantage</h2>
        <p className="advantage-hero-subtitle">
          Modern API architecture that treats tax data as a dynamic asset. Build
          integrations in hours, not weeks—no sales calls, no proprietary formats,
          no limitations.
        </p>
      </div>

      <div className="advantage-grid">
        <Card className="advantage-card">
          <div className="advantage-card-header">
            <div className="advantage-icon">🚀</div>
            <div className="advantage-badge">Modern Standard</div>
          </div>
          <h3 className="advantage-title">REST/JSON</h3>
          <p className="advantage-comparison">vs. XML/Proprietary</p>
          <p className="advantage-description">
            Use the modern web standard that powers Google, Stripe, and Slack.
            Lightweight, fast, and readable by any developer—no special drivers or
            Windows-only software required.
          </p>
        </Card>

        <Card className="advantage-card">
          <div className="advantage-card-header">
            <div className="advantage-icon">⚡</div>
            <div className="advantage-badge">Instant Access</div>
          </div>
          <h3 className="advantage-title">Self-Serve Keys</h3>
          <p className="advantage-comparison">vs. Sales-Assisted</p>
          <p className="advantage-description">
            Click a button and get your API key immediately. No sales calls, no
            contracts, no waiting days or weeks for manual account unlocks.
          </p>
        </Card>

        <Card className="advantage-card">
          <div className="advantage-card-header">
            <div className="advantage-icon">💡</div>
            <div className="advantage-badge">Live Data</div>
          </div>
          <h3 className="advantage-title">Native Planning Engine</h3>
          <p className="advantage-comparison">vs. Document Export Only</p>
          <p className="advantage-description">
            Access live, interactive tax data—not just final PDFs. Query the tax
            engine in real-time: "What if I change this deduction?" Get instant
            answers for true advisory capabilities.
          </p>
        </Card>
      </div>
    </div>
  );
};
