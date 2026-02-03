import React, { useState } from 'react';
import './FirmBranding.css';
import { BrandingSettings } from './BrandingSettings';
import { BrandingPreview } from './BrandingPreview';

export type DeliverableType = 'invoices' | 'letters' | 'emails' | 'signIn';

export interface BrandingAssets {
  logo?: File | string;
  headerImage?: File | string;
  colors?: {
    primary?: string;
    secondary?: string;
  };
}

export const FirmBranding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'preview'>('settings');
  const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableType>('invoices');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [brandingAssets, setBrandingAssets] = useState<BrandingAssets>({});

  const handleSaveAssets = (assets: BrandingAssets) => {
    setBrandingAssets(assets);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <div className="firm-branding">
      {showSuccessMessage && (
        <div className="firm-branding-success-banner">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
              fill="currentColor"
            />
          </svg>
          <span>Your branding assets have been saved successfully. They will be applied to all deliverables.</span>
        </div>
      )}

      <div className="firm-branding-header">
        <h1 className="firm-branding-title">Firm branding</h1>
        <p className="firm-branding-subtitle">
          Customize your firm's branding across all client-facing deliverables
        </p>
      </div>

      <div className="firm-branding-tabs">
        <button
          className={`firm-branding-tab ${activeTab === 'settings' ? 'firm-branding-tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button
          className={`firm-branding-tab ${activeTab === 'preview' ? 'firm-branding-tab-active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="firm-branding-content">
        {activeTab === 'settings' ? (
          <BrandingSettings 
            onSave={handleSaveAssets}
          />
        ) : (
          <BrandingPreview
            selectedDeliverable={selectedDeliverable}
            onDeliverableChange={setSelectedDeliverable}
            brandingAssets={brandingAssets}
          />
        )}
      </div>
    </div>
  );
};
