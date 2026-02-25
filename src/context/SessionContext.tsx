import React, { createContext, useContext, useEffect, useState } from 'react';

const SESSION_KEY = 'usertesting_session';

export interface SessionData {
  userName: string;
  firmName: string;
}

const defaultSession: SessionData = {
  userName: '',
  firmName: '',
};

const SessionContext = createContext<SessionData>(defaultSession);

export function useSession(): SessionData {
  const ctx = useContext(SessionContext);
  return ctx ?? defaultSession;
}

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<SessionData>(defaultSession);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SessionData;
        if (parsed.userName && parsed.firmName) {
          setSession({ userName: parsed.userName, firmName: parsed.firmName });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export { SESSION_KEY };
