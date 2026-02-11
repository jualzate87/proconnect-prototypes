import React, { useState } from 'react';
import './GlobalNav.css';
import { IconCollapse, IconExpand } from '../icons/Icons';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  badge?: string | number;
  indicator?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

interface GlobalNavProps {
  sections: NavSection[];
  activeItemId?: string;
  onItemClick?: (item: NavItem) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const GlobalNav: React.FC<GlobalNavProps> = ({
  sections,
  activeItemId,
  onItemClick,
  collapsed = false,
  onCollapsedChange,
  logo,
  footer,
  className = '',
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isActive = item.id === activeItemId;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedGroups.has(item.id);

    return (
      <div key={item.id} className="pc-nav-item-wrapper">
        <button
          className={`pc-nav-item ${isActive ? 'pc-nav-item--active' : ''} ${depth > 0 ? 'pc-nav-item--nested' : ''}`}
          style={{ paddingLeft: collapsed ? undefined : `${16 + depth * 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleGroup(item.id);
            } else {
              onItemClick?.(item);
            }
          }}
          title={collapsed ? item.label : undefined}
        >
          {item.icon && <span className="pc-nav-item__icon">{item.icon}</span>}
          {!collapsed && (
            <>
              <span className="pc-nav-item__label">{item.label}</span>
              {item.badge !== undefined && (
                <span className="pc-nav-item__badge">{item.badge}</span>
              )}
              {item.indicator && <span className="pc-nav-item__indicator" />}
              {hasChildren && (
                <span className={`pc-nav-item__chevron ${isExpanded ? 'pc-nav-item__chevron--open' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 4.5L6 6.5L8 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && !collapsed && (
          <div className="pc-nav-item__children">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`pc-global-nav ${collapsed ? 'pc-global-nav--collapsed' : ''} ${className}`}>
      {logo && (
        <div className="pc-global-nav__logo">
          {logo}
        </div>
      )}

      <nav className="pc-global-nav__body">
        {sections.map((section, idx) => (
          <div key={idx} className="pc-global-nav__section">
            {section.title && !collapsed && (
              <div className="pc-global-nav__section-title">{section.title}</div>
            )}
            {section.items.map((item) => renderNavItem(item))}
          </div>
        ))}
      </nav>

      {footer && <div className="pc-global-nav__footer">{footer}</div>}

      {onCollapsedChange && (
        <button
          className="pc-global-nav__collapse-btn"
          onClick={() => onCollapsedChange(!collapsed)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <IconExpand size={16} /> : <IconCollapse size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      )}
    </aside>
  );
};
