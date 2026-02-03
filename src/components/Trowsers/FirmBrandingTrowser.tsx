import React, { useState } from 'react';
import { Trowser } from '../Shared/Trowser';
import { BrandingSettings } from '../FirmBranding/BrandingSettings';
import { BrandingPreview } from '../FirmBranding/BrandingPreview';
import { BrandingAssets, DeliverableType } from '../FirmBranding/FirmBranding';
import './FirmBrandingTrowser.css';

interface FirmBrandingTrowserProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirmBrandingTrowser: React.FC<FirmBrandingTrowserProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'preview'>('settings');
  const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableType>('invoices');
  const [currentAssets, setCurrentAssets] = useState<BrandingAssets>({
    colorPalette: 'blue',
    stylePreset: 'professional',
    logoSize: 'medium',
    logoAlignment: 'left',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAssetsChange = (assets: BrandingAssets) => {
    setCurrentAssets(prev => ({...prev, ...assets}));
    setHasChanges(true);
  };

  const handleCustomizationChange = (updates: Partial<BrandingAssets>) => {
    setCurrentAssets(prev => ({...prev, ...updates}));
    setHasChanges(true);
  };

  const handleSaveAndClose = () => {
    if (hasChanges) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setHasChanges(false);
        onClose();
      }, 1500);
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const footer = (
    <>
      <button className="trowser-btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
      <button className="trowser-btn-primary" onClick={handleSaveAndClose}>
        {hasChanges ? 'Save Branding' : 'Close'}
      </button>
    </>
  );

  return (
    <Trowser isOpen={isOpen} onClose={onClose} title="Firm branding" footer={footer}>
      <div className="firm-branding-trowser">
        {showSuccessMessage && (
          <div className="firm-branding-trowser-success-banner">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z"
                fill="currentColor"
              />
            </svg>
            <span>Your branding assets have been saved successfully!</span>
          </div>
        )}

        <div className="firm-branding-trowser-header">
          <p className="firm-branding-trowser-subtitle">
            Customize your firm's branding across all client-facing deliverables
          </p>
        </div>

        <div className="firm-branding-trowser-tabs">
          <button
            className={`firm-branding-trowser-tab ${
              activeTab === 'settings' ? 'firm-branding-trowser-tab-active' : ''
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button
            className={`firm-branding-trowser-tab ${
              activeTab === 'preview' ? 'firm-branding-trowser-tab-active' : ''
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>

        <div className="firm-branding-trowser-content">
          {activeTab === 'settings' ? (
            <BrandingSettings
              onSave={handleAssetsChange}
              currentAssets={currentAssets}
            />
          ) : (
            <BrandingPreview
              selectedDeliverable={selectedDeliverable}
              onDeliverableChange={setSelectedDeliverable}
              brandingAssets={currentAssets}
              onCustomizationChange={handleCustomizationChange}
            />
          )}
        </div>
      </div>
    </Trowser>
  );
};
