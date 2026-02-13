import { useState } from 'react';
import { Link } from 'react-router-dom';
import './IconShowcase.css';

/* ── Import every icon from the library ── */
import {
  // UI
  IconMenu, IconMenuExpand, IconMenuCollapse,
  IconChevronLeft, IconChevronRight, IconChevronUp, IconChevronDown,
  IconSmChevronLeft, IconSmChevronRight, IconSmChevronUp, IconSmChevronDown,
  IconChevronUpDouble, IconDropDown, IconDropRight, IconDropLeft,
  IconArrowUp, IconArrowDown, IconArrowRight, IconArrowBack,
  IconHome, IconHomeFill, IconSearch, IconSettings,
  IconOverflow, IconMoreVertical,
  IconCircleAlert, IconCircleAlertFill, IconCircleCheck, IconCircleCheckFill,
  IconCircleInfoFill, IconInfo, IconAlert, IconAlertFill,
  IconClock, IconCalendar, IconCalendarClock,
  IconDashboard, IconDashboardFill,
  IconCheckmark, IconCheckboxOn, IconCheckboxOff, IconCheckboxFill,
  IconRadioOn, IconRadioOff,
  IconQuestion, IconHelp, IconLoading, IconLocation, IconNoAccess,
  IconMaximize, IconMinimize, IconNewWindow,
  IconList, IconChecklist, IconChart, IconMagic,
  IconZoomIn, IconZoomOut, IconEquals, IconCalc,

  // Actions
  IconClose, IconClearFill, IconClearField,
  IconAdd, IconAddFill,
  IconDownload, IconUpload, IconShare, IconLink, IconUnlink,
  IconEdit, IconDelete, IconCopy, IconDuplicate,
  IconFilter, IconSort, IconSortAscending, IconSortDescending,
  IconNotification, IconEye, IconEyeOff,
  IconUndo, IconRedo, IconRefresh,
  IconSend, IconExport, IconAttach,
  IconPin, IconPinFill, IconTag, IconFlag,
  IconStar, IconStarFill, IconBookmark, IconBookmarkFill,
  IconThumbUp, IconThumbDown,
  IconNote, IconNotePlus, IconArchive, IconSchedule, IconDrag,
  IconGrid, IconCollapse, IconExpand,
  IconCloud, IconReply, IconNightmode, IconMessage,
  IconPlay, IconPause, IconTemplate,

  // People
  IconUser, IconMultiUsers, IconAddUser, IconAccountant,
  IconAvatar, IconSpeechBubble, IconSwitchClients,

  // Document
  IconDocument, IconDocumentAlt, IconFolder, IconFolderFill,

  // Financial
  IconDollarSign, IconBank, IconCash, IconGraph, IconCard,

  // Business / Taxes
  IconTax, IconInvoices, IconReceipt, IconReports, IconHeadset, IconLegal,

  // Security
  IconLock, IconUnlock, IconSecurity,

  // Tech
  IconEmail, IconPrint, IconDesktop, IconMobile, IconHistory,

  // Intuit Assist
  IconIntuitAssist, IconSparkles, IconAssistant,

  // PTG ProConnect
  IconTaxReturn, IconClients, IconReporting,

  // Brand
  IconProConnectMark, ProConnectLogo,
} from '../ProConnectLibrary';

/* ── Define the icon catalog ── */
interface IconEntry {
  name: string;
  component: React.FC<{ size?: number; color?: string; className?: string }>;
}

interface IconCategory {
  title: string;
  description: string;
  icons: IconEntry[];
}

