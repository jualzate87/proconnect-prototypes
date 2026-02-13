import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMenuCollapse, IconMenuExpand } from '../ProConnectLibrary';
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
        <div className="sidebar-logo-badge">
          <svg width="22" height="22" viewBox="0 0 90 90" fill="none">
            <path d="M45 0C69.8528 0 90 20.1472 90 45C90 69.8528 69.8528 90 45 90C20.1472 90 0 69.8528 0 45C0 20.1472 20.1472 0 45 0ZM67.4912 29.2842C66.1841 28.7426 64.6786 29.0425 63.6777 30.043L27.0107 66.71L29.4854 69.1846C30.8525 70.5518 33.0684 70.5518 34.4355 69.1846L62.6523 40.9688V61.9912C62.6523 63.9242 64.2194 65.4915 66.1523 65.4912H66.1562L69.6523 65.4922V32.5176C69.652 31.1017 68.7995 29.8265 67.4912 29.2842ZM24.5078 24C24.5074 25.933 26.0748 27.4998 28.0078 27.5H49.0312L20.8145 55.7178C19.4474 57.0852 19.4473 59.3008 20.8145 60.668L23.2891 63.1426L59.9561 26.4756C60.957 25.4744 61.2568 23.9683 60.7148 22.6611C60.1724 21.3527 58.8974 20.5002 57.4814 20.5H24.5078V24Z" fill="white" />
          </svg>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-intuit">INTUIT</span>
            <span className="sidebar-logo-proconnect">proconnect</span>
          </div>
        </div>
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
