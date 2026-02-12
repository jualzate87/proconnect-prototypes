import React from 'react';

/**
 * ================================================================
 * CG Foundations — Utility Icon Library
 * ================================================================
 *
 * Icons sourced from CG Foundations (Figma: 8FTQg5U7n0zoPImwfNmusr)
 * Standard grid: 24×24  |  Stroke: 1.5px  |  Color: currentColor
 *
 * Sizes (CG standard):
 *   XSmall = 16  |  Small = 20  |  Medium = 24  |  Large = 28  |  XLarge = 32
 *
 * Categories mirror the CG Foundations file:
 *   UI, Actions, People, Document, Financial, Business/Taxes,
 *   Security, Tech, Misc, Intuit Assist
 *
 * ================================================================
 */

export interface IconProps {
  /** Rendered width & height in px. CG sizes: 16 | 20 | 24 | 28 | 32 */
  size?: number;
  /** Stroke / fill color — defaults to currentColor */
  color?: string;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────
// UI  (CG category: UI)
// ─────────────────────────────────────────────────────────────────

/** menu — hamburger / 3 horizontal lines */
export const IconMenu: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H21M3 12H21M3 18H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** menu-expand */
export const IconMenuExpand: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H21M3 12H15M3 18H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 10L21 12L18 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** menu-collapse */
export const IconMenuCollapse: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H21M9 12H21M3 18H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 10L3 12L6 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** chevron-left */
export const IconChevronLeft: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** chevron-right */
export const IconChevronRight: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 6L15 12L9 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** chevron-up */
export const IconChevronUp: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 15L12 9L18 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** chevron-down */
export const IconChevronDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** sm-chevron-left (smaller stroke, tighter angle) */
export const IconSmChevronLeft: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 16L10 12L14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** sm-chevron-right */
export const IconSmChevronRight: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10 8L14 12L10 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** sm-chevron-up */
export const IconSmChevronUp: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 14L12 10L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** sm-chevron-down */
export const IconSmChevronDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 10L12 14L16 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** chevron-up-double */
export const IconChevronUpDouble: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 15L12 10L17 15M7 11L12 6L17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** drop-down — filled triangle pointing down */
export const IconDropDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 10L12 15L17 10H7Z" fill={color} />
  </svg>
);

/** drop-right */
export const IconDropRight: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10 7L15 12L10 17V7Z" fill={color} />
  </svg>
);

/** drop-left */
export const IconDropLeft: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 7L9 12L14 17V7Z" fill={color} />
  </svg>
);

/** arrow-up */
export const IconArrowUp: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** arrow-down */
export const IconArrowDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** arrow-right */
export const IconArrowRight: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** arrow-back */
export const IconArrowBack: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M19 12H5M5 12L12 5M5 12L12 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** home */
export const IconHome: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.55 5.45 21 6 21H9M19 10L21 12M19 10V20C19 20.55 18.55 21 18 21H15M9 21V15C9 14.45 9.45 14 10 14H14C14.55 14 15 14.45 15 15V21M9 21H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** home-fill */
export const IconHomeFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12L12 3L21 12H19V20C19 20.55 18.55 21 18 21H14V15H10V21H6C5.45 21 5 20.55 5 20V12H3Z" fill={color} />
  </svg>
);

/** search */
export const IconSearch: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.5" />
    <path d="M15.5 15.5L21 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** settings — gear */
