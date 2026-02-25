import { useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext';
import './SessionWatermark.css';

function formatTimestamp(t: Date): string {
  return t.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function SessionWatermark() {
  const { userName, firmName } = useSession();
  const [timestamp, setTimestamp] = useState(() => formatTimestamp(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(formatTimestamp(new Date()));
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const text = [userName, firmName, timestamp].filter(Boolean).join(' | ');
  if (!text) return null;

  return (
    <div className="session-watermark" aria-hidden>
      {text}
    </div>
  );
}
