import React, { useState } from 'react';
import { IconCircleCheckFill } from '../ProConnectLibrary';
import './FirmBranding.css';
import { BrandingSettings } from './BrandingSettings';
import { BrandingPreview } from './BrandingPreview';

export type DeliverableType = 'invoices' | 'letters' | 'emails' | 'signIn';
export type StylePreset = 'modern' | 'professional' | 'traditional' | 'creative';
export type ColorPalette = 'blue' | 'green' | 'purple' | 'coral';
export type LogoSize = 'small' | 'medium' | 'large';
export type LogoAlignment = 'left' | 'center' | 'right';

export interface BrandingAssets {
  logo?: File | string;
  colorPalette?: ColorPalette;
  stylePreset?: StylePreset;
  logoSize?: LogoSize;
  logoAlignment?: LogoAlignment;
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
          <IconCircleCheckFill size={20} />
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
            currentAssets={brandingAssets}
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
