'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SidebarLayout from '@/components/SidebarLayout';
import { 
  Puzzle, 
  Check, 
  X, 
  Settings, 
  Plus, 
  AlertCircle,
  Database,
  MessageSquare,
  Search,
  Code,
  Bug,
  Users,
  Brain,
  BarChart
} from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: 'AI/LLM' | 'Databases' | 'Monitoring' | 'Communication' | 'Development' | 'Search';
  icon: React.ComponentType<{ className?: string }>;
  status: 'connected' | 'disconnected' | 'error';
  features: string[];
  configRequired: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

const plugins: Plugin[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'GPT-4 and other OpenAI models for advanced analysis and natural language processing',
    category: 'AI/LLM',
    icon: Brain,
    status: 'disconnected',
    features: ['GPT-4 Analysis', 'Code Review', 'Natural Language Queries', 'Summarization'],
    configRequired: ['API Key', 'Model Selection'],
    isPopular: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Claude AI for sophisticated reasoning and analysis of complex log patterns',
    category: 'AI/LLM',
    icon: Brain,
    status: 'disconnected',
    features: ['Advanced Reasoning', 'Long Context Analysis', 'Safety-focused AI'],
    configRequired: ['API Key', 'Model Version'],
    isNew: true
  },
  {
    id: 'sql',
    name: 'SQL Databases',
    description: 'Connect to PostgreSQL, MySQL, SQL Server for direct database analysis',
    category: 'Databases',
    icon: Database,
    status: 'disconnected',
    features: ['Query Generation', 'Performance Analysis', 'Schema Discovery', 'Data Correlation'],
    configRequired: ['Connection String', 'Credentials', 'Database Type'],
    isPopular: true
  },
  {
    id: 'splunk',
    name: 'Splunk',
    description: 'Enterprise log management and analysis platform integration',
    category: 'Search',
    icon: Search,
    status: 'connected',
    features: ['Log Search', 'Dashboards', 'Alerts', 'Machine Learning'],
    configRequired: ['Server URL', 'Authentication Token', 'Index Names']
  },
  {
    id: 'opensearch',
    name: 'OpenSearch',
    description: 'Open-source search and analytics engine for log aggregation',
    category: 'Search',
    icon: Search,
    status: 'disconnected',
    features: ['Full-text Search', 'Real-time Analytics', 'Visualization', 'Alerting'],
    configRequired: ['Cluster URL', 'Credentials', 'Index Patterns']
  },
  {
    id: 'sentry',
    name: 'Sentry',
    description: 'Error tracking and performance monitoring for applications',
    category: 'Monitoring',
    icon: Bug,
    status: 'connected',
    features: ['Error Tracking', 'Performance Monitoring', 'Release Health', 'Issue Grouping'],
    configRequired: ['Organization', 'Auth Token', 'Project List'],
    isPopular: true
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Issue tracking and project management integration for incident correlation',
    category: 'Development',
    icon: Code,
    status: 'disconnected',
    features: ['Issue Creation', 'Status Tracking', 'Incident Correlation', 'Reporting'],
    configRequired: ['Server URL', 'API Token', 'Project Keys']
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication platform for notifications and collaborative analysis',
    category: 'Communication',
    icon: MessageSquare,
    status: 'disconnected',
    features: ['Notifications', 'Bot Commands', 'Channel Integration', 'Interactive Messages'],
    configRequired: ['Bot Token', 'Channel IDs', 'Webhook URLs'],
    isPopular: true
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Enterprise communication platform for notifications and team collaboration',
    category: 'Communication',
    icon: Users,
    status: 'disconnected',
    features: ['Notifications', 'App Integration', 'Card Messages', 'Workflow Automation'],
    configRequired: ['Webhook URL', 'App Registration', 'Team IDs']
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Monitoring and analytics platform for infrastructure and application metrics',
    category: 'Monitoring',
    icon: BarChart,
    status: 'error',
    features: ['Metrics Collection', 'APM Traces', 'Log Management', 'Dashboards'],
    configRequired: ['API Key', 'Application Key', 'Site URL']
  }
];

const categories = ['All', 'AI/LLM', 'Databases', 'Monitoring', 'Communication', 'Development', 'Search'];

export default function Plugins() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);

  const filteredPlugins = selectedCategory === 'All' 
    ? plugins 
    : plugins.filter(plugin => plugin.category === selectedCategory);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Check className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <X className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Plugins & Integrations</h1>
            <p className="text-sm text-gray-600">Connect external tools to enhance Traceon AI's capabilities</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {plugins.filter(p => p.status === 'connected').length} of {plugins.length} connected
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Custom Plugin</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Plugin Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin) => (
              <div
                key={plugin.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPlugin(plugin)}
              >
                <div className="p-6">
                  {/* Plugin Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <plugin.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{plugin.name}</h3>
                          {plugin.isNew && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                          )}
                          {plugin.isPopular && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Popular</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{plugin.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(plugin.status)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(plugin.status)}`}>
                        {plugin.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plugin.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {plugin.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {plugin.features.length > 3 && (
                        <span className="text-gray-500 text-xs">+{plugin.features.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlugin(plugin);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {plugin.status === 'connected' ? 'Configure' : 'Connect'}
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plugin Configuration Modal */}
      {selectedPlugin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <selectedPlugin.icon className="w-8 h-8 text-gray-700" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedPlugin.name}</h2>
                    <p className="text-sm text-gray-500">{selectedPlugin.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlugin(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">{selectedPlugin.description}</p>

              {/* Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connection Status</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedPlugin.status)}
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedPlugin.status)}`}>
                    {selectedPlugin.status.charAt(0).toUpperCase() + selectedPlugin.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedPlugin.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Configuration Required</h3>
                <div className="space-y-3">
                  {selectedPlugin.configRequired.map((config, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {config}
                      </label>
                      <input
                        type={config.toLowerCase().includes('password') || config.toLowerCase().includes('token') || config.toLowerCase().includes('key') ? 'password' : 'text'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${config.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setSelectedPlugin(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Test Connection
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {selectedPlugin.status === 'connected' ? 'Update' : 'Connect'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}
