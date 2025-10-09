'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SidebarLayout from '@/components/SidebarLayout';
import { 
  Settings as SettingsIcon, 
  Database, 
  Shield, 
  Zap, 
  Bell, 
  Monitor,
  Save,
  RotateCcw,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';

interface SystemSettings {
  analysisTimeout: number;
  maxConcurrentAnalyses: number;
  retentionDays: number;
  enableRealTime: boolean;
  enableCaching: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

interface IntegrationSettings {
  maxRetries: number;
  timeoutSeconds: number;
  batchSize: number;
  enableWebhooks: boolean;
  enableSSL: boolean;
}

interface UISettings {
  autoRefresh: boolean;
  refreshInterval: number;
  showAdvancedMetrics: boolean;
  compactMode: boolean;
  showTutorials: boolean;
}

interface SecuritySettings {
  enableTwoFactor: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  enableAuditLog: boolean;
  restrictIpAccess: boolean;
  allowedIpRanges: string;
  enableEncryption: boolean;
  encryptionLevel: 'standard' | 'high' | 'maximum';
}

interface DatabaseSettings {
  connectionPool: number;
  queryTimeout: number;
  enableBackups: boolean;
  backupInterval: number;
  compressionEnabled: boolean;
  indexOptimization: boolean;
  enableCaching: boolean;
  cacheSize: number;
  maintenanceWindow: string;
}

interface NotificationSettings {
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
  enableSlackIntegration: boolean;
  enableWebhooks: boolean;
  emailAddress: string;
  phoneNumber: string;
  slackWebhook: string;
  notifyOnCritical: boolean;
  notifyOnHigh: boolean;
  notifyOnMedium: boolean;
  notifyOnLow: boolean;
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('system');
  const [hasChanges, setHasChanges] = useState(false);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    analysisTimeout: 300,
    maxConcurrentAnalyses: 5,
    retentionDays: 90,
    enableRealTime: true,
    enableCaching: true,
    logLevel: 'info'
  });

  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    maxRetries: 3,
    timeoutSeconds: 30,
    batchSize: 100,
    enableWebhooks: true,
    enableSSL: true
  });

  const [uiSettings, setUISettings] = useState<UISettings>({
    autoRefresh: true,
    refreshInterval: 30,
    showAdvancedMetrics: false,
    compactMode: false,
    showTutorials: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    enableTwoFactor: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    enableAuditLog: true,
    restrictIpAccess: false,
    allowedIpRanges: '',
    enableEncryption: true,
    encryptionLevel: 'high'
  });

  const [databaseSettings, setDatabaseSettings] = useState<DatabaseSettings>({
    connectionPool: 20,
    queryTimeout: 30,
    enableBackups: true,
    backupInterval: 24,
    compressionEnabled: true,
    indexOptimization: true,
    enableCaching: true,
    cacheSize: 512,
    maintenanceWindow: '02:00'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    enableSlackIntegration: false,
    enableWebhooks: false,
    emailAddress: '',
    phoneNumber: '',
    slackWebhook: '',
    notifyOnCritical: true,
    notifyOnHigh: true,
    notifyOnMedium: false,
    notifyOnLow: false,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00'
  });

  const sections = [
    { id: 'system', name: 'System', icon: Monitor, description: 'Core system configuration' },
    { id: 'integrations', name: 'Integrations', icon: Zap, description: 'External service settings' },
    { id: 'security', name: 'Security', icon: Shield, description: 'Security and access controls' },
    { id: 'database', name: 'Database', icon: Database, description: 'Data storage and retention' },
    { id: 'ui', name: 'Interface', icon: SettingsIcon, description: 'User interface preferences' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'System notifications' },
  ];

  const handleSave = () => {
    // Simulate save operation
    setTimeout(() => {
      setHasChanges(false);
      // Show success message
    }, 1000);
  };

  const handleReset = () => {
    // Reset to defaults
    setSystemSettings({
      analysisTimeout: 300,
      maxConcurrentAnalyses: 5,
      retentionDays: 90,
      enableRealTime: true,
      enableCaching: true,
      logLevel: 'info'
    });
    setIntegrationSettings({
      maxRetries: 3,
      timeoutSeconds: 30,
      batchSize: 100,
      enableWebhooks: true,
      enableSSL: true
    });
    setUISettings({
      autoRefresh: true,
      refreshInterval: 30,
      showAdvancedMetrics: false,
      compactMode: false,
      showTutorials: true
    });
    setSecuritySettings({
      enableTwoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      enableAuditLog: true,
      restrictIpAccess: false,
      allowedIpRanges: '',
      enableEncryption: true,
      encryptionLevel: 'high'
    });
    setDatabaseSettings({
      connectionPool: 20,
      queryTimeout: 30,
      enableBackups: true,
      backupInterval: 24,
      compressionEnabled: true,
      indexOptimization: true,
      enableCaching: true,
      cacheSize: 512,
      maintenanceWindow: '02:00'
    });
    setNotificationSettings({
      enableEmailNotifications: true,
      enableSmsNotifications: false,
      enableSlackIntegration: false,
      enableWebhooks: false,
      emailAddress: '',
      phoneNumber: '',
      slackWebhook: '',
      notifyOnCritical: true,
      notifyOnHigh: true,
      notifyOnMedium: false,
      notifyOnLow: false,
      quietHours: false,
      quietStart: '22:00',
      quietEnd: '08:00'
    });
    setHasChanges(false);
  };

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-sm text-gray-600">Configure system behavior and integrations</p>
          </div>
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Unsaved changes</span>
              </div>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r overflow-y-auto scrollbar-thin">
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{section.name}</div>
                    <div className="text-xs text-gray-500">{section.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 scrollbar-thin">
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
            {/* System Settings */}
            {activeSection === 'system' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">System Configuration</h2>
                  
                  <div className="bg-white rounded-lg border p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Analysis Timeout (seconds)
                        </label>
                        <input
                          type="number"
                          value={systemSettings.analysisTimeout}
                          onChange={(e) => {
                            setSystemSettings({ ...systemSettings, analysisTimeout: Number(e.target.value) });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Maximum time for analysis operations</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Concurrent Analyses
                        </label>
                        <input
                          type="number"
                          value={systemSettings.maxConcurrentAnalyses}
                          onChange={(e) => {
                            setSystemSettings({ ...systemSettings, maxConcurrentAnalyses: Number(e.target.value) });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Number of parallel analysis jobs</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Retention (days)
                        </label>
                        <input
                          type="number"
                          value={systemSettings.retentionDays}
                          onChange={(e) => {
                            setSystemSettings({ ...systemSettings, retentionDays: Number(e.target.value) });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">How long to keep analysis data</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Log Level
                        </label>
                        <select
                          value={systemSettings.logLevel}
                          onChange={(e) => {
                            setSystemSettings({ ...systemSettings, logLevel: e.target.value as any });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="error">Error</option>
                          <option value="warn">Warning</option>
                          <option value="info">Info</option>
                          <option value="debug">Debug</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">System logging verbosity</p>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Real-time Processing</label>
                            <p className="text-sm text-gray-500">Enable real-time log analysis</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={systemSettings.enableRealTime}
                            onChange={(e) => {
                              setSystemSettings({ ...systemSettings, enableRealTime: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Caching</label>
                            <p className="text-sm text-gray-500">Cache analysis results for faster retrieval</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={systemSettings.enableCaching}
                            onChange={(e) => {
                              setSystemSettings({ ...systemSettings, enableCaching: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integration Settings */}
            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Integration Settings</h2>
                  
                  <div className="bg-white rounded-lg border p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Retries
                        </label>
                        <input
                          type="number"
                          value={integrationSettings.maxRetries}
                          onChange={(e) => {
                            setIntegrationSettings({ ...integrationSettings, maxRetries: Number(e.target.value) });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Number of retry attempts for failed requests</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeout (seconds)
                        </label>
                        <input
                          type="number"
                          value={integrationSettings.timeoutSeconds}
                          onChange={(e) => {
                            setIntegrationSettings({ ...integrationSettings, timeoutSeconds: Number(e.target.value) });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Request timeout for external services</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Batch Size
                        </label>
                        <input
                          type="number"
                          value={integrationSettings.batchSize}
                          onChange={(e) => {
                            setIntegrationSettings({ ...integrationSettings, batchSize: Number(e.target.value) });
                            setHasChanges(true);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Number of records to process in each batch</p>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Security & Communication</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Webhooks</label>
                            <p className="text-sm text-gray-500">Allow incoming webhook notifications</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={integrationSettings.enableWebhooks}
                            onChange={(e) => {
                              setIntegrationSettings({ ...integrationSettings, enableWebhooks: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Require SSL</label>
                            <p className="text-sm text-gray-500">Enforce SSL/TLS for all external connections</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={integrationSettings.enableSSL}
                            onChange={(e) => {
                              setIntegrationSettings({ ...integrationSettings, enableSSL: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* UI Settings */}
            {activeSection === 'ui' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">User Interface</h2>
                  
                  <div className="bg-white rounded-lg border p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Auto Refresh</label>
                          <p className="text-sm text-gray-500">Automatically refresh data in dashboards</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={uiSettings.autoRefresh}
                          onChange={(e) => {
                            setUISettings({ ...uiSettings, autoRefresh: e.target.checked });
                            setHasChanges(true);
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      {uiSettings.autoRefresh && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Refresh Interval (seconds)
                          </label>
                          <input
                            type="number"
                            value={uiSettings.refreshInterval}
                            onChange={(e) => {
                              setUISettings({ ...uiSettings, refreshInterval: Number(e.target.value) });
                              setHasChanges(true);
                            }}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Show Advanced Metrics</label>
                          <p className="text-sm text-gray-500">Display detailed performance metrics</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={uiSettings.showAdvancedMetrics}
                          onChange={(e) => {
                            setUISettings({ ...uiSettings, showAdvancedMetrics: e.target.checked });
                            setHasChanges(true);
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Compact Mode</label>
                          <p className="text-sm text-gray-500">Use a more condensed interface layout</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={uiSettings.compactMode}
                          onChange={(e) => {
                            setUISettings({ ...uiSettings, compactMode: e.target.checked });
                            setHasChanges(true);
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Show Tutorials</label>
                          <p className="text-sm text-gray-500">Display helpful tips and onboarding guides</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={uiSettings.showTutorials}
                          onChange={(e) => {
                            setUISettings({ ...uiSettings, showTutorials: e.target.checked });
                            setHasChanges(true);
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div className="bg-white rounded-lg border">
                <div className="p-6">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h2>
                    <p className="text-gray-600">Configure security policies and access controls</p>
                  </div>

                  <div className="space-y-8">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                            <p className="text-sm text-gray-500">Add an extra layer of security to user accounts</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={securitySettings.enableTwoFactor}
                            onChange={(e) => {
                              setSecuritySettings({ ...securitySettings, enableTwoFactor: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Timeout (minutes)
                          </label>
                          <input
                            type="number"
                            value={securitySettings.sessionTimeout}
                            onChange={(e) => {
                              setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) });
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Automatic logout after inactivity</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Expiry (days)
                          </label>
                          <input
                            type="number"
                            value={securitySettings.passwordExpiry}
                            onChange={(e) => {
                              setSecuritySettings({ ...securitySettings, passwordExpiry: Number(e.target.value) });
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Force password change interval</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Access Control</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Audit Logging</label>
                            <p className="text-sm text-gray-500">Track all user actions and system changes</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={securitySettings.enableAuditLog}
                            onChange={(e) => {
                              setSecuritySettings({ ...securitySettings, enableAuditLog: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Restrict IP Access</label>
                            <p className="text-sm text-gray-500">Only allow access from specific IP ranges</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={securitySettings.restrictIpAccess}
                            onChange={(e) => {
                              setSecuritySettings({ ...securitySettings, restrictIpAccess: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {securitySettings.restrictIpAccess && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Allowed IP Ranges
                            </label>
                            <textarea
                              value={securitySettings.allowedIpRanges}
                              onChange={(e) => {
                                setSecuritySettings({ ...securitySettings, allowedIpRanges: e.target.value });
                                setHasChanges(true);
                              }}
                              placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                            <p className="text-xs text-gray-500 mt-1">One IP range per line (CIDR notation)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Data Protection</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Data Encryption</label>
                            <p className="text-sm text-gray-500">Encrypt sensitive data at rest and in transit</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={securitySettings.enableEncryption}
                            onChange={(e) => {
                              setSecuritySettings({ ...securitySettings, enableEncryption: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {securitySettings.enableEncryption && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Encryption Level
                            </label>
                            <select
                              value={securitySettings.encryptionLevel}
                              onChange={(e) => {
                                setSecuritySettings({ ...securitySettings, encryptionLevel: e.target.value as any });
                                setHasChanges(true);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="standard">Standard (AES-128)</option>
                              <option value="high">High (AES-256)</option>
                              <option value="maximum">Maximum (AES-256 + RSA)</option>
                            </select>
                            <p className="text-xs text-gray-500 mt-1">Higher levels provide better security but may impact performance</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Database Settings */}
            {activeSection === 'database' && (
              <div className="bg-white rounded-lg border">
                <div className="p-6">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Database Settings</h2>
                    <p className="text-gray-600">Configure database performance and maintenance</p>
                  </div>

                  <div className="space-y-8">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Connection Pool Size
                          </label>
                          <input
                            type="number"
                            value={databaseSettings.connectionPool}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, connectionPool: Number(e.target.value) });
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Maximum number of concurrent database connections</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Query Timeout (seconds)
                          </label>
                          <input
                            type="number"
                            value={databaseSettings.queryTimeout}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, queryTimeout: Number(e.target.value) });
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Maximum time to wait for query execution</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Backup & Recovery</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Automatic Backups</label>
                            <p className="text-sm text-gray-500">Regularly backup database to prevent data loss</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={databaseSettings.enableBackups}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, enableBackups: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {databaseSettings.enableBackups && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Backup Interval (hours)
                            </label>
                            <input
                              type="number"
                              value={databaseSettings.backupInterval}
                              onChange={(e) => {
                                setDatabaseSettings({ ...databaseSettings, backupInterval: Number(e.target.value) });
                                setHasChanges(true);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">How often to create database backups</p>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maintenance Window
                          </label>
                          <input
                            type="time"
                            value={databaseSettings.maintenanceWindow}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, maintenanceWindow: e.target.value });
                              setHasChanges(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">Preferred time for maintenance operations</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Optimization</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Compression</label>
                            <p className="text-sm text-gray-500">Compress data to save storage space</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={databaseSettings.compressionEnabled}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, compressionEnabled: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Index Optimization</label>
                            <p className="text-sm text-gray-500">Automatically optimize database indexes</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={databaseSettings.indexOptimization}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, indexOptimization: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Query Caching</label>
                            <p className="text-sm text-gray-500">Cache frequently used queries for better performance</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={databaseSettings.enableCaching}
                            onChange={(e) => {
                              setDatabaseSettings({ ...databaseSettings, enableCaching: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {databaseSettings.enableCaching && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Cache Size (MB)
                            </label>
                            <input
                              type="number"
                              value={databaseSettings.cacheSize}
                              onChange={(e) => {
                                setDatabaseSettings({ ...databaseSettings, cacheSize: Number(e.target.value) });
                                setHasChanges(true);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Memory allocated for query caching</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="bg-white rounded-lg border">
                <div className="p-6">
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Settings</h2>
                    <p className="text-gray-600">Configure how and when you receive system notifications</p>
                  </div>

                  <div className="space-y-8">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                            <p className="text-sm text-gray-500">Receive alerts via email</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.enableEmailNotifications}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, enableEmailNotifications: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {notificationSettings.enableEmailNotifications && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={notificationSettings.emailAddress}
                              onChange={(e) => {
                                setNotificationSettings({ ...notificationSettings, emailAddress: e.target.value });
                                setHasChanges(true);
                              }}
                              placeholder="your.email@company.com"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                            <p className="text-sm text-gray-500">Receive critical alerts via SMS</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.enableSmsNotifications}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, enableSmsNotifications: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {notificationSettings.enableSmsNotifications && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={notificationSettings.phoneNumber}
                              onChange={(e) => {
                                setNotificationSettings({ ...notificationSettings, phoneNumber: e.target.value });
                                setHasChanges(true);
                              }}
                              placeholder="+1 (555) 123-4567"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Slack Integration</label>
                            <p className="text-sm text-gray-500">Send notifications to Slack channel</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.enableSlackIntegration}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, enableSlackIntegration: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {notificationSettings.enableSlackIntegration && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Slack Webhook URL
                            </label>
                            <input
                              type="url"
                              value={notificationSettings.slackWebhook}
                              onChange={(e) => {
                                setNotificationSettings({ ...notificationSettings, slackWebhook: e.target.value });
                                setHasChanges(true);
                              }}
                              placeholder="https://hooks.slack.com/services/..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Webhook Notifications</label>
                            <p className="text-sm text-gray-500">Send alerts to external webhook endpoints</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.enableWebhooks}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, enableWebhooks: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Severity Levels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Critical Alerts</label>
                            <p className="text-sm text-gray-500">System failures and security breaches</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.notifyOnCritical}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, notifyOnCritical: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">High Priority Alerts</label>
                            <p className="text-sm text-gray-500">Performance degradation and errors</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.notifyOnHigh}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, notifyOnHigh: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Medium Priority Alerts</label>
                            <p className="text-sm text-gray-500">Warnings and configuration changes</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.notifyOnMedium}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, notifyOnMedium: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Low Priority Alerts</label>
                            <p className="text-sm text-gray-500">Informational messages and status updates</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.notifyOnLow}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, notifyOnLow: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Quiet Hours</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Enable Quiet Hours</label>
                            <p className="text-sm text-gray-500">Suppress non-critical notifications during specified times</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings.quietHours}
                            onChange={(e) => {
                              setNotificationSettings({ ...notificationSettings, quietHours: e.target.checked });
                              setHasChanges(true);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>

                        {notificationSettings.quietHours && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                              </label>
                              <input
                                type="time"
                                value={notificationSettings.quietStart}
                                onChange={(e) => {
                                  setNotificationSettings({ ...notificationSettings, quietStart: e.target.value });
                                  setHasChanges(true);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time
                              </label>
                              <input
                                type="time"
                                value={notificationSettings.quietEnd}
                                onChange={(e) => {
                                  setNotificationSettings({ ...notificationSettings, quietEnd: e.target.value });
                                  setHasChanges(true);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other sections placeholder */}
            {!['system', 'integrations', 'ui', 'security', 'database', 'notifications'].includes(activeSection) && (
              <div className="bg-white rounded-lg border p-6">
                <div className="text-center py-12">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {sections.find(s => s.id === activeSection)?.name} Settings
                  </h3>
                  <p className="text-gray-600">
                    This section is coming soon. Configuration options for {activeSection} will be available in a future update.
                  </p>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>
  </ProtectedRoute>
  );
}
