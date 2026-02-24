import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PasswordProtection } from './components/Auth/PasswordProtection';
import { LaunchReturn } from './components/ReturnView/LaunchReturn';
import { ReturnReviewLayout } from './components/ReturnReview/ReturnReviewLayout';
import { IconShowcase } from './components/IconShowcase/IconShowcase';

function App() {
  return (
    <PasswordProtection>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* All entry points go directly to Launch Return — Tax Dashboard hidden */}
          <Route path="/" element={<Navigate to="/return/jordan-wells/launch" replace />} />
          <Route path="/home" element={<Navigate to="/return/jordan-wells/launch" replace />} />

          {/* Agentic Review: Launch Return */}
          <Route path="/return/:clientId/launch" element={<LaunchReturn />} />

          {/* Agentic Review: Return Review (standalone new-tab experience) */}
          <Route path="/return/:clientId/review" element={<ReturnReviewLayout />} />
          <Route path="icons" element={<IconShowcase />} />
        </Routes>
      </BrowserRouter>
    </PasswordProtection>
  );
}

export default App;