export const IconSettings: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M19.4 15C19.2 15.3 19.1 15.7 19.2 16C19.3 16.4 19.5 16.7 19.7 16.9L19.8 17C20.4 17.6 20.4 18.5 19.8 19.1C19.2 19.7 18.3 19.7 17.7 19.1L17.6 19C17.3 18.7 17 18.6 16.7 18.5C16.3 18.5 16 18.5 15.7 18.7C15.4 18.8 15.2 19 15 19.3C14.9 19.5 14.8 19.8 14.8 20.1V20.5C14.8 21.3 14.1 22 13.3 22H10.7C9.9 22 9.2 21.3 9.2 20.5V20.1C9.2 19.8 9.1 19.5 9 19.3C8.8 19 8.6 18.8 8.3 18.7C8 18.5 7.7 18.5 7.3 18.5C7 18.6 6.7 18.7 6.4 19L6.3 19.1C5.7 19.7 4.8 19.7 4.2 19.1C3.6 18.5 3.6 17.6 4.2 17L4.3 16.9C4.5 16.7 4.7 16.4 4.8 16C4.8 15.7 4.8 15.3 4.6 15C4.5 14.7 4.3 14.5 4 14.4C3.8 14.3 3.5 14.2 3.2 14.2H2.8C2 14.2 1.3 13.5 1.3 12.7V10.3C1.3 9.5 2 8.8 2.8 8.8H3.2C3.5 8.8 3.8 8.7 4 8.5C4.3 8.4 4.5 8.2 4.6 7.9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** overflow — 3 horizontal dots */
export const IconOverflow: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="5" cy="12" r="1.5" fill={color} />
    <circle cx="12" cy="12" r="1.5" fill={color} />
    <circle cx="19" cy="12" r="1.5" fill={color} />
  </svg>
);

/** other — 3 vertical dots */
export const IconMoreVertical: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="5" r="1.5" fill={color} />
    <circle cx="12" cy="12" r="1.5" fill={color} />
    <circle cx="12" cy="19" r="1.5" fill={color} />
  </svg>
);

/** circle-alert */
export const IconCircleAlert: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 8V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="0.75" fill={color} />
  </svg>
);

/** circle-alert-fill */
export const IconCircleAlertFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M12 8V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="0.75" fill="white" />
  </svg>
);

/** circle-check */
export const IconCircleCheck: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M8 12L11 15L16 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** circle-check-fill */
export const IconCircleCheckFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** circle-info-fill */
export const IconCircleInfoFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M12 16V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="0.75" fill="white" />
  </svg>
);

/** info — outlined i in circle */
export const IconInfo: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 16V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="0.75" fill={color} />
  </svg>
);

/** alert — triangle warning */
export const IconAlert: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L22 20H2L12 3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 9V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.75" fill={color} />
  </svg>
);

/** alert-fill */
export const IconAlertFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L23 21H1L12 2Z" fill={color} />
    <path d="M12 9V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.75" fill="white" />
  </svg>
);

/** clock */
export const IconClock: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 7V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** calendar */
export const IconCalendar: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="17" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M3 9H21M8 2V5M16 2V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** calendar-clock */
export const IconCalendarClock: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="4" width="18" height="17" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M3 9H21M8 2V5M16 2V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="15" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M12 13.5V15L13 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** dashboard — 4-quadrant grid */
export const IconDashboard: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** dashboard-fill */
export const IconDashboardFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="8" height="8" rx="1" fill={color} />
    <rect x="13" y="3" width="8" height="8" rx="1" fill={color} />
    <rect x="3" y="13" width="8" height="8" rx="1" fill={color} />
    <rect x="13" y="13" width="8" height="8" rx="1" fill={color} />
  </svg>
);

/** checkmark */
export const IconCheckmark: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12L10 17L20 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** checkbox-on */
export const IconCheckboxOn: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" />
    <path d="M7 12L10.5 15.5L17 8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** checkbox-off */
export const IconCheckboxOff: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** checkbox-fill */
export const IconCheckboxFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" fill={color} />
    <path d="M7 12L10.5 15.5L17 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** radio-toggle-on */
export const IconRadioOn: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" fill={color} />
  </svg>
);

/** radio-toggle-off */
export const IconRadioOff: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** question — ? in circle */
export const IconQuestion: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12V13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="0.75" fill={color} />
  </svg>
);

/** cg-help / help-fill — ? in filled circle */
export const IconHelp: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="0.75" fill={color} />
  </svg>
);

