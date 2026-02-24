import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsLayout } from './components/Layout/SettingsLayout';
import { Home } from './components/Home/Home';
import { APICatalog } from './components/APICatalog/APICatalog';
import { Documentation } from './components/Documentation/Documentation';
import { APIKeys } from './components/APIKeys/APIKeys';
import { APIHealth } from './components/APIHealth/APIHealth';
import { APIPortalTrowser } from './components/Trowsers/APIPortalTrowser';
import { FirmBrandingTrowser } from './components/Trowsers/FirmBrandingTrowser';
import { PasswordProtection } from './components/Auth/PasswordProtection';
import { LaunchReturn } from './components/ReturnView/LaunchReturn';
import { ReturnReviewLayout } from './components/ReturnReview/ReturnReviewLayout';
import { IconShowcase } from './components/IconShowcase/IconShowcase';

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
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Default entry: Launch Return with documents already uploaded */}
          <Route path="/" element={<Navigate to="/return/jordan-wells/launch" replace />} />

          {/* Tax Hub / Settings (accessible via Back to returns, sidebar, etc.) */}
          <Route path="/home" element={<SettingsLayout onOpenTrowser={handleOpenTrowser} />}>
            <Route index element={<Home />} />
            <Route path="settings/api-portal">
              <Route index element={<Navigate to="catalog" replace />} />
              <Route path="catalog" element={<APICatalog />} />
              <Route path="documentation" element={<Documentation />} />
              <Route path="keys" element={<APIKeys />} />
              <Route path="health" element={<APIHealth />} />
            </Route>
          </Route>

          {/* Agentic Review: Launch Return (documents uploaded, ready to review) */}
          <Route path="/return/:clientId/launch" element={<LaunchReturn />} />

          {/* Agentic Review: Return Review (standalone new-tab experience) */}
          <Route path="/return/:clientId/review" element={<ReturnReviewLayout />} />
          <Route path="icons" element={<IconShowcase />} />
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
