import React, { useState, useEffect } from 'react';
import './AgentThinking.css';

interface AgentThinkingProps {
  onComplete?: () => void;
  isRecap?: boolean;
}

const steps = [
  {
    id: 'gather',
    label: 'Gathering tax return data',
    description: 'Collecting all tax forms, schedules, and supporting documentation with key data points for comprehensive analysis.',
    durationMs: 2000,
  },
  {
    id: 'analyze',
    label: 'Analyzing for compliance and accuracy',
    description: 'Cross-referencing income reconciliation, checking IRS compliance, reviewing year-over-year variances, and validating data quality.',
    durationMs: 3000,
  },
  {
    id: 'generate',
    label: 'Generating comprehensive review',
    description: 'Compiling findings into a detailed assessment with prioritized issues and calculating the overall review score.',
    durationMs: 2500,
  },
];

export const AgentThinking: React.FC<AgentThinkingProps> = ({ onComplete, isRecap = false }) => {
  const [activeStep, setActiveStep] = useState(isRecap ? steps.length : 0);
  const [streamedText, setStreamedText] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isRecap) {
      // Show all steps completed immediately
      const allText: Record<string, string> = {};
      steps.forEach((s) => {
        allText[s.id] = s.description;
      });
      setStreamedText(allText);
      return;
    }

    if (activeStep >= steps.length) {
      onComplete?.();
      return;
    }

    const step = steps[activeStep];
    const words = step.description.split(' ');
    let wordIndex = 0;
    const wordInterval = step.durationMs / words.length;

    const streamTimer = setInterval(() => {
      if (wordIndex < words.length) {
        setStreamedText((prev) => ({
          ...prev,
          [step.id]: words.slice(0, wordIndex + 1).join(' '),
        }));
        wordIndex++;
      } else {
        clearInterval(streamTimer);
        setTimeout(() => {
          setActiveStep((s) => s + 1);
        }, 300);
      }
    }, wordInterval);

    return () => clearInterval(streamTimer);
  }, [activeStep, isRecap, onComplete]);

  return (
    <div className="agent-thinking">
      {!isRecap && (
        <div className="thinking-header">
          <span className="thinking-header-label">Dynamic agent state</span>
          <span className="thinking-header-chevron">▲</span>
        </div>
      )}
      <div className="thinking-steps">
        {steps.map((step, index) => {
          const isActive = index === activeStep && !isRecap;
          const isComplete = index < activeStep || isRecap;
          const isPending = index > activeStep && !isRecap;

          return (
            <div key={step.id} className={`thinking-step ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''} ${isPending ? 'pending' : ''}`}>
              <div className="thinking-step-indicator">
                {isComplete && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" fill="#00A651"/>
                    <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {isActive && <span className="thinking-dot active-dot" />}
                {isPending && <span className="thinking-dot pending-dot" />}
              </div>
              <div className="thinking-step-content">
                <span className="thinking-step-label">{step.label}</span>
                {(isActive || isComplete) && streamedText[step.id] && (
                  <p className="thinking-step-description">
                    {streamedText[step.id]}
                    {isActive && <span className="thinking-cursor">|</span>}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