/** loading — partial circle spinner */
export const IconLoading: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3C16.97 3 21 7.03 21 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** location */
export const IconLocation: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21C12 21 19 14.5 19 9.5C19 5.36 15.87 2 12 2C8.13 2 5 5.36 5 9.5C5 14.5 12 21 12 21Z" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="9.5" r="2.5" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** no-access — circle with diagonal line */
export const IconNoAccess: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M5.5 5.5L18.5 18.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** maximize */
export const IconMaximize: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 3H5C3.9 3 3 3.9 3 5V8M16 3H19C20.1 3 21 3.9 21 5V8M8 21H5C3.9 21 3 20.1 3 19V16M16 21H19C20.1 21 21 20.1 21 19V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** minimize */
export const IconMinimize: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 14H10V20M20 10H14V4M14 10L21 3M3 21L10 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** new-window */
export const IconNewWindow: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 13V19C18 19.55 17.55 20 17 20H5C4.45 20 4 19.55 4 19V7C4 6.45 4.45 6 5 6H11M15 3H21V9M21 3L11 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** list */
export const IconList: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 6H21M9 12H21M9 18H21M4 6H4.01M4 12H4.01M4 18H4.01" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** checklist */
export const IconChecklist: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 6H21M12 12H21M12 18H21M3 6L4.5 7.5L7.5 4.5M3 12L4.5 13.5L7.5 10.5M3 18L4.5 19.5L7.5 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** chart — bar chart */
export const IconChart: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 20V10M12 20V4M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** magic — sparkle wand */
export const IconMagic: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 4L17 2L19 4L17 6L15 4Z" fill={color} />
    <path d="M4 20L14 10M7.5 20L4 16.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 5L6 3L7 5L6 7L5 5Z" fill={color} />
    <path d="M19 14L20 12L21 14L20 16L19 14Z" fill={color} />
  </svg>
);

/** zoom-in */
export const IconZoomIn: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.5" />
    <path d="M15.5 15.5L21 21M10.5 7.5V13.5M7.5 10.5H13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** zoom-out */
export const IconZoomOut: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.5" />
    <path d="M15.5 15.5L21 21M7.5 10.5H13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** equals */
export const IconEquals: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 9H19M5 15H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** calc — calculator */
export const IconCalc: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.5" />
    <rect x="7" y="5" width="10" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <circle cx="8.5" cy="13" r="0.75" fill={color} />
    <circle cx="12" cy="13" r="0.75" fill={color} />
    <circle cx="15.5" cy="13" r="0.75" fill={color} />
    <circle cx="8.5" cy="16.5" r="0.75" fill={color} />
    <circle cx="12" cy="16.5" r="0.75" fill={color} />
    <circle cx="15.5" cy="16.5" r="0.75" fill={color} />
    <circle cx="8.5" cy="19.5" r="0.75" fill={color} />
    <circle cx="12" cy="19.5" r="0.75" fill={color} />
    <circle cx="15.5" cy="19.5" r="0.75" fill={color} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Actions  (CG category: Actions)
// ─────────────────────────────────────────────────────────────────

