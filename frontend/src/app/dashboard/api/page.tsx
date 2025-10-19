'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Key,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Activity,
  CheckCircle,
  Code,
  FileCode
} from 'lucide-react';

export default function APIPage() {
  const [showKey, setShowKey] = useState<{ [key: number]: boolean }>({});

  const apiKeys = [
    {
      name: 'Production API Key',
      key: 'tk_live_4s2k9xm1p7q3n8v6h5j2',
      created: 'Jan 15, 2024',
      lastUsed: '2 mins ago',
      requests: '1.2M',
      status: 'Active'
    },
    {
      name: 'Staging Environment',
      key: 'tk_test_8x3m5p2n9q1v7h4k6j8',
      created: 'Feb 3, 2024',
      lastUsed: '15 mins ago',
      requests: '342K',
      status: 'Active'
    },
    {
      name: 'Development Key',
      key: 'tk_dev_2n7q4m8p1v5x3h9k6j2',
      created: 'Mar 12, 2024',
      lastUsed: '1 hour ago',
      requests: '89K',
      status: 'Active'
    },
  ];

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/incidents',
      description: 'Create a new incident',
      color: 'bg-green-500'
    },
    {
      method: 'GET',
      path: '/api/v1/incidents',
      description: 'List all incidents',
      color: 'bg-blue-500'
    },
    {
      method: 'GET',
      path: '/api/v1/incidents/:id',
      description: 'Get incident details',
      color: 'bg-blue-500'
    },
    {
      method: 'PATCH',
      path: '/api/v1/incidents/:id',
      description: 'Update an incident',
      color: 'bg-yellow-500'
    },
    {
      method: 'POST',
      path: '/api/v1/integrations',
      description: 'Add a new integration',
      color: 'bg-green-500'
    },
    {
      method: 'GET',
      path: '/api/v1/analytics',
      description: 'Retrieve analytics data',
      color: 'bg-blue-500'
    },
  ];

  const codeExample = `import traceon from '@traceon/sdk';

const client = traceon.init({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// Create an incident
const incident = await client.incidents.create({
  title: 'Database latency spike',
  severity: 'critical',
  source: 'postgresql',
  metadata: {
    query_time: '1200ms',
    affected_tables: ['users', 'orders']
  }
});

// Get incident status
const status = await client.incidents.get(incident.id);
console.log(status);`;

  const toggleKeyVisibility = (index: number) => {
    setShowKey(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const maskKey = (key: string) => {
    return `${key.substring(0, 15)}${'•'.repeat(15)}`;
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
              <p className="text-gray-600 mt-1">Manage your API keys and integration credentials</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create API Key
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Keys</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">API Requests Today</p>
                  <p className="text-2xl font-bold text-gray-900">1.6M</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">99.8%</p>
                </div>
              </div>
            </div>
          </div>

          {/* API Keys List */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your API Keys</h2>
            <div className="space-y-3">
              {apiKeys.map((apiKey, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Key className="w-4 h-4 text-purple-500" />
                      <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {apiKey.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <code className="px-3 py-1 bg-gray-100 rounded font-mono text-sm text-gray-700">
                        {showKey[idx] ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <button 
                        onClick={() => toggleKeyVisibility(idx)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {showKey[idx] ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Created: {apiKey.created}</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                      <span>Requests: {apiKey.requests}</span>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-red-50 rounded-lg transition-colors group">
                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* API Endpoints */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <FileCode className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">API Endpoints</h2>
            </div>
            <div className="space-y-2">
              {endpoints.map((endpoint, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`${endpoint.color} text-white px-3 py-1 rounded text-xs font-bold`}>
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm text-gray-900">{endpoint.path}</code>
                  </div>
                  <span className="text-sm text-gray-600">{endpoint.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-bold text-gray-900">Quick Start Example</h2>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>

          {/* API Documentation Link */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Need More Information?</h3>
            <p className="text-purple-100 mb-6">Check out our comprehensive API documentation</p>
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-shadow">
              View Full Documentation
            </button>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
