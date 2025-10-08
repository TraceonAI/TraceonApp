'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SidebarLayout from '@/components/SidebarLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Palette, 
  Globe,
  Edit3,
  Save,
  X,
  Camera,
  Key,
  Clock,
  Activity
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  department: string;
  joinDate: string;
  avatar: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  email: boolean;
  slack: boolean;
  teams: boolean;
  critical: boolean;
  analysis: boolean;
  updates: boolean;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user-001',
    name: 'Test User',
    email: 'test@traceon.ai',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'Senior Analyst',
    department: 'Intelligence Operations',
    joinDate: '2023-01-15',
    avatar: '',
    timezone: 'Pacific Standard Time',
    language: 'English (US)'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    slack: false,
    teams: true,
    critical: true,
    analysis: true,
    updates: false
  });

  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Palette },
  ];

  const activityLog = [
    { action: 'Login successful', target: 'Web Application', time: '2 hours ago', type: 'success' },
    { action: 'Analysis completed', target: 'LOG-2024-007', time: '5 hours ago', type: 'success' },
    { action: 'Password changed', target: 'Account Security', time: '2 days ago', type: 'info' },
    { action: 'Settings updated', target: 'Notification preferences', time: '3 days ago', type: 'info' },
    { action: 'Analysis failed', target: 'LOG-2024-005', time: '1 week ago', type: 'error' },
  ];

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
              </div>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <tab.icon className={`mr-2 h-5 w-5 ${
                        activeTab === tab.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                      }`} />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={tempProfile.name}
                              onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white">{profile.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={tempProfile.email}
                              onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white">{profile.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={tempProfile.phone}
                              onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white">{profile.phone}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={tempProfile.location}
                              onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
                              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <p className="text-gray-900 dark:text-white">{profile.location}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Work Information */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Work Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                          <p className="text-gray-900 dark:text-white">{profile.role}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                          <p className="text-gray-900 dark:text-white">{profile.department}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Date</label>
                          <p className="text-gray-900 dark:text-white">{new Date(profile.joinDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Employee ID</label>
                          <p className="text-gray-900 dark:text-white">{profile.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Picture and Activity */}
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Picture</h3>
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                          <User className="w-12 h-12 text-white" />
                        </div>
                        <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2">
                          <Camera className="w-4 h-4" />
                          <span>Change Photo</span>
                        </button>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {activityLog.slice(0, 4).map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'success' ? 'bg-green-500' :
                              activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-gray-900 dark:text-white">{activity.action}</p>
                              <p className="text-gray-500 dark:text-gray-400 text-xs">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{key} Notifications</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications via {key}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({...notifications, [key]: !value})}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            value ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Password & Security</h3>
                    <div className="space-y-4">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Key className="w-4 h-4" />
                        <span>Change Password</span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Add an extra layer of security to your account</p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Application Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                      <select className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>{profile.timezone}</option>
                        <option>Eastern Standard Time</option>
                        <option>Central Standard Time</option>
                        <option>Mountain Standard Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                      <select className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>{profile.language}</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}