/** close — X */
export const IconClose: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** clear-fill — X in filled circle */
export const IconClearFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** clear-field */
export const IconClearField: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M9 9L15 15M15 9L9 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** add — plus */
export const IconAdd: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** add-fill — plus in filled circle */
export const IconAddFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** download */
export const IconDownload: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 15V19C21 19.55 20.55 20 20 20H4C3.45 20 3 19.55 3 19V15M12 3V15M12 15L7 10M12 15L17 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** upload */
export const IconUpload: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 15V19C21 19.55 20.55 20 20 20H4C3.45 20 3 19.55 3 19V15M12 16V4M12 4L7 9M12 4L17 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** share */
export const IconShare: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="18" cy="5" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="6" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M8.7 13.5L15.3 17.5M15.3 6.5L8.7 10.5" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** link */
export const IconLink: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10 14C10.66 14.87 11.61 15.43 12.67 15.57C13.73 15.71 14.8 15.42 15.64 14.78L18.64 12.28C19.48 11.64 20.01 10.68 20.11 9.63C20.22 8.57 19.89 7.52 19.21 6.71C18.53 5.9 17.55 5.41 16.5 5.35C15.44 5.29 14.42 5.66 13.64 6.38" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 10C13.34 9.13 12.39 8.57 11.33 8.43C10.27 8.29 9.2 8.58 8.36 9.22L5.36 11.72C4.52 12.36 3.99 13.32 3.89 14.37C3.78 15.43 4.11 16.48 4.79 17.29C5.47 18.1 6.45 18.59 7.5 18.65C8.56 18.71 9.58 18.34 10.36 17.62" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** unlink */
export const IconUnlink: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 7H18C20.21 7 22 8.79 22 11C22 13.21 20.21 15 18 15H15M9 7H6C3.79 7 2 8.79 2 11C2 13.21 3.79 15 6 15H9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 4L20 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** edit — pencil */
export const IconEdit: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 4L20 9L9 20H4V15L15 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** delete — trash can */
export const IconDelete: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H21M8 6V4C8 3.45 8.45 3 9 3H15C15.55 3 16 3.45 16 4V6M10 10V17M14 10V17M5 6L6 20C6 20.55 6.45 21 7 21H17C17.55 21 18 20.55 18 20L19 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** copy */
export const IconCopy: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="9" y="9" width="12" height="12" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M15 9V5C15 3.9 14.1 3 13 3H5C3.9 3 3 3.9 3 5V13C3 14.1 3.9 15 5 15H9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** duplicate */
export const IconDuplicate: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="8" y="8" width="13" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M16 8V5C16 3.9 15.1 3 14 3H5C3.9 3 3 3.9 3 5V14C3 15.1 3.9 16 5 16H8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14.5 12V18M11.5 15H17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** filter — funnel */
export const IconFilter: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 5H21M6 10H18M9 15H15M11 20H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** sort — up/down arrows */
export const IconSort: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 4V20M8 20L4 16M8 20L12 16M16 20V4M16 4L12 8M16 4L20 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** sort-ascending */
export const IconSortAscending: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 20V4M12 4L7 9M12 4L17 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** sort-descending */
export const IconSortDescending: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4V20M12 20L7 15M12 20L17 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** notification — bell */
export const IconNotification: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 8C18 6.4 17.37 4.88 16.24 3.76C15.12 2.63 13.59 2 12 2C10.41 2 8.88 2.63 7.76 3.76C6.63 4.88 6 6.4 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.73 21C13.55 21.3 13.3 21.55 12.99 21.73C12.69 21.9 12.35 22 12 22C11.65 22 11.31 21.9 11 21.73C10.7 21.55 10.45 21.3 10.27 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** eye — visibility */
export const IconEye: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** eye-off — hidden */
export const IconEyeOff: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9.88 9.88C9.32 10.44 9 11.2 9 12C9 12.8 9.32 13.56 9.88 14.12C10.44 14.68 11.2 15 12 15C12.8 15 13.56 14.68 14.12 14.12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 3L21 21M10.59 4.58C11.06 4.53 11.53 4.5 12 4.5C19 4.5 23 12 23 12C22.05 13.64 20.82 15.1 19.36 16.28M5.71 5.71C3.22 7.5 1 12 1 12C1 12 5 19.5 12 19.5C14.03 19.5 15.86 18.86 17.38 17.92" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** undo */
export const IconUndo: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 7H15C18.31 7 21 9.69 21 13C21 16.31 18.31 19 15 19H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3L3 7L7 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** redo */
export const IconRedo: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 7H9C5.69 7 3 9.69 3 13C3 16.31 5.69 19 9 19H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 3L21 7L17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** refresh */
export const IconRefresh: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 4V9H15M4 20V15H9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.34 8C7.16 5.72 9.38 4 12 4C15.31 4 18 6.69 18 10M17.66 16C16.84 18.28 14.62 20 12 20C8.69 20 6 17.31 6 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** send — paper plane */
export const IconSend: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** export */
export const IconExport: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 15V3M12 3L8 7M12 3L16 7M4 17V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** attach — paperclip */
export const IconAttach: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21.44 11.05L12.25 20.24C10.45 22.04 7.52 22.04 5.72 20.24C3.92 18.44 3.92 15.51 5.72 13.71L14.91 4.52C16.02 3.41 17.82 3.41 18.93 4.52C20.04 5.63 20.04 7.43 18.93 8.54L9.74 17.73C9.18 18.29 8.28 18.29 7.73 17.73C7.17 17.17 7.17 16.28 7.73 15.72L16.22 7.23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** pin */
export const IconPin: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21V15M9 15H15M16 3L18 5L15 10H18L15 15H9L6 10H9L6 5L8 3H16Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** pin-fill */
export const IconPinFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21V15M9 15H15M16 3L18 5L15 10H18L15 15H9L6 10H9L6 5L8 3H16Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** tag */
export const IconTag: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L2 12L12 22L22 12V2H12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17" cy="7" r="1.5" fill={color} />
  </svg>
);

