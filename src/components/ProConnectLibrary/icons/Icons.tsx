import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ── Navigation Icons ── */

export const IconHome: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M3 10L10 3L17 10M5 8.5V16C5 16.55 5.45 17 6 17H8.5V12.5H11.5V17H14C14.55 17 15 16.55 15 16V8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTaxReturn: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M6 2H14C15.1 2 16 2.9 16 4V16C16 17.1 15.1 18 14 18H6C4.9 18 4 17.1 4 16V4C4 2.9 4.9 2 6 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 6H13M7 9H13M7 12H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconClients: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M14 17V15.667C14 14.95 13.716 14.263 13.216 13.757C12.716 13.25 12.038 12.963 11.333 12.963H5.667C4.962 12.963 4.284 13.25 3.784 13.757C3.284 14.263 3 14.95 3 15.667V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="7" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M17 17V15.667C16.999 15.068 16.804 14.487 16.446 14.012C16.087 13.537 15.585 13.196 15.017 13.042" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.017 3.042C12.587 3.195 13.091 3.536 13.451 4.012C13.81 4.488 14.006 5.07 14.006 5.671C14.006 6.271 13.81 6.853 13.451 7.329C13.091 7.805 12.587 8.146 12.017 8.299" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconDashboard: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <rect x="3" y="3" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="11" y="3" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="11" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="11" y="11" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const IconLink: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M8.5 11.5C9.03 12.18 9.77 12.66 10.61 12.86C11.45 13.06 12.34 12.96 13.11 12.59L15.11 11.59C15.87 11.22 16.47 10.59 16.81 9.82C17.15 9.05 17.21 8.18 16.99 7.37C16.77 6.56 16.29 5.85 15.62 5.36C14.95 4.87 14.14 4.63 13.31 4.67" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 8.5C10.97 7.82 10.23 7.34 9.39 7.14C8.55 6.94 7.66 7.04 6.89 7.41L4.89 8.41C4.13 8.78 3.53 9.41 3.19 10.18C2.85 10.95 2.79 11.82 3.01 12.63C3.23 13.44 3.71 14.15 4.38 14.64C5.05 15.13 5.86 15.37 6.69 15.33" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconReporting: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M16 17V8M10 17V3M4 17V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Action Icons ── */

export const IconClose: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M15 5L5 15M5 5L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronDown: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M5 7.5L10 12.5L15 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronRight: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M7.5 5L12.5 10L7.5 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconChevronLeft: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M12.5 15L7.5 10L12.5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSearch: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="9" cy="9" r="5.5" stroke={color} strokeWidth="1.5" />
    <path d="M13 13L17 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconSettings: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M10 12.5C11.38 12.5 12.5 11.38 12.5 10C12.5 8.62 11.38 7.5 10 7.5C8.62 7.5 7.5 8.62 7.5 10C7.5 11.38 8.62 12.5 10 12.5Z" stroke={color} strokeWidth="1.5" />
    <path d="M16.17 12.5C16.08 12.72 16.05 12.97 16.1 13.2C16.15 13.44 16.27 13.66 16.45 13.83L16.5 13.88C16.65 14.03 16.77 14.2 16.85 14.39C16.93 14.58 16.97 14.79 16.97 15C16.97 15.21 16.93 15.42 16.85 15.61C16.77 15.8 16.65 15.97 16.5 16.12C16.35 16.27 16.18 16.39 15.99 16.47C15.8 16.55 15.59 16.59 15.38 16.59C15.17 16.59 14.96 16.55 14.77 16.47C14.58 16.39 14.41 16.27 14.26 16.12L14.21 16.07C14.04 15.89 13.82 15.77 13.58 15.72C13.35 15.67 13.1 15.7 12.88 15.79C12.66 15.88 12.48 16.03 12.35 16.22C12.22 16.41 12.15 16.64 12.15 16.87V17.08C12.15 17.51 11.98 17.92 11.67 18.23C11.36 18.54 10.95 18.71 10.52 18.71C10.09 18.71 9.68 18.54 9.37 18.23C9.06 17.92 8.89 17.51 8.89 17.08V16.97C8.88 16.73 8.8 16.5 8.66 16.31C8.52 16.12 8.32 15.98 8.1 15.9C7.88 15.81 7.63 15.78 7.4 15.83C7.16 15.88 6.94 16 6.77 16.18L6.72 16.23C6.57 16.38 6.4 16.5 6.21 16.58C6.02 16.66 5.81 16.7 5.6 16.7C5.39 16.7 5.18 16.66 4.99 16.58C4.8 16.5 4.63 16.38 4.48 16.23C4.33 16.08 4.21 15.91 4.13 15.72C4.05 15.53 4.01 15.32 4.01 15.11C4.01 14.9 4.05 14.69 4.13 14.5C4.21 14.31 4.33 14.14 4.48 13.99L4.53 13.94C4.71 13.77 4.83 13.55 4.88 13.31C4.93 13.08 4.9 12.83 4.81 12.61C4.72 12.39 4.57 12.21 4.38 12.08C4.19 11.95 3.96 11.88 3.73 11.88H3.52C3.09 11.88 2.68 11.71 2.37 11.4C2.06 11.09 1.89 10.68 1.89 10.25C1.89 9.82 2.06 9.41 2.37 9.1C2.68 8.79 3.09 8.62 3.52 8.62H3.63C3.87 8.61 4.1 8.53 4.29 8.39C4.48 8.25 4.62 8.05 4.7 7.83" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconNotification: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M15 7C15 5.4087 14.3679 3.88258 13.2426 2.75736C12.1174 1.63214 10.5913 1 9 1C7.4087 1 5.88258 1.63214 4.75736 2.75736C3.63214 3.88258 3 5.4087 3 7C3 12 1 14 1 14H17C17 14 15 12 15 7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.73 17C10.5542 17.3031 10.3019 17.5547 9.9982 17.7295C9.6946 17.9044 9.3504 17.9965 9 17.9965C8.64964 17.9965 8.30541 17.9044 8.00179 17.7295C7.69818 17.5547 7.44584 17.3031 7.27 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconHelp: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M7.5 7.5C7.5 6.12 8.62 5 10 5C11.38 5 12.5 6.12 12.5 7.5C12.5 8.88 11.38 10 10 10V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="14" r="0.75" fill={color} />
  </svg>
);

