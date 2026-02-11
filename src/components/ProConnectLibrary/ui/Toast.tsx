import React, { useEffect, useState, useCallback } from 'react';
import './Toast.css';
import { IconClose, IconSuccess, IconError, IconWarning, IconInfo } from '../icons/Icons';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const icons = {
  success: <IconSuccess size={18} />,
  error: <IconError size={18} />,
  warning: <IconWarning size={18} />,
  info: <IconInfo size={18} />,
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(toast.id), 200);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(dismiss, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, dismiss]);

  return (
    <div className={`pc-toast pc-toast--${toast.type} ${exiting ? 'pc-toast--exiting' : ''}`}>
      <span className="pc-toast__icon">{icons[toast.type]}</span>
      <div className="pc-toast__content">
        <p className="pc-toast__title">{toast.title}</p>
        {toast.message && <p className="pc-toast__message">{toast.message}</p>}
      </div>
      {toast.action && (
        <button className="pc-toast__action" onClick={toast.action.onClick}>
          {toast.action.label}
        </button>
      )}
      <button className="pc-toast__close" onClick={dismiss} aria-label="Dismiss">
        <IconClose size={14} />
      </button>
    </div>
  );
};

/* Toast container for managing multiple toasts */
interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'top-right',
}) => {
  return (
    <div className={`pc-toast-container pc-toast-container--${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};