/** flag */
export const IconFlag: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 21V4M4 15H14L12 11L14 7H4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** star */
export const IconStar: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** star-fill */
export const IconStarFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={color} />
  </svg>
);

/** bookmark */
export const IconBookmark: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 3H19V21L12 16L5 21V3Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** bookmark-fill */
export const IconBookmarkFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 3H19V21L12 16L5 21V3Z" fill={color} />
  </svg>
);

/** thumb-up */
export const IconThumbUp: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 11V21M4 13V21H7M7 11L10 3C11.1 3 12.05 3.42 12.77 4.12C13.49 4.83 13.9 5.78 13.9 6.78V9H19C19.32 9 19.63 9.06 19.91 9.19C20.2 9.31 20.45 9.5 20.64 9.73C20.84 9.97 20.97 10.25 21.03 10.55C21.09 10.85 21.07 11.16 20.97 11.45L19.05 18.95C18.92 19.44 18.63 19.87 18.23 20.17C17.83 20.48 17.34 20.63 16.84 20.63H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** thumb-down */
export const IconThumbDown: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 13V3M20 11V3H17M17 13L14 21C12.9 21 11.95 20.58 11.23 19.88C10.51 19.17 10.1 18.22 10.1 17.22V15H5C4.68 15 4.37 14.94 4.09 14.81C3.8 14.69 3.55 14.5 3.36 14.27C3.16 14.03 3.03 13.75 2.97 13.45C2.91 13.15 2.93 12.84 3.03 12.55L4.95 5.05C5.08 4.56 5.37 4.13 5.77 3.83C6.17 3.52 6.66 3.37 7.16 3.37H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** note — file with text */
export const IconNote: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8H20M8 13H16M8 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** note-plus */
export const IconNotePlus: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8H20M12 12V18M9 15H15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** archive */
export const IconArchive: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="5" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M4 8V20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20V8M10 12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** schedule */
export const IconSchedule: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 6V12L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** drag — 6 dots */
export const IconDrag: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="5" r="1.25" fill={color} />
    <circle cx="15" cy="5" r="1.25" fill={color} />
    <circle cx="9" cy="12" r="1.25" fill={color} />
    <circle cx="15" cy="12" r="1.25" fill={color} />
    <circle cx="9" cy="19" r="1.25" fill={color} />
    <circle cx="15" cy="19" r="1.25" fill={color} />
  </svg>
);

/** grid */
export const IconGrid: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** collapse */
export const IconCollapse: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 4V20M12 8L17 12L12 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** expand / pop-out */
export const IconExpand: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 4V20M12 8L7 12L12 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** cloud */
export const IconCloud: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 10H16.74C16.36 8.56 15.52 7.27 14.34 6.34C13.16 5.42 11.71 4.92 10.22 4.92C8.73 4.92 7.28 5.42 6.1 6.34C4.92 7.27 4.08 8.56 3.7 10H3.5C2.67 10 1.88 10.33 1.29 10.93C0.71 11.52 0.38 12.32 0.38 13.15C0.38 13.98 0.71 14.78 1.29 15.37C1.88 15.96 2.67 16.3 3.5 16.3H18C19.06 16.3 20.08 15.87 20.83 15.12C21.58 14.37 22 13.36 22 12.3C22 11.24 21.58 10.23 20.83 9.48C20.08 8.73 19.06 8.3 18 8.3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** reply */
export const IconReply: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 4L3 10L9 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 10H15C18.31 10 21 12.69 21 16V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** nightmode — moon */
export const IconNightmode: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 12.79C20.8 14.63 20 16.35 18.73 17.67C17.46 18.99 15.79 19.83 13.97 20.08C12.15 20.33 10.3 19.97 8.72 19.05C7.14 18.13 5.93 16.71 5.27 15.01C4.61 13.32 4.54 11.45 5.07 9.72C5.6 7.98 6.7 6.48 8.21 5.45C9.71 4.42 11.53 3.93 13.36 4.04C15.19 4.16 16.93 4.88 18.31 6.08C16.98 5.76 15.58 5.85 14.3 6.33C13.02 6.81 11.92 7.67 11.15 8.79C10.38 9.91 9.98 11.24 10 12.59C10.02 13.94 10.46 15.26 11.26 16.36C12.06 17.45 13.18 18.28 14.47 18.73C15.77 19.18 17.18 19.23 18.5 18.88C17.86 20.43 16.65 21.68 15.12 22.37" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** comments / message */
export const IconMessage: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** play */
export const IconPlay: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M10 8L16 12L10 16V8Z" fill={color} />
  </svg>
);

