import React, { useState } from 'react';
import './BrandingSettings.css';
import { BrandingAssets } from './FirmBranding';

type UploadSource = 'device' | 'intuit' | 'external';

interface BrandingSettingsProps {
  onSave: (assets: BrandingAssets) => void;
  currentAssets: BrandingAssets;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ onSave, currentAssets }) => {
  const [uploadSource, setUploadSource] = useState<UploadSource>('device');
  const [includeHeaderSpace, setIncludeHeaderSpace] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'header') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogo = type === 'logo' ? (reader.result as string) : logoPreview;
        const newHeader = type === 'header' ? (reader.result as string) : headerImagePreview;
        
        if (type === 'logo') {
          setLogoPreview(reader.result as string);
        } else {
          setHeaderImagePreview(reader.result as string);
        }
        
        // Update preview in real-time
        onSave({
          logo: newLogo || undefined,
          headerImage: newHeader || undefined,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      logo: logoPreview || undefined,
      headerImage: headerImagePreview || undefined,
    });
  };

  return (
    <div className="branding-settings">
      <div className="branding-settings-section">
        <h2 className="branding-settings-section-title">Upload branding assets</h2>
        <p className="branding-settings-section-description">
          Choose where to upload your firm's logo, colors, and other branding elements
        </p>

        <div className="branding-settings-upload-sources">
          <label className="branding-settings-radio-card">
            <input
              type="radio"
              name="uploadSource"
              value="device"
              checked={uploadSource === 'device'}
              onChange={(e) => setUploadSource(e.target.value as UploadSource)}
            />
            <div className="branding-settings-radio-content">
              <div className="branding-settings-radio-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"
                    fill="currentColor"
                  />
                </svg>
                <span className="branding-settings-radio-title">Upload from device</span>
              </div>
              <p className="branding-settings-radio-description">
                Upload your branding assets directly from your computer
              </p>
            </div>
          </label>

          <label className="branding-settings-radio-card">
            <input
              type="radio"
              name="uploadSource"
              value="intuit"
              checked={uploadSource === 'intuit'}
              onChange={(e) => setUploadSource(e.target.value as UploadSource)}
            />
            <div className="branding-settings-radio-content">
              <div className="branding-settings-radio-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
                    fill="currentColor"
                  />
                  <path
                    d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"
                    fill="currentColor"
                  />
                </svg>
                <span className="branding-settings-radio-title">Import from Intuit Account Suite</span>
              </div>
              <p className="branding-settings-radio-description">
                Use branding assets already saved in your Intuit account
              </p>
            </div>
          </label>

          <label className="branding-settings-radio-card">
            <input
              type="radio"
              name="uploadSource"
              value="external"
              checked={uploadSource === 'external'}
              onChange={(e) => setUploadSource(e.target.value as UploadSource)}
            />
            <div className="branding-settings-radio-content">
              <div className="branding-settings-radio-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"
                    fill="currentColor"
                  />
                </svg>
                <span className="branding-settings-radio-title">Import from external app</span>
              </div>
              <p className="branding-settings-radio-description">
                Connect to Dropbox, Google Drive, or other cloud storage services
              </p>
            </div>
          </label>
        </div>

        {uploadSource === 'device' && (
          <div className="branding-settings-upload-area">
            <div className="branding-settings-upload-field">
              <label className="branding-settings-label">Firm logo</label>
              <div className="branding-settings-file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'logo')}
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="branding-settings-file-label">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="branding-settings-preview" />
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Choose file or drag and drop</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="branding-settings-upload-field">
              <label className="branding-settings-label">Header image (optional)</label>
              <div className="branding-settings-file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'header')}
                  id="header-upload"
                />
                <label htmlFor="header-upload" className="branding-settings-file-label">
                  {headerImagePreview ? (
                    <img src={headerImagePreview} alt="Header preview" className="branding-settings-preview" />
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Choose file or drag and drop</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        )}

        {uploadSource === 'intuit' && (
          <div className="branding-settings-connect-button">
            <button className="branding-settings-btn-secondary">
              Connect to Intuit Account Suite
            </button>
          </div>
        )}

        {uploadSource === 'external' && (
          <div className="branding-settings-external-options">
            <button className="branding-settings-external-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/>
              </svg>
              Connect to Dropbox
            </button>
            <button className="branding-settings-external-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" fill="currentColor"/>
              </svg>
              Connect to Google Drive
            </button>
          </div>
        )}
      </div>

      <div className="branding-settings-section">
        <h2 className="branding-settings-section-title">Document layout options</h2>
        
        <label className="branding-settings-checkbox">
          <input
            type="checkbox"
            checked={includeHeaderSpace}
            onChange={(e) => setIncludeHeaderSpace(e.target.checked)}
          />
          <div className="branding-settings-checkbox-content">
            <span className="branding-settings-checkbox-title">
              Include header space for external branding
            </span>
            <p className="branding-settings-checkbox-description">
              Leaves blank space at the top of printed documents so you can add branding using an external system
            </p>
          </div>
        </label>
      </div>

      <div className="branding-settings-actions">
        <button className="branding-settings-btn-primary" onClick={handleSave}>
          Save branding assets
        </button>
        <button className="branding-settings-btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};
