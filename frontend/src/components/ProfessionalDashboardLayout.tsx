'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import PageTransition from '@/components/PageTransition';
import RouteProgressBar from '@/components/RouteProgressBar';
import {
  LayoutDashboard,
  AlertTriangle,
  ScrollText,
  Activity,
  Database,
  Bot,
  BookOpen,
  Bell,
  Network,
  Plug,
  FileBarChart,
  Settings,
  Search,
  Command,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  User,
  HelpCircle,
  Globe,
  Zap,
  CheckCircle,
  LogOut,
  UserCircle
} from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { id: 'incidents', icon: AlertTriangle, label: 'Incidents', href: '/dashboard/incidents', badge: 3 },
  { id: 'logs', icon: ScrollText, label: 'Logs', href: '/dashboard/logs' },
  { id: 'metrics', icon: Activity, label: 'Metrics', href: '/dashboard/metrics' },
  { id: 'queryStudio', icon: Database, label: 'Query Studio', href: '/dashboard/query-studio' },
  { id: 'agentConsole', icon: Bot, label: 'Agent Console', href: '/dashboard/agent-console' },
  { id: 'runbooks', icon: BookOpen, label: 'Runbooks', href: '/dashboard/runbooks' },
  { id: 'alerts', icon: Bell, label: 'Alerts & Notifs', href: '/dashboard/notifications' },
  { id: 'topology', icon: Network, label: 'Service Map', href: '/dashboard/topology' },
  { id: 'integrations', icon: Plug, label: 'Integrations', href: '/dashboard/integrations' },
  { id: 'reports', icon: FileBarChart, label: 'Reports', href: '/dashboard/reports' },
  { id: 'settings', icon: Settings, label: 'Settings', href: '/dashboard/settings' }
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function ProfessionalDashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <RouteProgressBar />
      <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--surface-default)' }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col border-r overflow-x-hidden"
        style={{
          width: sidebarCollapsed ? '72px' : '280px',
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--sidebar-border)',
          transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'width'
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div 
            className="overflow-hidden"
            style={{
              width: sidebarCollapsed ? '40px' : '100%',
              transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl relative overflow-hidden transition-all duration-200 group-hover:scale-110 flex-shrink-0"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--text-inverse)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                }}
              >
                <span className="relative z-10">T</span>
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    animation: 'shimmer 3s infinite'
                  }}
                />
              </div>
              <div 
                style={{
                  opacity: sidebarCollapsed ? 0 : 1,
                  transform: sidebarCollapsed ? 'translateX(-10px)' : 'translateX(0)',
                  transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span className="font-bold text-xl tracking-tight transition-all group-hover:text-opacity-80" style={{ color: 'var(--text-primary)' }}>
                  Traceon
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                    ENTERPRISE
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation */}
                {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const [isHovered, setIsHovered] = useState(false);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative flex items-center gap-3 px-3 py-3 rounded-xl group"
                style={{
                  backgroundColor: active ? 'var(--nav-item-active-bg)' : 'transparent',
                  color: active ? 'var(--nav-item-active-text)' : 'var(--nav-item-text)',
                  transform: active || isHovered ? 'translateX(6px)' : 'translateX(0)',
                  boxShadow: active 
                    ? '0 4px 16px rgba(124, 58, 237, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)' 
                    : isHovered 
                    ? '0 2px 8px rgba(0,0,0,0.1)'
                    : 'none',
                  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  setIsHovered(true);
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'var(--nav-item-hover-bg)';
                  }
                }}
                onMouseLeave={(e) => {
                  setIsHovered(false);
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {/* Active Indicator - Enhanced */}
                {active && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-r-full"
                    style={{ 
                      backgroundColor: 'var(--accent-primary)',
                      boxShadow: '2px 0 12px rgba(124, 58, 237, 0.6)'
                    }}
                  />
                )}
                
                {/* Hover Indicator */}
                {!active && isHovered && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-200"
                    style={{ 
                      backgroundColor: 'var(--text-muted)',
                      opacity: 0.5
                    }}
                  />
                )}
                
                {/* Icon Container - Enhanced */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                  style={{
                    backgroundColor: active ? 'var(--accent-primary)' : isHovered ? 'var(--surface-default)' : 'var(--surface-subtle)',
                    color: active ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    transform: active || isHovered ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: active ? '0 0 20px rgba(124, 58, 237, 0.4)' : 'none',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  {active && (
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}
                    />
                  )}
                </div>
                
                {!sidebarCollapsed && (
                  <>
                    <span 
                      className="flex-1 font-semibold text-sm" 
                      style={{
                        transform: active || isHovered ? 'translateX(2px)' : 'translateX(0)',
                        opacity: sidebarCollapsed ? 0 : 1,
                        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                      }}
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <span 
                        className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center justify-center min-w-[26px] relative"
                        style={{
                          backgroundColor: 'var(--status-critical)',
                          color: 'var(--text-inverse)',
                          boxShadow: '0 0 16px rgba(239, 68, 68, 0.7), inset 0 1px 0 rgba(255,255,255,0.2)',
                          border: '2px solid var(--sidebar-bg)',
                          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                          opacity: sidebarCollapsed ? 0 : 1,
                          transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {item.badge}
                        <span 
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            backgroundColor: 'var(--status-critical)',
                            opacity: 0.3
                          }}
                        />
                      </span>
                    )}
                  </>
                )}
                
                {sidebarCollapsed && item.badge && (
                  <div 
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold relative"
                    style={{
                      backgroundColor: 'var(--status-critical)',
                      color: 'var(--text-inverse)',
                      boxShadow: '0 0 16px rgba(239, 68, 68, 0.9), inset 0 1px 0 rgba(255,255,255,0.3)',
                      border: '2.5px solid var(--sidebar-bg)',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                  >
                    {item.badge}
                    <span 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: 'var(--status-critical)',
                        opacity: 0.4
                      }}
                    />
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div 
                    className="absolute left-full ml-3 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium pointer-events-none opacity-0 group-hover:opacity-100 z-50"
                    style={{
                      backgroundColor: 'var(--surface-raised)',
                      color: 'var(--text-primary)',
                      border: `1px solid var(--border-default)`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 150ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 150ms',
                      transform: 'translateX(-4px) scale(0.95)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(0) scale(1)';
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span 
                        className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: 'var(--status-critical)',
                          color: 'var(--text-inverse)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4 space-y-2" style={{ borderColor: 'var(--sidebar-border)' }}>
          <div 
            className="flex items-center justify-between px-3 py-2 rounded-lg overflow-hidden" 
            style={{ 
              backgroundColor: 'var(--surface-subtle)',
              height: sidebarCollapsed ? '0' : 'auto',
              opacity: sidebarCollapsed ? 0 : 1,
              marginBottom: sidebarCollapsed ? '0' : '8px',
              transition: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
              padding: sidebarCollapsed ? '0 12px' : '8px 12px'
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--status-positive)' }} />
              <span 
                className="text-xs font-medium whitespace-nowrap" 
                style={{ 
                  color: 'var(--text-secondary)',
                  opacity: sidebarCollapsed ? 0 : 1,
                  transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                All Systems Operational
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg"
            style={{ 
              backgroundColor: 'var(--surface-subtle)', 
              color: 'var(--text-secondary)',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--sidebar-item-hover)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span 
                  className="text-sm font-medium" 
                  style={{
                    opacity: sidebarCollapsed ? 0 : 1,
                    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Collapse
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header 
          className="flex items-center justify-between h-16 px-6 border-b"
          style={{
            backgroundColor: 'var(--header-bg)',
            borderColor: 'var(--header-border)'
          }}
        >
          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search or press ⌘/ to open command palette..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--input-text)'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--input-border-focus)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--input-border)'}
              />
              <kbd 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-mono rounded"
                style={{ 
                  backgroundColor: 'var(--surface-subtle)',
                  color: 'var(--text-muted)',
                  border: `1px solid var(--border-default)`
                }}
              >
                ⌘/
              </kbd>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 ml-6">
            {/* Environment Selector */}
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-secondary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--card-hover)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">Production</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 relative overflow-hidden group"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--text-inverse)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Command Palette */}
            <button
              className="p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--text-inverse)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
              title="Command palette (⇧⌘P)"
            >
              <Command className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button
              className="p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 relative"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--text-inverse)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <Bell className="w-5 h-5" />
              <span 
                className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 animate-pulse"
                style={{ 
                  backgroundColor: 'var(--status-critical)',
                  borderColor: 'var(--sidebar-bg)',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)'
                }}
              />
            </button>

            {/* Help */}
            <button
              className="p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--text-inverse)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: profileDropdownOpen ? 'var(--card-hover)' : 'var(--surface-subtle)',
                  color: 'var(--text-primary)',
                  boxShadow: profileDropdownOpen ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (!profileDropdownOpen) {
                    e.currentTarget.style.backgroundColor = 'var(--card-hover)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!profileDropdownOpen) {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-offset-2 transition-all"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-inverse)'
                  }}
                >
                  {getUserInitials()}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">{user?.name || user?.username || 'User'}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Administrator</div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg overflow-hidden z-50"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-default)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* User Info */}
                  <div className="p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--text-inverse)'
                        }}
                      >
                        {getUserInitials()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                          {user?.name || user?.username}
                        </div>
                        <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <UserCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">View Profile</span>
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t py-2" style={{ borderColor: 'var(--border-subtle)' }}>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                      style={{ color: 'var(--status-critical)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--status-critical-bg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main 
          className="flex-1 overflow-auto"
          style={{ backgroundColor: 'var(--surface-default)' }}
        >
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
    </>
  );
}
