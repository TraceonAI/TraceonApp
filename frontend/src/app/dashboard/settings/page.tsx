'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  User,
  Users,
  Bell,
  Shield,
  Database,
  Zap,
  Globe,
  Mail,
  Smartphone,
  Lock,
  Key,
  Settings as SettingsIcon
} from 'lucide-react';

export default function SettingsPage() {
  const profileSettings = [
    { label: 'Full Name', value: 'John Doe', editable: true },
    { label: 'Email', value: 'john@traceon.ai', editable: true },
    { label: 'Role', value: 'Administrator', editable: false },
    { label: 'Company', value: 'Acme Corp', editable: true },
  ];

  const teamMembers = [
    { name: 'John Doe', email: 'john@traceon.ai', role: 'Administrator', status: 'Active' },
    { name: 'Sarah Chen', email: 'sarah@traceon.ai', role: 'Engineer', status: 'Active' },
    { name: 'Mike Johnson', email: 'mike@traceon.ai', role: 'Engineer', status: 'Active' },
    { name: 'Emily Davis', email: 'emily@traceon.ai', role: 'Viewer', status: 'Invited' },
  ];

  const aiSettings = [
    { 
      name: 'Auto-Resolution', 
      description: 'Allow AI to automatically resolve incidents',
      enabled: true,
      icon: Zap,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Root Cause Analysis', 
      description: 'Enable AI-powered root cause detection',
      enabled: true,
      icon: Database,
      color: 'from-purple-500 to-blue-500'
    },
    { 
      name: 'Pattern Detection', 
      description: 'Detect recurring incident patterns',
      enabled: true,
      icon: SettingsIcon,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Automated Notifications', 
      description: 'Send notifications based on AI analysis',
      enabled: true,
      icon: Bell,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const notificationPreferences = [
    { channel: 'Email', critical: true, high: true, medium: false, low: false },
    { channel: 'Slack', critical: true, high: true, medium: true, low: false },
    { channel: 'PagerDuty', critical: true, high: false, medium: false, low: false },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
          </div>

          {/* Profile Settings */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              {profileSettings.map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{setting.label}</p>
                    <p className="text-base font-medium text-gray-900">{setting.value}</p>
                  </div>
                  {setting.editable && (
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team Management */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
                Invite Member
              </button>
            </div>
            <div className="space-y-2">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {member.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.status}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <SettingsIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Configuration */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">AI Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiSettings.map((setting, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${setting.color} flex items-center justify-center`}>
                      <setting.icon className="w-5 h-5 text-white" />
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={setting.enabled} className="sr-only peer" readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500"></div>
                    </label>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{setting.name}</h3>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Channel</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Critical</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">High</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Medium</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Low</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationPreferences.map((pref, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{pref.channel}</td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" checked={pref.critical} readOnly className="w-4 h-4 text-purple-600 rounded" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" checked={pref.high} readOnly className="w-4 h-4 text-purple-600 rounded" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" checked={pref.medium} readOnly className="w-4 h-4 text-purple-600 rounded" />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input type="checkbox" checked={pref.low} readOnly className="w-4 h-4 text-purple-600 rounded" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium text-sm">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-600">Update your password regularly</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