/** pause */
export const IconPause: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M10 8V16M14 8V16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** template */
export const IconTemplate: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M3 9H21M9 9V21" stroke={color} strokeWidth="1.5" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// People  (CG category: People)
// ─────────────────────────────────────────────────────────────────

/** user — single person */
export const IconUser: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 21V19C20 17.93 19.58 16.93 18.83 16.17C18.07 15.42 17.07 15 16 15H8C6.93 15 5.93 15.42 5.17 16.17C4.42 16.93 4 17.93 4 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** multi-users — 2+ people */
export const IconMultiUsers: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 21V19C17 17.93 16.58 16.93 15.83 16.17C15.07 15.42 14.07 15 13 15H5C3.93 15 2.93 15.42 2.17 16.17C1.42 16.93 1 17.93 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path d="M23 21V19C22.99 18.13 22.68 17.29 22.13 16.61C21.58 15.94 20.82 15.47 19.97 15.28M16 3.28C16.85 3.47 17.62 3.94 18.17 4.62C18.72 5.29 19.04 6.13 19.04 7C19.04 7.87 18.72 8.71 18.17 9.38C17.62 10.06 16.85 10.53 16 10.72" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** add-user */
export const IconAddUser: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M16 21V19C16 17.93 15.58 16.93 14.83 16.17C14.07 15.42 13.07 15 12 15H5C3.93 15 2.93 15.42 2.17 16.17C1.42 16.93 1 17.93 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path d="M20 8V14M17 11H23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** accountant */
export const IconAccountant: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M16 21V19C16 17.93 15.58 16.93 14.83 16.17C14.07 15.42 13.07 15 12 15H5C3.93 15 2.93 15.42 2.17 16.17C1.42 16.93 1 17.93 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path d="M19 3V9M22 6H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="19" cy="6" r="4" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** avatar — generic head silhouette */
export const IconAvatar: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="1.5" />
    <path d="M3 21C3 17.13 7.03 14 12 14C16.97 14 21 17.13 21 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** speech-bubble */
export const IconSpeechBubble: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21C7.03 21 3 17.42 3 13C3 8.58 7.03 5 12 5C16.97 5 21 8.58 21 13C21 14.88 20.27 16.59 19.05 17.93L21 21L16.5 19.83C15.15 20.58 13.62 21 12 21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** switch-clients */
export const IconSwitchClients: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="7" r="3.5" stroke={color} strokeWidth="1.5" />
    <path d="M2 20V18.5C2 16.01 4.01 14 6.5 14H11.5C13.99 14 16 16.01 16 18.5V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 8L21 10L19 12M21 10H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Document  (CG category: Document)
// ─────────────────────────────────────────────────────────────────

