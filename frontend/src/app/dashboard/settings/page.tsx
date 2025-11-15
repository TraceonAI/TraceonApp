'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Key,
  Users,
  Palette,
  Globe,
  Zap,
  Save,
  Moon,
  Sun
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'team'>('profile');

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'team' as const, label: 'Team', icon: Users }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Settings
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Manage your account and preferences
            </p>
          </div>
          <button
            className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            style={{
              backgroundColor: 'var(--button-primary-bg)',
              color: 'var(--button-primary-text)',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(124, 58, 237, 0.4)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.2) rotate(360deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <Save className="w-5 h-5" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
            Save Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b pb-4" style={{ borderColor: 'var(--border-default)' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg flex items-center gap-2"
                style={{
                  backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--surface-subtle)',
                  color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                    e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                  }
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  }
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1)';
                }}
              >
                <Icon className="w-4 h-4" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="john.doe@company.com"
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue="Site Reliability Engineer"
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Palette className="w-5 h-5" />
                Appearance
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Theme
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Choose your preferred theme
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-primary)',
                    border: `1px solid var(--border-default)`,
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.2)';
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--text-inverse)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) (icon as unknown as HTMLElement).style.transform = 'rotate(360deg) scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) (icon as unknown as HTMLElement).style.transform = 'rotate(0deg) scale(1)';
                  }}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-5 h-5" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Incident Alerts', description: 'Get notified when incidents are created' },
                  { label: 'Performance Warnings', description: 'Alerts for performance degradation' },
                  { label: 'Security Alerts', description: 'Critical security notifications' },
                  { label: 'Weekly Reports', description: 'Receive weekly summary emails' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Shield className="w-5 h-5" />
                Change Password
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <button
                  className="px-6 py-3 rounded-xl font-semibold"
                  style={{
                    backgroundColor: 'var(--button-primary-bg)',
                    color: 'var(--button-primary-text)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* API Keys */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Key className="w-5 h-5" />
                  API Keys
                </h2>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-inverse)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Generate New Key
                </button>
              </div>
              <div className="space-y-3">
                {['Production API Key', 'Staging API Key'].map((keyName, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg flex items-center justify-between"
                    style={{ 
                      backgroundColor: 'var(--surface-subtle)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    }}
                  >
                    <div>
                      <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {keyName}
                      </p>
                      <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                        sk_live_••••••••••••••••{Math.random().toString(36).substring(7)}
                      </p>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--surface-default)',
                        color: 'var(--text-secondary)',
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = 'var(--status-critical)';
                        e.currentTarget.style.color = 'var(--text-inverse)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  Team Members
                </h2>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--text-inverse)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Invite Member
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'John Doe', role: 'Admin', email: 'john@company.com', status: 'Active' },
                  { name: 'Jane Smith', role: 'Engineer', email: 'jane@company.com', status: 'Active' },
                  { name: 'Bob Johnson', role: 'Viewer', email: 'bob@company.com', status: 'Pending' }
                ].map((member, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg flex items-center justify-between"
                    style={{ 
                      backgroundColor: 'var(--surface-subtle)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                      const avatar = e.currentTarget.querySelector('.member-avatar');
                      if (avatar) (avatar as HTMLElement).style.transform = 'scale(1.1) rotate(-5deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                      const avatar = e.currentTarget.querySelector('.member-avatar');
                      if (avatar) (avatar as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="member-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--text-inverse)',
                          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {member.name}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: 'var(--surface-default)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {member.role}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: member.status === 'Active' ? 'var(--status-positive-bg)' : 'var(--status-warning-bg)',
                          color: member.status === 'Active' ? 'var(--status-positive-text)' : 'var(--status-warning-text)'
                        }}
                      >
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfessionalDashboardLayout>
  );
}
