import React, { useState } from 'react';
import { IconCircleCheckFill } from '../ProConnectLibrary';
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
            <IconCircleCheckFill size={20} />
            <span>Your branding assets have been saved successfully!</span>
          </div>
        )}

        <div className="firm-branding-trowser-header">
          <p className="firm-branding-trowser-subtitle">
            Customize your firm's branding across all client-facing deliverables
          </p>
        </div>

        <div className="firm-branding-trowser-layout">
          <div className="firm-branding-trowser-controls">
            <BrandingSettings
              onSave={handleAssetsChange}
              currentAssets={currentAssets}
              onCustomizationChange={handleCustomizationChange}
            />
          </div>
          
          <div className="firm-branding-trowser-preview">
            <BrandingPreview
              selectedDeliverable={selectedDeliverable}
              onDeliverableChange={setSelectedDeliverable}
              brandingAssets={currentAssets}
              onCustomizationChange={handleCustomizationChange}
              compactMode={true}
            />
          </div>
        </div>
      </div>
    </Trowser>
  );
};
