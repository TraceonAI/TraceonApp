'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Brain, 
  MessageSquare, 
  User, 
  Settings, 
  Puzzle, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Activity,
  BarChart3,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const navigation: NavItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home, 
    description: 'Main analysis dashboard' 
  },
  { 
    name: 'Chat Analysis', 
    href: '/chat', 
    icon: MessageSquare, 
    description: 'Interactive AI assistant' 
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3, 
    description: 'Analysis history and trends' 
  },
  { 
    name: 'Plugins', 
    href: '/plugins', 
    icon: Puzzle, 
    description: 'Connect external tools' 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings, 
    description: 'Application settings' 
  },
  { 
    name: 'Profile', 
    href: '/profile', 
    icon: User, 
    description: 'User profile and preferences' 
  },
];

export default function SidebarLayout({ children }: SidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700`}>
        
        {/* Logo and Brand */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Traceon AI</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Intelligence Platform</p>
              </div>
            </div>
          )}
          
          {sidebarCollapsed && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mx-auto">
              <Brain className="w-6 h-6 text-white" />
            </div>
          )}
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                  title={sidebarCollapsed ? item.description : ''}
                >
                  <item.icon
                    className={`
                      ${sidebarCollapsed ? 'mx-auto' : 'mr-3'} 
                      flex-shrink-0 h-5 w-5
                      ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}
                    `}
                  />
                  {!sidebarCollapsed && (
                    <div>
                      <span className="truncate">{item.name}</span>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile and Controls */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center px-3 py-2 text-sm font-medium rounded-md 
              text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? (theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode') : ''}
          >
            {theme === 'light' ? (
              <Moon className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            ) : (
              <Sun className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            )}
            {!sidebarCollapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
          </button>
          
          {/* User Info */}
          {!sidebarCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center px-3 py-2 text-sm font-medium rounded-md 
              text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-400 transition-colors
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? 'Logout' : ''}
          >
            <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
          
          {/* Status Indicator */}
          {!sidebarCollapsed ? (
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <Activity className="w-4 h-4 text-green-500" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">System Status</p>
                <p className="text-xs text-green-600 dark:text-green-400">Operational</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <Activity className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </div>
  );
}