/** document */
export const IconDocument: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** document-alt — with text lines */
export const IconDocumentAlt: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8H20M8 13H16M8 17H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** folder */
export const IconFolder: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 19C22 19.53 21.79 20.04 21.41 20.41C21.04 20.79 20.53 21 20 21H4C3.47 21 2.96 20.79 2.59 20.41C2.21 20.04 2 19.53 2 19V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H9L11 6H20C20.53 6 21.04 6.21 21.41 6.59C21.79 6.96 22 7.47 22 8V19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** folder-fill */
export const IconFolderFill: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 19C22 19.53 21.79 20.04 21.41 20.41C21.04 20.79 20.53 21 20 21H4C3.47 21 2.96 20.79 2.59 20.41C2.21 20.04 2 19.53 2 19V5C2 4.47 2.21 3.96 2.59 3.59C2.96 3.21 3.47 3 4 3H9L11 6H20C20.53 6 21.04 6.21 21.41 6.59C21.79 6.96 22 7.47 22 8V19Z" fill={color} />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Financial  (CG category: Financial)
// ─────────────────────────────────────────────────────────────────

/** dollar-sign */
export const IconDollarSign: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2V22M17 5H9.5C8.57 5 7.68 5.37 7.03 6.03C6.37 6.68 6 7.57 6 8.5C6 9.43 6.37 10.32 7.03 10.97C7.68 11.63 8.57 12 9.5 12H14.5C15.43 12 16.32 12.37 16.97 13.03C17.63 13.68 18 14.57 18 15.5C18 16.43 17.63 17.32 16.97 17.97C16.32 18.63 15.43 19 14.5 19H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** bank */
export const IconBank: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 21H21M3 10H21M5 10V17M9 10V17M15 10V17M19 10V17M12 2L22 10H2L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** cash */
export const IconCash: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M2 9H4M20 9H22M2 15H4M20 15H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** graph — trending line */
export const IconGraph: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 12L18 8L13 13L9 9L2 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8H22V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** card — credit card */
export const IconCard: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M2 10H22" stroke={color} strokeWidth="1.5" />
    <path d="M6 16H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Business / Taxes  (CG category: Business-Taxes)
// ─────────────────────────────────────────────────────────────────

/** tax — form with $ */
export const IconTax: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11V19M14.5 13H10.75C10.28 13 9.83 13.18 9.5 13.5C9.17 13.83 9 14.28 9 14.75C9 15.22 9.17 15.67 9.5 16C9.83 16.33 10.28 16.5 10.75 16.5H13.25C13.72 16.5 14.17 16.68 14.5 17C14.83 17.33 15 17.78 15 18.25C15 18.72 14.83 19.17 14.5 19.5C14.17 19.83 13.72 20 13.25 20H9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** invoices */
export const IconInvoices: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 2H18C19.1 2 20 2.9 20 4V22L17 20L14 22L12 20L10 22L7 20L4 22V4C4 2.9 4.9 2 6 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 7H16M8 11H16M8 15H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** receipt */
export const IconReceipt: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 2H18C19.1 2 20 2.9 20 4V22L17.5 20L15 22L12 20L9 22L6.5 20L4 22V4C4 2.9 4.9 2 6 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 8H16M8 12H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** reports — bar chart on paper */
export const IconReports: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M8 18V14M12 18V10M16 18V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** headset — support */
export const IconHeadset: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 18V12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12V18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 19C21 19.55 20.55 20 20 20H19C18.45 20 18 19.55 18 19V15C18 14.45 18.45 14 19 14H21V19ZM3 19C3 19.55 3.45 20 4 20H5C5.55 20 6 19.55 6 19V15C6 14.45 5.55 14 5 14H3V19Z" stroke={color} strokeWidth="1.5" />
  </svg>
);

/** legal — scales */
export const IconLegal: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3V19M12 3L6 7L3 16C3 17.1 4.34 18 6 18C7.66 18 9 17.1 9 16L6 7M12 3L18 7L21 16C21 17.1 19.66 18 18 18C16.34 18 15 17.1 15 16L18 7M8 21H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Security  (CG category: Security)
// ─────────────────────────────────────────────────────────────────

/** lock */
export const IconLock: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill={color} />
  </svg>
);

/** unlock */
export const IconUnlock: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="1" fill={color} />
  </svg>
);