const categories: IconCategory[] = [
  {
    title: 'UI',
    description: 'Navigation, status indicators, form controls, and core interface elements',
    icons: [
      { name: 'menu', component: IconMenu },
      { name: 'menu-expand', component: IconMenuExpand },
      { name: 'menu-collapse', component: IconMenuCollapse },
      { name: 'chevron-left', component: IconChevronLeft },
      { name: 'chevron-right', component: IconChevronRight },
      { name: 'chevron-up', component: IconChevronUp },
      { name: 'chevron-down', component: IconChevronDown },
      { name: 'sm-chevron-left', component: IconSmChevronLeft },
      { name: 'sm-chevron-right', component: IconSmChevronRight },
      { name: 'sm-chevron-up', component: IconSmChevronUp },
      { name: 'sm-chevron-down', component: IconSmChevronDown },
      { name: 'chevron-up-double', component: IconChevronUpDouble },
      { name: 'drop-down', component: IconDropDown },
      { name: 'drop-right', component: IconDropRight },
      { name: 'drop-left', component: IconDropLeft },
      { name: 'arrow-up', component: IconArrowUp },
      { name: 'arrow-down', component: IconArrowDown },
      { name: 'arrow-right', component: IconArrowRight },
      { name: 'arrow-back', component: IconArrowBack },
      { name: 'home', component: IconHome },
      { name: 'home-fill', component: IconHomeFill },
      { name: 'search', component: IconSearch },
      { name: 'settings', component: IconSettings },
      { name: 'overflow', component: IconOverflow },
      { name: 'more-vertical', component: IconMoreVertical },
      { name: 'circle-alert', component: IconCircleAlert },
      { name: 'circle-alert-fill', component: IconCircleAlertFill },
      { name: 'circle-check', component: IconCircleCheck },
      { name: 'circle-check-fill', component: IconCircleCheckFill },
      { name: 'circle-info-fill', component: IconCircleInfoFill },
      { name: 'info', component: IconInfo },
      { name: 'alert', component: IconAlert },
      { name: 'alert-fill', component: IconAlertFill },
      { name: 'clock', component: IconClock },
      { name: 'calendar', component: IconCalendar },
      { name: 'calendar-clock', component: IconCalendarClock },
      { name: 'dashboard', component: IconDashboard },
      { name: 'dashboard-fill', component: IconDashboardFill },
      { name: 'checkmark', component: IconCheckmark },
      { name: 'checkbox-on', component: IconCheckboxOn },
      { name: 'checkbox-off', component: IconCheckboxOff },
      { name: 'checkbox-fill', component: IconCheckboxFill },
      { name: 'radio-on', component: IconRadioOn },
      { name: 'radio-off', component: IconRadioOff },
      { name: 'question', component: IconQuestion },
      { name: 'help', component: IconHelp },
      { name: 'loading', component: IconLoading },
      { name: 'location', component: IconLocation },
      { name: 'no-access', component: IconNoAccess },
      { name: 'maximize', component: IconMaximize },
      { name: 'minimize', component: IconMinimize },
      { name: 'new-window', component: IconNewWindow },
      { name: 'list', component: IconList },
      { name: 'checklist', component: IconChecklist },
      { name: 'chart', component: IconChart },
      { name: 'magic', component: IconMagic },
      { name: 'zoom-in', component: IconZoomIn },
      { name: 'zoom-out', component: IconZoomOut },
      { name: 'equals', component: IconEquals },
      { name: 'calc', component: IconCalc },
    ],
  },
  {
    title: 'Actions',
    description: 'Interactive actions, CRUD operations, and content manipulation',
    icons: [
      { name: 'close', component: IconClose },
      { name: 'clear-fill', component: IconClearFill },
      { name: 'clear-field', component: IconClearField },
      { name: 'add', component: IconAdd },
      { name: 'add-fill', component: IconAddFill },
      { name: 'download', component: IconDownload },
      { name: 'upload', component: IconUpload },
      { name: 'share', component: IconShare },
      { name: 'link', component: IconLink },
      { name: 'unlink', component: IconUnlink },
      { name: 'edit', component: IconEdit },
      { name: 'delete', component: IconDelete },
      { name: 'copy', component: IconCopy },
      { name: 'duplicate', component: IconDuplicate },
      { name: 'filter', component: IconFilter },
      { name: 'sort', component: IconSort },
      { name: 'sort-ascending', component: IconSortAscending },
      { name: 'sort-descending', component: IconSortDescending },
      { name: 'notification', component: IconNotification },
      { name: 'eye', component: IconEye },
      { name: 'eye-off', component: IconEyeOff },
      { name: 'undo', component: IconUndo },
      { name: 'redo', component: IconRedo },
      { name: 'refresh', component: IconRefresh },
      { name: 'send', component: IconSend },
      { name: 'export', component: IconExport },
      { name: 'attach', component: IconAttach },
      { name: 'pin', component: IconPin },
      { name: 'pin-fill', component: IconPinFill },
      { name: 'tag', component: IconTag },
      { name: 'flag', component: IconFlag },
      { name: 'star', component: IconStar },
      { name: 'star-fill', component: IconStarFill },
      { name: 'bookmark', component: IconBookmark },
      { name: 'bookmark-fill', component: IconBookmarkFill },
      { name: 'thumb-up', component: IconThumbUp },
      { name: 'thumb-down', component: IconThumbDown },
      { name: 'note', component: IconNote },
      { name: 'note-plus', component: IconNotePlus },
      { name: 'archive', component: IconArchive },
      { name: 'schedule', component: IconSchedule },
      { name: 'drag', component: IconDrag },
      { name: 'grid', component: IconGrid },
      { name: 'collapse', component: IconCollapse },
      { name: 'expand', component: IconExpand },
      { name: 'cloud', component: IconCloud },
      { name: 'reply', component: IconReply },
      { name: 'nightmode', component: IconNightmode },
      { name: 'message', component: IconMessage },
      { name: 'play', component: IconPlay },
      { name: 'pause', component: IconPause },
      { name: 'template', component: IconTemplate },
    ],
  },
  {
    title: 'People',
    description: 'Users, roles, and social interactions',
    icons: [
      { name: 'user', component: IconUser },
      { name: 'multi-users', component: IconMultiUsers },
      { name: 'add-user', component: IconAddUser },
      { name: 'accountant', component: IconAccountant },
      { name: 'avatar', component: IconAvatar },
      { name: 'speech-bubble', component: IconSpeechBubble },
      { name: 'switch-clients', component: IconSwitchClients },
    ],
  },
  {
    title: 'Document',
    description: 'Files, folders, and document management',
    icons: [
      { name: 'document', component: IconDocument },
      { name: 'document-alt', component: IconDocumentAlt },
      { name: 'folder', component: IconFolder },
      { name: 'folder-fill', component: IconFolderFill },
    ],
  },
  {
    title: 'Financial',
    description: 'Money, banking, and financial instruments',
    icons: [
      { name: 'dollar-sign', component: IconDollarSign },
      { name: 'bank', component: IconBank },
      { name: 'cash', component: IconCash },
      { name: 'graph', component: IconGraph },
      { name: 'card', component: IconCard },
    ],
  },
  {
    title: 'Business / Taxes',
    description: 'Tax forms, invoices, reports, and professional services',
    icons: [
      { name: 'tax', component: IconTax },
      { name: 'invoices', component: IconInvoices },
      { name: 'receipt', component: IconReceipt },
      { name: 'reports', component: IconReports },
      { name: 'headset', component: IconHeadset },
      { name: 'legal', component: IconLegal },
    ],
  },
  {
    title: 'Security',
    description: 'Authentication, access control, and security',
    icons: [
      { name: 'lock', component: IconLock },
      { name: 'unlock', component: IconUnlock },
      { name: 'security', component: IconSecurity },
    ],
  },
  {
    title: 'Tech',
    description: 'Devices, communication, and technology',
    icons: [
      { name: 'email', component: IconEmail },
      { name: 'print', component: IconPrint },
      { name: 'desktop', component: IconDesktop },
      { name: 'mobile', component: IconMobile },
      { name: 'history', component: IconHistory },
    ],
  },
  {
    title: 'Intuit Assist',
    description: 'AI experience icons for Intuit Assist and agentic features',
    icons: [
      { name: 'intuit-assist', component: IconIntuitAssist },
      { name: 'sparkles', component: IconSparkles },
      { name: 'assistant', component: IconAssistant },
    ],
  },
  {
    title: 'PTG ProConnect',
    description: 'ProConnect-specific navigation and product icons',
    icons: [
      { name: 'tax-return', component: IconTaxReturn },
      { name: 'clients', component: IconClients },
      { name: 'reporting', component: IconReporting },
    ],
  },
  {
    title: 'Brand',
    description: 'ProConnect brand assets with fixed brand colors',
    icons: [
      { name: 'proconnect-mark', component: IconProConnectMark as React.FC<{ size?: number; color?: string; className?: string }> },
      { name: 'proconnect-logo', component: ProConnectLogo as React.FC<{ size?: number; color?: string; className?: string }> },
    ],
  },
];

