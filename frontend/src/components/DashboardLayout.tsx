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
  Bell,
  User,
  BarChart3,
  Network,
  Database,
  MessageCircle,
  Zap,
  Search,
  Code,
  FileText,
  TrendingUp
} from 'lucide-react';

const dashboardRoutes = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: BarChart3,
    description: 'System overview'
  },
  {
    name: 'Incidents',
    href: '/dashboard/incidents',
    icon: AlertTriangle,
    description: 'Incident management'
  },
  {
    name: 'AI Agents',
    href: '/dashboard/agents',
    icon: Brain,
    description: 'AI agent analytics'
  },
  {
    name: 'Integrations',
    href: '/dashboard/integrations',
    icon: Network,
    description: 'Connected tools'
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: TrendingUp,
    description: 'Performance analytics'
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: MessageCircle,
    description: 'Alert settings'
  },
  {
    name: 'API',
    href: '/dashboard/api',
    icon: Code,
    description: 'API keys & docs'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'Configuration'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        bg-white border-r border-gray-200 shadow-xl
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">TraceonAI</span>
                <span className="text-xs text-gray-500 font-medium">AI SRE Platform</span>
              </div>
            </Link>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {dashboardRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-200' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <route.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <div className="flex-1">
                    <div className="font-semibold">{route.name}</div>
                    <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500'}`}>
                      {route.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user?.email || 'user@example.com'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
                
                <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2.5 w-96">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search incidents, metrics, logs..."
                    className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium shadow-lg shadow-purple-200 hover:shadow-xl transition-all">
                  <Zap className="w-4 h-4 mr-2" />
                  New Incident
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
