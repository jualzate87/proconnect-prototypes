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

/* ── Icons ── */
export {
  // Navigation
  IconHome,
  IconTaxReturn,
  IconClients,
  IconDashboard,
  IconLink,
  IconReporting,
  // Actions
  IconClose,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconSearch,
  IconSettings,
  IconNotification,
  IconHelp,
  IconUser,
  IconPlus,
  IconMinus,
  IconCheck,
  IconCopy,
  IconEdit,
  IconTrash,
  IconFilter,
  IconSort,
  IconDownload,
  IconExternalLink,
  IconMenu,
  IconMoreVertical,
  // Status
  IconInfo,
  IconWarning,
  IconSuccess,
  IconError,
  // AI
  IconSparkle,
  IconSend,
  IconThumbsUp,
  IconThumbsDown,
  IconRefresh,
  // Layout
  IconCollapse,
  IconExpand,
  IconArrowBack,
  IconPin,
} from './icons/Icons';
