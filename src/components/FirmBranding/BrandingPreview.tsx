import React from 'react';
import './BrandingPreview.css';
import { DeliverableType, BrandingAssets } from './FirmBranding';

interface BrandingPreviewProps {
  selectedDeliverable: DeliverableType;
  onDeliverableChange: (type: DeliverableType) => void;
  brandingAssets: BrandingAssets;
  onCustomizationChange?: (updates: Partial<BrandingAssets>) => void;
  compactMode?: boolean;
}

export const BrandingPreview: React.FC<BrandingPreviewProps> = ({
  selectedDeliverable,
  onDeliverableChange,
  brandingAssets,
  compactMode = false,
}) => {
  const logoSize = brandingAssets.logoSize || 'medium';
  const logoAlignment = brandingAssets.logoAlignment || 'left';
  const deliverableTypes = [
    { id: 'invoices' as DeliverableType, label: 'Invoices', icon: '📄' },
    { id: 'letters' as DeliverableType, label: 'Client letters', icon: '✉️' },
    { id: 'emails' as DeliverableType, label: 'Emails', icon: '📧' },
    { id: 'signIn' as DeliverableType, label: 'Client sign in', icon: '🔐' },
  ];

  const renderPreviewContent = () => {
    const logoSizeClass = `logo-${logoSize}`;
    const logoAlignClass = `logo-${logoAlignment}`;
    
    switch (selectedDeliverable) {
      case 'invoices':
        return (
          <div className={`preview-document preview-invoice style-${brandingAssets.stylePreset || 'professional'} palette-${brandingAssets.colorPalette || 'blue'}`}>
            {brandingAssets.logo && (
              <div className={`preview-logo ${logoSizeClass} ${logoAlignClass}`}>
                <img src={brandingAssets.logo as string} alt="Firm logo" />
              </div>
            )}
            <div className="preview-invoice-header">
              <div className="preview-firm-info">
                <h2 className="preview-firm-name">ABC Accounting Firm</h2>
                <p>123 Main Street, Suite 100</p>
                <p>City, State 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: billing@abcaccounting.com</p>
              </div>
            </div>
            
            <div className="preview-invoice-title">
              <h1>INVOICE</h1>
            </div>

            <div className="preview-invoice-meta">
              <div className="preview-invoice-details">
                <div className="preview-meta-row">
                  <span className="preview-meta-label">Invoice #:</span>
                  <span className="preview-meta-value">INV-2026-001234</span>
                </div>
                <div className="preview-meta-row">
                  <span className="preview-meta-label">Date:</span>
                  <span className="preview-meta-value">February 2, 2026</span>
                </div>
                <div className="preview-meta-row">
                  <span className="preview-meta-label">Due Date:</span>
                  <span className="preview-meta-value">March 4, 2026</span>
                </div>
              </div>

              <div className="preview-bill-to">
                <h3>Bill To:</h3>
                <p><strong>John Smith</strong></p>
                <p>456 Client Avenue</p>
                <p>Anytown, CA 90210</p>
              </div>
            </div>

            <div className="preview-invoice-table">
              <table>
                <thead>
                  <tr>
                    <th className="col-description">Description</th>
                    <th className="col-qty">Qty</th>
                    <th className="col-rate">Rate</th>
                    <th className="col-amount">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1040 Individual Tax Return</td>
                    <td>1</td>
                    <td>$350.00</td>
                    <td>$350.00</td>
                  </tr>
                  <tr>
                    <td>State Tax Return</td>
                    <td>1</td>
                    <td>$150.00</td>
                    <td>$150.00</td>
                  </tr>
                  <tr>
                    <td>Tax Consultation (hourly)</td>
                    <td>2</td>
                    <td>$125.00</td>
                    <td>$250.00</td>
                  </tr>
                  <tr>
                    <td>Document Preparation & Filing</td>
                    <td>1</td>
                    <td>$75.00</td>
                    <td>$75.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="subtotal-row">
                    <td colSpan={3}>Subtotal</td>
                    <td>$825.00</td>
                  </tr>
                  <tr className="tax-row">
                    <td colSpan={3}>Tax (0%)</td>
                    <td>$0.00</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan={3}><strong>Total Due</strong></td>
                    <td><strong>$825.00</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="preview-invoice-footer">
              <p><strong>Payment Terms:</strong> Net 30</p>
              <p>Thank you for your business!</p>
            </div>
          </div>
        );

      case 'letters':
        return (
          <div className={`preview-document preview-letter style-${brandingAssets.stylePreset || 'professional'} palette-${brandingAssets.colorPalette || 'blue'}`}>
            {brandingAssets.logo && (
              <div className={`preview-logo ${logoSizeClass} ${logoAlignClass}`}>
                <img src={brandingAssets.logo as string} alt="Firm logo" />
              </div>
            )}
            <div className="preview-letter-header">
              <h2 className="preview-firm-name">ABC Accounting Firm</h2>
              <p>123 Main Street, Suite 100</p>
              <p>City, State 12345</p>
            </div>

            <div className="preview-letter-date">February 2, 2026</div>

            <div className="preview-letter-recipient">
              <p>Mr. John Smith</p>
              <p>456 Client Avenue</p>
              <p>Anytown, CA 90210</p>
            </div>

            <div className="preview-letter-subject">
              <p><strong>RE: 2025 Tax Return Preparation</strong></p>
            </div>

            <div className="preview-letter-body">
              <p>Dear Mr. Smith,</p>

              <p>
                I am pleased to inform you that we have completed the preparation of your 
                2025 federal and state income tax returns.
              </p>

              <p>
                The returns show a federal refund of $2,450 and a state refund of $685. 
                We have filed your returns electronically and you should receive your 
                refunds within 2-3 weeks.
              </p>

              <p><strong>Enclosed you will find:</strong></p>
              <ul>
                <li>Copy of your federal tax return (Form 1040)</li>
                <li>Copy of your state tax return</li>
                <li>Supporting documentation and schedules</li>
              </ul>

              <p>
                Please review the returns carefully and contact our office if you have 
                any questions or need clarification on any items. We appreciate your 
                continued trust in our services and look forward to assisting you with 
                your future tax and accounting needs.
              </p>

              <p>Sincerely,</p>

              <div className="preview-letter-signature">
                <p><strong>Sarah Johnson, CPA</strong></p>
                <p>Partner</p>
                <p>ABC Accounting Firm</p>
              </div>
            </div>
          </div>
        );

      case 'emails':
        return (
          <div className={`preview-document preview-email style-${brandingAssets.stylePreset || 'professional'} palette-${brandingAssets.colorPalette || 'blue'}`}>
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
                <div className={`preview-logo ${logoSizeClass} ${logoAlignClass}`}>
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
                <button className="branded-button">Review Documents</button>
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
          <div className={`preview-document preview-signin style-${brandingAssets.stylePreset || 'professional'} palette-${brandingAssets.colorPalette || 'blue'}`}>
            <div className="preview-signin-container">
              {brandingAssets.logo && (
                <div className={`preview-logo ${logoSizeClass} ${logoAlignClass}`}>
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
                <button className="preview-signin-button branded-button">Sign In</button>
                <a href="#" className="preview-signin-link">Forgot password?</a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (compactMode) {
    return (
      <div className="branding-preview-compact">
        <div className="branding-preview-tabs">
          {deliverableTypes.map((type) => (
            <button
              key={type.id}
              className={`branding-preview-tab ${
                selectedDeliverable === type.id ? 'branding-preview-tab-active' : ''
              }`}
              onClick={() => onDeliverableChange(type.id)}
            >
              <span className="branding-preview-tab-icon">{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>

        <div className="branding-preview-viewport-compact">
          {renderPreviewContent()}
        </div>
      </div>
    );
  }

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
