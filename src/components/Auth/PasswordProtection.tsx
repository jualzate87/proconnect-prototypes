import React, { useState, useEffect } from 'react';
import { IconLock } from '../ProConnectLibrary';
import { SESSION_KEY } from '../../context/SessionContext';
import './PasswordProtection.css';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const CORRECT_PASSWORD = 'prototype2026'; // Change this to your desired password

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('prototype_auth');
    if (auth === 'true') {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as { userName: string; firmName: string };
          if (parsed.userName && parsed.firmName) {
            setIsAuthenticated(true);
            return;
          }
        } catch {
          // ignore
        }
      }
      sessionStorage.removeItem('prototype_auth');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = userName.trim();
    const trimmedFirm = firmName.trim();
    if (!trimmedName || !trimmedFirm) {
      setError(true);
      return;
    }
    if (password !== CORRECT_PASSWORD) {
      setError(true);
      setPassword('');
      return;
    }

    sessionStorage.setItem('prototype_auth', 'true');
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userName: trimmedName, firmName: trimmedFirm }));
    setIsAuthenticated(true);
    setError(false);
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
          <p>This is a research prototype. Please enter your details and access code to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="password-protection-form">
          <div className="password-protection-input-group">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="password-protection-input-group">
            <label htmlFor="firmName">Firm</label>
            <input
              type="text"
              id="firmName"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              placeholder="Firm name"
              autoComplete="organization"
            />
          </div>
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
              autoComplete="one-time-code"
              className={error ? 'password-protection-input-error' : ''}
            />
            {error && (
              <span className="password-protection-error">
                {!userName.trim() || !firmName.trim()
                  ? 'Please enter your name and firm.'
                  : 'Incorrect access code. Please try again.'}
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