/** security — shield */
export const IconSecurity: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L3 7V12C3 17.52 6.84 22.74 12 24C17.16 22.74 21 17.52 21 12V7L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Tech  (CG category: Tech)
// ─────────────────────────────────────────────────────────────────

/** email */
export const IconEmail: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M2 7L12 13L22 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** print */
export const IconPrint: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9V2H18V9M6 18H4C3.47 18 2.96 17.79 2.59 17.41C2.21 17.04 2 16.53 2 16V11C2 10.47 2.21 9.96 2.59 9.59C2.96 9.21 3.47 9 4 9H20C20.53 9 21.04 9.21 21.41 9.59C21.79 9.96 22 10.47 22 11V16C22 16.53 21.79 17.04 21.41 17.41C21.04 17.79 20.53 18 20 18H18M6 14H18V22H6V14Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** desktop — monitor */
export const IconDesktop: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M8 21H16M12 17V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** mobile — phone */
export const IconMobile: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="2" width="12" height="20" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M10 18H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** history — clock with arrow */
export const IconHistory: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C9.79 21 7.77 20.16 6.23 18.77" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 7V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 9L3 12L6 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Intuit Assist  (CG category: Intuit Assist)
// ─────────────────────────────────────────────────────────────────

/** intuit-assist / sparkles */
export const IconIntuitAssist: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L13.8 8.2L20 6L14.8 10.8L20 15.6L13.8 13.8L12 20L10.2 13.8L4 15.6L9.2 10.8L4 6L10.2 8.2L12 2Z" fill={color} />
  </svg>
);

/** sparkles (alias) */
export const IconSparkles: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L13.8 8.2L20 6L14.8 10.8L20 15.6L13.8 13.8L12 20L10.2 13.8L4 15.6L9.2 10.8L4 6L10.2 8.2L12 2Z" fill={color} />
  </svg>
);

/** assistant — sparkle with face */
export const IconAssistant: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14 8L20 6L15 11L20 16L14 14L12 20L10 14L4 16L9 11L4 6L10 8L12 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// PTG ProConnect–specific (from PTG PTO Web Components)
// ─────────────────────────────────────────────────────────────────

/** tax-return — document with lines (ProConnect nav) */
export const IconTaxReturn: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 2H17C18.1 2 19 2.9 19 4V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V4C5 2.9 5.9 2 7 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 7H15M9 11H15M9 15H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** clients — multi-user (ProConnect nav alias) */
export const IconClients: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M17 21V19C17 17.93 16.58 16.93 15.83 16.17C15.07 15.42 14.07 15 13 15H5C3.93 15 2.93 15.42 2.17 16.17C1.42 16.93 1 17.93 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path d="M23 21V19C22.99 18.13 22.68 17.29 22.13 16.61C21.58 15.94 20.82 15.47 19.97 15.28M16 3.28C16.85 3.47 17.62 3.94 18.17 4.62C18.72 5.29 19.04 6.13 19.04 7C19.04 7.87 18.72 8.71 18.17 9.38C17.62 10.06 16.85 10.53 16 10.72" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** reporting — bar chart (ProConnect nav) */
export const IconReporting: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 20V10M12 20V4M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────
// Backward-compatible aliases
// ─────────────────────────────────────────────────────────────────

/** @deprecated Use IconAdd */
export const IconPlus = IconAdd;
/** @deprecated Use IconCheckmark */
export const IconCheck = IconCheckmark;
/** @deprecated Use IconDelete */
export const IconTrash = IconDelete;
/** @deprecated Use IconNewWindow */
export const IconExternalLink = IconNewWindow;
/** @deprecated Use IconAlert */
export const IconWarning = IconAlert;
/** @deprecated Use IconCircleCheck */
export const IconSuccess = IconCircleCheck;
/** @deprecated Use IconClearField */
export const IconError = IconClearField;
/** @deprecated Use IconLink */
export const IconMinus: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12H19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
/** @deprecated Use IconIntuitAssist */
export const IconSparkle = IconIntuitAssist;
/** @deprecated Use IconThumbUp */
export const IconThumbsUp = IconThumbUp;
/** @deprecated Use IconThumbDown */
export const IconThumbsDown = IconThumbDown;
