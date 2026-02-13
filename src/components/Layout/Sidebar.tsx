import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMenuCollapse, IconMenuExpand, ProConnectLogo } from '../ProConnectLibrary';
import './Sidebar.css';

interface NavItem {
  path?: string;
  label: string;
  icon?: React.ReactNode;
  hasIndicator?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [
      { path: '/', label: 'Welcome' },
    ],
  },
  {
    title: 'TAX',
    items: [
      { path: '/', label: 'Tax returns' },
      { path: '#', label: 'Clients' },
      { path: '#', label: 'E-file Dashboard' },
      { path: '#', label: 'Intuit Link' },
      { path: '#', label: 'Reporting' },
    ],
  },
  {
    title: 'WORKFLOW SOLUTIONS',
    items: [
      { path: '#', label: 'Tax Advisor' },
      { path: '#', label: 'QB Accountant' },
      { path: '#', label: 'All solutions' },
      { path: '#', label: 'Purchase' },
      { path: '#', label: 'Staff finder' },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <button 
        className="sidebar-logo" 
        onClick={() => navigate('/')}
        aria-label="Go to Tax Hub"
      >
        <ProConnectLogo width={140} />
      </button>

      <nav className="sidebar-nav">
        {navSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="sidebar-section">
            {section.title && (
              <div className="sidebar-section-title">{section.title}</div>
            )}
            {section.items.map((item, itemIndex) => {
              const isActive = item.path === location.pathname;
              return (
                <Link
                  key={`${sectionIndex}-${itemIndex}`}
                  to={item.path || '#'}
                  className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''}`}
                >
                  <span className="sidebar-item-label">{item.label}</span>
                  {item.hasIndicator && <span className="sidebar-item-indicator"></span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <button 
        className="sidebar-collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Collapse sidebar"
      >
        {isCollapsed ? <IconMenuExpand size={16} /> : <IconMenuCollapse size={16} />}
        {!isCollapsed && <span>Collapse sidebar</span>}
      </button>
    </aside>
  );
};
