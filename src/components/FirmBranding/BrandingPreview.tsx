import React from 'react';
import './BrandingPreview.css';
import { DeliverableType, BrandingAssets } from './FirmBranding';

interface BrandingPreviewProps {
  selectedDeliverable: DeliverableType;
  onDeliverableChange: (type: DeliverableType) => void;
  brandingAssets: BrandingAssets;
}

export const BrandingPreview: React.FC<BrandingPreviewProps> = ({
  selectedDeliverable,
  onDeliverableChange,
  brandingAssets,
}) => {
  const deliverableTypes = [
    { id: 'invoices' as DeliverableType, label: 'Invoices', icon: '📄' },
    { id: 'letters' as DeliverableType, label: 'Client letters', icon: '✉️' },
    { id: 'emails' as DeliverableType, label: 'Emails', icon: '📧' },
    { id: 'signIn' as DeliverableType, label: 'Client sign in', icon: '🔐' },
  ];

  const renderPreviewContent = () => {
    switch (selectedDeliverable) {
      case 'invoices':
        return (
          <div className="preview-document preview-invoice">
            {brandingAssets.logo && (
              <div className="preview-logo">
                <img src={brandingAssets.logo as string} alt="Firm logo" />
              </div>
            )}
            <div className="preview-header">
              <h2>ABC Accounting Firm</h2>
              <p>123 Main Street, Suite 100</p>
              <p>City, State 12345</p>
            </div>
            <div className="preview-title">
              <h1>INVOICE</h1>
              <p>Invoice #: 2024-001</p>
              <p>Date: February 2, 2026</p>
            </div>
            <div className="preview-content">
              <div className="preview-section">
                <h3>Bill To:</h3>
                <p>Client Name</p>
                <p>Client Address</p>
              </div>
              <div className="preview-table">
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tax Preparation Services</td>
                      <td>$500.00</td>
                    </tr>
                    <tr>
                      <td>Consultation</td>
                      <td>$150.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>$650.00</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        );

      case 'letters':
        return (
          <div className="preview-document preview-letter">
            {brandingAssets.logo && (
              <div className="preview-logo">
                <img src={brandingAssets.logo as string} alt="Firm logo" />
              </div>
            )}
            <div className="preview-header">
              <h2>ABC Accounting Firm</h2>
              <p>123 Main Street, Suite 100</p>
              <p>City, State 12345</p>
            </div>
            <div className="preview-date">February 2, 2026</div>
            <div className="preview-content">
              <p><strong>Dear Valued Client,</strong></p>
              <p>
                We are writing to inform you about your upcoming tax filing deadline. 
                Our team has been working diligently to ensure all your documents are in order.
              </p>
              <p>
                Please review the attached documents and let us know if you have any questions 
                or concerns. We are here to help you navigate the tax filing process.
              </p>
              <p>Thank you for your continued trust in our services.</p>
              <p><strong>Sincerely,</strong></p>
              <p>ABC Accounting Firm Team</p>
            </div>
          </div>
        );

      case 'emails':
        return (
          <div className="preview-document preview-email">
            <div className="preview-email-header">
              <div className="preview-email-row">
                <span className="preview-email-label">From:</span>
                <span>ABC Accounting Firm &lt;noreply@abcaccounting.com&gt;</span>
              </div>
              <div className="preview-email-row">
                <span className="preview-email-label">To:</span>
                <span>client@example.com</span>
              </div>
              <div className="preview-email-row">
                <span className="preview-email-label">Subject:</span>
                <span>Invitation to Review Your Tax Documents</span>
              </div>
            </div>
            <div className="preview-email-body">
              {brandingAssets.logo && (
                <div className="preview-logo">
                  <img src={brandingAssets.logo as string} alt="Firm logo" />
                </div>
              )}
              <h2>You're invited to review your tax documents</h2>
              <p>Hello,</p>
              <p>
                Your tax documents are ready for review. Please click the button below 
                to securely access your documents through our client portal.
              </p>
              <div className="preview-email-button">
                <button>Review Documents</button>
              </div>
              <p>
                If you have any questions, please don't hesitate to contact us.
              </p>
              <p className="preview-email-footer">
                © 2026 ABC Accounting Firm. All rights reserved.
              </p>
            </div>
          </div>
        );

      case 'signIn':
        return (
          <div className="preview-document preview-signin">
            <div className="preview-signin-container">
              {brandingAssets.logo && (
                <div className="preview-logo">
                  <img src={brandingAssets.logo as string} alt="Firm logo" />
                </div>
              )}
              <h2>Welcome to ABC Accounting Firm</h2>
              <p>Sign in to access your client portal</p>
              <div className="preview-signin-form">
                <div className="preview-input-group">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" disabled />
                </div>
                <div className="preview-input-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" disabled />
                </div>
                <button className="preview-signin-button">Sign In</button>
                <a href="#" className="preview-signin-link">Forgot password?</a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="branding-preview">
      <div className="branding-preview-sidebar">
        <h3 className="branding-preview-sidebar-title">Select deliverable type</h3>
        <div className="branding-preview-deliverable-list">
          {deliverableTypes.map((type) => (
            <button
              key={type.id}
              className={`branding-preview-deliverable-btn ${
                selectedDeliverable === type.id ? 'branding-preview-deliverable-btn-active' : ''
              }`}
              onClick={() => onDeliverableChange(type.id)}
            >
              <span className="branding-preview-deliverable-icon">{type.icon}</span>
              <span className="branding-preview-deliverable-label">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="branding-preview-content">
        <div className="branding-preview-header">
          <h2 className="branding-preview-title">
            {deliverableTypes.find(t => t.id === selectedDeliverable)?.label}
          </h2>
          <p className="branding-preview-description">
            Preview how your branding will appear on this deliverable
          </p>
        </div>

        <div className="branding-preview-viewport">
          {renderPreviewContent()}
        </div>
      </div>
    </div>
  );
};
