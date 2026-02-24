/**
 * ================================================================
 * ProConnect Component Library
 * ================================================================
 *
 * Three-layer architecture:
 *   1. CGDS (Common Global Design System) — foundational tokens & patterns
 *   2. PTG PTO Web Components — ProConnect-specific layout (nav, header, panels)
 *   3. IDS Web AI / Intuit Agent Chat — Intuit Assist AI experience
 *
 * Usage:
 *   import { GlobalNav, ChatPanel, PCButton } from '../ProConnectLibrary';
 *
 * Design Tokens (import in main.tsx / App.tsx):
 *   import './components/ProConnectLibrary/tokens/design-tokens.css';
 *
 * Token naming:
 *   CGDS tokens:       --color-*, --font-*, --radius-*, --space-*, --elevation-*
 *   ProConnect tokens:  --pc-*
 *   Intuit Assist:      --ai-*
 *
 * ================================================================
 */

/* ── Layout Components (PTG PTO Web Components) ── */
export { GlobalNav } from './layout/GlobalNav';
export type { NavItem, NavSection } from './layout/GlobalNav';

export { ProConnectSidebarLogo } from './layout/ProConnectSidebarLogo';
export type { ProConnectSidebarLogoProps } from './layout/ProConnectSidebarLogo';

export { TopBar } from './layout/TopBar';

export { RailPanel } from './layout/RailPanel';
export type { RailItem } from './layout/RailPanel';

export { InReturnNav } from './layout/InReturnNav';
export type { ReturnNavSection } from './layout/InReturnNav';

/* ── UI Components (CGDS-based) ── */
export { PCButton } from './ui/PCButton';
export { PCBadge } from './ui/PCBadge';
export { TextInput } from './ui/TextInput';
export { Select } from './ui/Select';
export type { SelectOption } from './ui/Select';
export { Checkbox } from './ui/Checkbox';
export { RadioGroup } from './ui/Radio';
export type { RadioOption } from './ui/Radio';
export { Tabs } from './ui/Tabs';
export type { Tab } from './ui/Tabs';
export { Toggle } from './ui/Toggle';
export { Dropdown } from './ui/Dropdown';
export type { DropdownItem, DropdownSection } from './ui/Dropdown';
export { Toast, ToastContainer } from './ui/Toast';
export type { ToastData } from './ui/Toast';
export { Avatar } from './ui/Avatar';
export { Tooltip } from './ui/Tooltip';
export { Divider } from './ui/Divider';
export { IconButton } from './ui/IconButton';

/* ── AI / Intuit Assist Components (IDS Web AI) ── */
export { ChatPanel } from './ai/ChatPanel';
export { ChatMessage } from './ai/ChatMessage';
export type { ChatMessageData, ChatContentBlock } from './ai/ChatMessage';
export { ChatInput } from './ai/ChatInput';
export { PromptSuggestions } from './ai/PromptSuggestions';
export type { PromptSuggestion } from './ai/PromptSuggestions';
export { AIInsightCard } from './ai/AIInsightCard';
export { TypingIndicator } from './ai/TypingIndicator';

/* ── Icons (CG Foundations + PTG PTO) ── */
export type { IconProps } from './icons/Icons';

export {
  // ── UI ──
  IconMenu,
  IconMenuExpand,
  IconMenuCollapse,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronDown,
  IconSmChevronLeft,
  IconSmChevronRight,
  IconSmChevronUp,
  IconSmChevronDown,
  IconChevronUpDouble,
  IconDropDown,
  IconDropRight,
  IconDropLeft,
  IconArrowUp,
  IconArrowDown,
  IconArrowRight,
  IconArrowBack,
  IconHome,
  IconHomeFill,
  IconSearch,
  IconSettings,
  IconOverflow,
  IconMoreVertical,
  IconCircleAlert,
  IconCircleAlertFill,
  IconCircleCheck,
  IconCircleCheckFill,
  IconCircleInfoFill,
  IconInfo,
  IconAlert,
  IconAlertFill,
  IconClock,
  IconCalendar,
  IconCalendarClock,
  IconDashboard,
  IconDashboardFill,
  IconCheckmark,
  IconCheckboxOn,
  IconCheckboxOff,
  IconCheckboxFill,
  IconRadioOn,
  IconRadioOff,
  IconQuestion,
  IconHelp,
  IconLoading,
  IconLocation,
  IconNoAccess,
  IconMaximize,
  IconMinimize,
  IconNewWindow,
  IconList,
  IconChecklist,
  IconChart,
  IconMagic,
  IconZoomIn,
  IconZoomOut,
  IconEquals,
  IconCalc,

  // ── Actions ──
  IconClose,
  IconClearFill,
  IconClearField,
  IconAdd,
  IconAddFill,
  IconDownload,
  IconUpload,
  IconShare,
  IconLink,
  IconUnlink,
  IconEdit,
  IconDelete,
  IconCopy,
  IconDuplicate,
  IconFilter,
  IconSort,
  IconSortAscending,
  IconSortDescending,
  IconNotification,
  IconEye,
  IconEyeOff,
  IconUndo,
  IconRedo,
  IconRefresh,
  IconSend,
  IconExport,
  IconAttach,
  IconPin,
  IconPinFill,
  IconTag,
  IconFlag,
  IconStar,
  IconStarFill,
  IconBookmark,
  IconBookmarkFill,
  IconThumbUp,
  IconThumbDown,
  IconNote,
  IconNotePlus,
  IconArchive,
  IconSchedule,
  IconDrag,
  IconGrid,
  IconCollapse,
  IconExpand,
  IconCloud,
  IconReply,
  IconNightmode,
  IconMessage,
  IconPlay,
  IconPause,
  IconTemplate,

  // ── People ──
  IconUser,
  IconMultiUsers,
  IconAddUser,
  IconAccountant,
  IconAvatar,
  IconSpeechBubble,
  IconSwitchClients,

  // ── Document ──
  IconDocument,
  IconDocumentAlt,
  IconFolder,
  IconFolderFill,

  // ── Financial ──
  IconDollarSign,
  IconBank,
  IconCash,
  IconGraph,
  IconCard,

  // ── Business / Taxes ──
  IconTax,
  IconInvoices,
  IconReceipt,
  IconReports,
  IconHeadset,
  IconLegal,

  // ── Security ──
  IconLock,
  IconUnlock,
  IconSecurity,

  // ── Tech ──
  IconEmail,
  IconPrint,
  IconDesktop,
  IconMobile,
  IconHistory,

  // ── Intuit Assist ──
  IconIntuitAssist,
  IconSparkles,
  IconAssistant,

  // ── PTG ProConnect-specific ──
  IconTaxReturn,
  IconClients,
  IconReporting,

  // ── Brand ──
  IconProConnectMark,
  ProConnectLogo,

  // ── Backward-compatible aliases ──
  IconPlus,
  IconCheck,
  IconTrash,
  IconExternalLink,
  IconWarning,
  IconSuccess,
  IconError,
  IconMinus,
  IconSparkle,
  IconThumbsUp,
  IconThumbsDown,
} from './icons/Icons';
