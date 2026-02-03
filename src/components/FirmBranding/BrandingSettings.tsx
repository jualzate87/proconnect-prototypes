import React, { useState, useEffect } from 'react';
import './BrandingSettings.css';
import { BrandingAssets, ColorPalette, StylePreset } from './FirmBranding';

type UploadSource = 'device' | 'intuit';

interface BrandingSettingsProps {
  onSave: (assets: BrandingAssets) => void;
  currentAssets: BrandingAssets;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ onSave, currentAssets }) => {
  const [uploadSource, setUploadSource] = useState<UploadSource>('device');
  const [logoPreview, setLogoPreview] = useState<string | null>(
    typeof currentAssets.logo === 'string' ? currentAssets.logo : null
  );
  const [selectedColorPalette, setSelectedColorPalette] = useState<ColorPalette>(
    currentAssets.colorPalette || 'blue'
  );
  const [selectedStylePreset, setSelectedStylePreset] = useState<StylePreset>(
    currentAssets.stylePreset || 'professional'
  );

  // Update local state when currentAssets changes (e.g., when switching tabs)
  useEffect(() => {
    if (typeof currentAssets.logo === 'string') {
      setLogoPreview(currentAssets.logo);
    }
    if (currentAssets.colorPalette) {
      setSelectedColorPalette(currentAssets.colorPalette);
    }
    if (currentAssets.stylePreset) {
      setSelectedStylePreset(currentAssets.stylePreset);
    }
  }, [currentAssets]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        
        // Update preview in real-time
        onSave({
          logo: reader.result as string,
          colorPalette: selectedColorPalette,
          stylePreset: selectedStylePreset,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorPaletteChange = (palette: ColorPalette) => {
    setSelectedColorPalette(palette);
    onSave({
      logo: logoPreview || undefined,
      colorPalette: palette,
      stylePreset: selectedStylePreset,
    });
  };

  const handleStylePresetChange = (preset: StylePreset) => {
    setSelectedStylePreset(preset);
    onSave({
      logo: logoPreview || undefined,
      colorPalette: selectedColorPalette,
      stylePreset: preset,
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
        </div>

        {uploadSource === 'device' && (
          <div className="branding-settings-upload-area">
            <div className="branding-settings-upload-field">
              <label className="branding-settings-label">Firm logo</label>
              <div className="branding-settings-file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e)}
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
          </div>
        )}

        {uploadSource === 'intuit' && (
          <div className="branding-settings-connect-button">
            <button className="branding-settings-btn-secondary">
              Connect to Intuit Account Suite
            </button>
          </div>
        )}

      </div>

      <div className="branding-settings-section">
        <h2 className="branding-settings-section-title">Color Palette</h2>
        <p className="branding-settings-section-description">
          Choose a color scheme for your firm's branding
        </p>

        <div className="branding-settings-palette-grid">
          <label className={`branding-settings-palette-card ${selectedColorPalette === 'blue' ? 'branding-settings-palette-card-active' : ''}`}>
            <input
              type="radio"
              name="colorPalette"
              value="blue"
              checked={selectedColorPalette === 'blue'}
              onChange={() => handleColorPaletteChange('blue')}
            />
            <div className="branding-settings-palette-content">
              <div className="branding-settings-palette-swatches">
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#0077C8' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#005A9C' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#4A9EFF' }}></div>
              </div>
              <span className="branding-settings-palette-name">Blue</span>
            </div>
          </label>

          <label className={`branding-settings-palette-card ${selectedColorPalette === 'green' ? 'branding-settings-palette-card-active' : ''}`}>
            <input
              type="radio"
              name="colorPalette"
              value="green"
              checked={selectedColorPalette === 'green'}
              onChange={() => handleColorPaletteChange('green')}
            />
            <div className="branding-settings-palette-content">
              <div className="branding-settings-palette-swatches">
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#2E7D32' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#1B5E20' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#66BB6A' }}></div>
              </div>
              <span className="branding-settings-palette-name">Green</span>
            </div>
          </label>

          <label className={`branding-settings-palette-card ${selectedColorPalette === 'purple' ? 'branding-settings-palette-card-active' : ''}`}>
            <input
              type="radio"
              name="colorPalette"
              value="purple"
              checked={selectedColorPalette === 'purple'}
              onChange={() => handleColorPaletteChange('purple')}
            />
            <div className="branding-settings-palette-content">
              <div className="branding-settings-palette-swatches">
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#7B1FA2' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#4A148C' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#BA68C8' }}></div>
              </div>
              <span className="branding-settings-palette-name">Purple</span>
            </div>
          </label>

          <label className={`branding-settings-palette-card ${selectedColorPalette === 'coral' ? 'branding-settings-palette-card-active' : ''}`}>
            <input
              type="radio"
              name="colorPalette"
              value="coral"
              checked={selectedColorPalette === 'coral'}
              onChange={() => handleColorPaletteChange('coral')}
            />
            <div className="branding-settings-palette-content">
              <div className="branding-settings-palette-swatches">
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#FF6B6B' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#EE5A52' }}></div>
                <div className="branding-settings-color-swatch" style={{ backgroundColor: '#FFA07A' }}></div>
              </div>
              <span className="branding-settings-palette-name">Coral</span>
            </div>
          </label>
        </div>
      </div>

      <div className="branding-settings-section">
        <h2 className="branding-settings-section-title">Style Preset</h2>
        <p className="branding-settings-section-description">
          Choose a typography style that reflects your firm's personality
        </p>

        <div className="branding-settings-style-grid">
          <label className={`branding-settings-style-card ${selectedStylePreset === 'modern' ? 'branding-settings-style-card-active' : ''}`}>
            <input
              type="radio"
              name="stylePreset"
              value="modern"
              checked={selectedStylePreset === 'modern'}
              onChange={() => handleStylePresetChange('modern')}
            />
            <div className="branding-settings-style-content">
              <div className="branding-settings-style-preview" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>Aa</div>
              <span className="branding-settings-style-name">Modern</span>
              <p className="branding-settings-style-description">Clean and minimalist</p>
            </div>
          </label>

          <label className={`branding-settings-style-card ${selectedStylePreset === 'professional' ? 'branding-settings-style-card-active' : ''}`}>
            <input
              type="radio"
              name="stylePreset"
              value="professional"
              checked={selectedStylePreset === 'professional'}
              onChange={() => handleStylePresetChange('professional')}
            />
            <div className="branding-settings-style-content">
              <div className="branding-settings-style-preview" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Aa</div>
              <span className="branding-settings-style-name">Professional</span>
              <p className="branding-settings-style-description">Formal and trustworthy</p>
            </div>
          </label>

          <label className={`branding-settings-style-card ${selectedStylePreset === 'traditional' ? 'branding-settings-style-card-active' : ''}`}>
            <input
              type="radio"
              name="stylePreset"
              value="traditional"
              checked={selectedStylePreset === 'traditional'}
              onChange={() => handleStylePresetChange('traditional')}
            />
            <div className="branding-settings-style-content">
              <div className="branding-settings-style-preview" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Aa</div>
              <span className="branding-settings-style-name">Traditional</span>
              <p className="branding-settings-style-description">Conservative and established</p>
            </div>
          </label>

          <label className={`branding-settings-style-card ${selectedStylePreset === 'creative' ? 'branding-settings-style-card-active' : ''}`}>
            <input
              type="radio"
              name="stylePreset"
              value="creative"
              checked={selectedStylePreset === 'creative'}
              onChange={() => handleStylePresetChange('creative')}
            />
            <div className="branding-settings-style-content">
              <div className="branding-settings-style-preview" style={{ fontFamily: '"Arial Rounded MT Bold", "Helvetica Rounded", sans-serif', fontWeight: 'bold' }}>Aa</div>
              <span className="branding-settings-style-name">Creative</span>
              <p className="branding-settings-style-description">Bold and distinctive</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
