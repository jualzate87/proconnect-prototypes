import React from 'react';
import './Avatar.css';

interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'ai';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  variant = 'default',
  status,
  className = '',
}) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className={`pc-avatar pc-avatar--${size} pc-avatar--${variant} ${className}`}>
      {src ? (
        <img className="pc-avatar__img" src={src} alt={name || 'Avatar'} />
      ) : (
        <span className="pc-avatar__initials">{initials}</span>
      )}
      {status && <span className={`pc-avatar__status pc-avatar__status--${status}`} />}
    </div>
  );
};