const SIZES = [16, 20, 24, 28, 32] as const;

export function IconShowcase() {
  const [search, setSearch] = useState('');
  const [iconSize, setIconSize] = useState<number>(24);

  const totalIcons = categories.reduce((sum, cat) => sum + cat.icons.length, 0);

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      icons: cat.icons.filter((icon) =>
        icon.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.icons.length > 0);

  const matchCount = filteredCategories.reduce((sum, cat) => sum + cat.icons.length, 0);

  return (
    <div className="icon-showcase">
      <Link to="/" className="icon-showcase__back-link">
        <IconArrowBack size={16} /> Back to app
      </Link>

      <div className="icon-showcase__header">
        <h1 className="icon-showcase__title">CG Foundations — Icon Library</h1>
        <p className="icon-showcase__subtitle">
          Utility icons from the CG Foundations design system, organized by category.
          All icons render as inline SVGs with configurable size and color.
        </p>
        <div className="icon-showcase__meta">
          <span className="icon-showcase__meta-badge">{totalIcons} icons</span>
          <span className="icon-showcase__meta-badge">{categories.length} categories</span>
          <span className="icon-showcase__meta-badge">24x24 grid</span>
          <span className="icon-showcase__meta-badge">1.5px stroke</span>
        </div>
      </div>

      <div className="icon-showcase__controls">
        <input
          type="text"
          className="icon-showcase__search"
          placeholder={`Search ${totalIcons} icons…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="icon-showcase__size-control">
          <label>Size:</label>
          {SIZES.map((s) => (
            <button
              key={s}
              className={`icon-showcase__size-btn ${s === iconSize ? 'icon-showcase__size-btn--active' : ''}`}
              onClick={() => setIconSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {search && (
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
          Showing {matchCount} of {totalIcons} icons
        </p>
      )}

      {filteredCategories.length === 0 ? (
        <div className="icon-showcase__empty">
          No icons match "{search}". Try a different search term.
        </div>
      ) : (
        filteredCategories.map((cat) => (
          <div key={cat.title} className="icon-showcase__category">
            <h2 className="icon-showcase__category-title">
              {cat.title}
              <span className="icon-showcase__category-count">{cat.icons.length}</span>
            </h2>
            <p className="icon-showcase__category-desc">{cat.description}</p>
            <div className="icon-showcase__grid">
              {cat.icons.map((icon) => {
                const Comp = icon.component;
                return (
                  <div
                    key={icon.name}
                    className="icon-showcase__item"
                    title={`Icon${icon.name
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join('')}`}
                  >
                    <div className="icon-showcase__item-icon">
                      <Comp size={iconSize} />
                    </div>
                    <span className="icon-showcase__item-name">{icon.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
