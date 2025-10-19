'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  Brain,
  Activity,
  AlertTriangle,
  Target,
  Server,
  Settings,
  LogOut,
  Menu,
  X,
  Hexagon,
  Bell,
  User,
  BarChart3,
  Shield,
  Database
} from 'lucide-react';

const dashboardRoutes = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: BarChart3,
    description: 'System overview and metrics'
  },
  {
    name: 'Monitoring',
    href: '/monitoring',
    icon: Activity,
    description: 'Real-time system monitoring'
  },
  {
    name: 'Incidents',
    href: '/incidents',
    icon: AlertTriangle,
    description: 'Incident management'
  },
  {
    name: 'SLOs',
    href: '/slos',
    icon: Target,
    description: 'Service level objectives'
  },
  {
    name: 'Infrastructure',
    href: '/infrastructure',
    icon: Server,
    description: 'Infrastructure management'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Account and system settings'
  }
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full glass-effect border-r" style={{ borderColor: 'var(--border-primary)' }}>
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="relative">
                <Hexagon className="w-8 h-8 neon-text" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-4 h-4" style={{ color: 'var(--bg-primary)' }} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold neon-text">TraceonAI</span>
                <span className="text-xs font-mono" style={{ color: 'var(--neon-blue)' }}>Dashboard</span>
              </div>
            </Link>
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 space-y-2">
            {dashboardRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'neon-border glass-effect text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <route.icon className="w-5 h-5 mr-3" />
                  <div className="flex flex-col">
                    <span>{route.name}</span>
                    <span className="text-xs text-gray-400">{route.description}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full glass-effect flex items-center justify-center">
                  <User className="w-4 h-4" style={{ color: 'var(--neon-purple)' }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {user?.email || 'user@example.com'}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="glass-effect border-b sticky top-0 z-30" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-800"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {dashboardRoutes.find(route => route.href === pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full glass-effect flex items-center justify-center">
                <User className="w-4 h-4" style={{ color: 'var(--neon-purple)' }} />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
