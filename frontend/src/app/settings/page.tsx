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
    setHasChanges(true);
  };

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
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
        <div className="w-64 bg-white border-r overflow-y-auto">
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
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl">
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

            {/* Other sections placeholder */}
            {!['system', 'integrations', 'ui'].includes(activeSection) && (
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
      </SidebarLayout>
    </ProtectedRoute>
  );
}
