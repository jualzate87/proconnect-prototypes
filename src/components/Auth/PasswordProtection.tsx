import React, { useState, useEffect } from 'react';
import { IconLock } from '../ProConnectLibrary';
import './PasswordProtection.css';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'prototype2026'; // Change this to your desired password

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if already authenticated (persists across tabs and sessions)
    const auth = localStorage.getItem('prototype_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('prototype_auth', 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="password-protection">
      <div className="password-protection-container">
        <div className="password-protection-header">
          <IconLock size={48} />
          <h1>Protected Prototype</h1>
          <p>This is a research prototype. Please enter the access code to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="password-protection-form">
          <div className="password-protection-input-group">
            <label htmlFor="password">Access Code</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter access code"
              autoFocus
              className={error ? 'password-protection-input-error' : ''}
            />
            {error && (
              <span className="password-protection-error">
                Incorrect access code. Please try again.
              </span>
            )}
          </div>

          <button type="submit" className="password-protection-button">
            Access Prototype
          </button>
        </form>

        <div className="password-protection-footer">
          <p>Don't have an access code? Contact the research team.</p>
        </div>
      </div>
    </div>
  );
};
