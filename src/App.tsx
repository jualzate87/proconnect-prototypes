import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsLayout } from './components/Layout/SettingsLayout';
import { Home } from './components/Home/Home';
import { APIPortalTrowser } from './components/Trowsers/APIPortalTrowser';
import { FirmBrandingTrowser } from './components/Trowsers/FirmBrandingTrowser';
import { PasswordProtection } from './components/Auth/PasswordProtection';

function App() {
  const [openTrowser, setOpenTrowser] = useState<'api-portal' | 'firm-branding' | null>(null);

  const handleOpenTrowser = (trowser: 'api-portal' | 'firm-branding') => {
    setOpenTrowser(trowser);
  };

  const handleCloseTrowser = () => {
    setOpenTrowser(null);
  };

  return (
    <PasswordProtection>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SettingsLayout onOpenTrowser={handleOpenTrowser} />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
        
        <APIPortalTrowser 
          isOpen={openTrowser === 'api-portal'} 
          onClose={handleCloseTrowser}
        />
        
        <FirmBrandingTrowser 
          isOpen={openTrowser === 'firm-branding'} 
          onClose={handleCloseTrowser}
        />
      </BrowserRouter>
    </PasswordProtection>
  );
}

export default App;