export const IconUser: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M16 17V15.5C16 14.7 15.7 13.92 15.15 13.35C14.6 12.79 13.85 12.5 13.08 12.5H6.92C6.15 12.5 5.4 12.79 4.85 13.35C4.3 13.92 4 14.7 4 15.5V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="7" r="3.5" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M10 4V16M4 10H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconMinus: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M4 10H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M4 10L8 14L16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCopy: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <rect x="7" y="7" width="10" height="10" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M13 7V4.5C13 3.67 12.33 3 11.5 3H4.5C3.67 3 3 3.67 3 4.5V11.5C3 12.33 3.67 13 4.5 13H7" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const IconEdit: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M12.5 3.5L16.5 7.5L7 17H3V13L12.5 3.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTrash: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M3 5H17M7 5V3.5C7 3.22 7.22 3 7.5 3H12.5C12.78 3 13 3.22 13 3.5V5M8.5 8.5V14.5M11.5 8.5V14.5M5 5L5.87 16.14C5.93 16.63 6.35 17 6.84 17H13.16C13.65 17 14.07 16.63 14.13 16.14L15 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFilter: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M2 4H18M5 10H15M8 16H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconSort: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M7 3V17M7 17L3 13M7 17L11 13M13 17V3M13 3L9 7M13 3L17 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconDownload: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M3 14V16C3 16.55 3.45 17 4 17H16C16.55 17 17 16.55 17 16V14M10 3V13M10 13L6 9M10 13L14 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconExternalLink: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M15 11V15C15 15.55 14.55 16 14 16H5C4.45 16 4 15.55 4 15V6C4 5.45 4.45 5 5 5H9M12 4H16V8M16 4L9 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M3 5H17M3 10H17M3 15H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconMoreVertical: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="10" cy="5" r="1.25" fill={color} />
    <circle cx="10" cy="10" r="1.25" fill={color} />
    <circle cx="10" cy="15" r="1.25" fill={color} />
  </svg>
);

export const IconInfo: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M10 14V10M10 6H10.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconWarning: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M10 2L18 17H2L10 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 7V11M10 14H10.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconSuccess: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M6.5 10L9 12.5L13.5 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconError: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M13 7L7 13M7 7L13 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── AI / Intuit Assist Icons ── */

export const IconSparkle: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M10 2L11.5 7.5L17 6L12.5 9.5L17 13L11.5 11.5L10 17L8.5 11.5L3 13L7.5 9.5L3 6L8.5 7.5L10 2Z" fill={color} />
  </svg>
);

export const IconSend: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconThumbsUp: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M6 9V17M3 11V17H6M6 9L9 2C9.83 2 10.62 2.33 11.21 2.92C11.79 3.5 12.12 4.29 12.12 5.12V7H16.31C16.57 7 16.82 7.05 17.05 7.16C17.28 7.27 17.48 7.42 17.64 7.61C17.8 7.8 17.91 8.03 17.96 8.27C18.01 8.51 18 8.77 17.94 9.01L16.38 15.51C16.28 15.92 16.04 16.28 15.72 16.54C15.39 16.8 14.99 16.95 14.57 16.95H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconThumbsDown: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M14 11V3M17 9V3H14M14 11L11 18C10.17 18 9.38 17.67 8.79 17.08C8.21 16.5 7.88 15.71 7.88 14.88V13H3.69C3.43 13 3.18 12.95 2.95 12.84C2.72 12.73 2.52 12.58 2.36 12.39C2.2 12.2 2.09 11.97 2.04 11.73C1.99 11.49 2 11.23 2.06 10.99L3.62 4.49C3.72 4.08 3.96 3.72 4.28 3.46C4.61 3.2 5.01 3.05 5.43 3.05H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconRefresh: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M16 4V8H12M4 16V12H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.34 7C5.78 5.86 6.57 4.89 7.6 4.23C8.63 3.57 9.84 3.25 11.06 3.31C12.28 3.37 13.45 3.82 14.41 4.58C15.37 5.34 16.06 6.38 16.38 7.55M3.62 12.45C3.94 13.62 4.63 14.66 5.59 15.42C6.55 16.18 7.72 16.63 8.94 16.69C10.16 16.75 11.37 16.43 12.4 15.77C13.43 15.11 14.22 14.14 14.66 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCollapse: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M6 4L6 16M10 7L14 10L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconExpand: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M14 4L14 16M10 7L6 10L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowBack: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M17 10H3M3 10L8 5M3 10L8 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconPin: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
    <path d="M14.5 3L17 5.5L13.5 9L14 13L7 6L11 6.5L14.5 3ZM7 6L3 10M14 13L10 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
