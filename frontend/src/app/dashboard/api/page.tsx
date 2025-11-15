'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
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
    { method: 'POST', path: '/api/v1/incidents', description: 'Create a new incident' },
    { method: 'GET', path: '/api/v1/incidents/:id', description: 'Get incident details' },
    { method: 'POST', path: '/api/v1/metrics', description: 'Send metrics data' },
    { method: 'GET', path: '/api/v1/agents', description: 'List all AI agents' },
  ];

  const toggleKeyVisibility = (idx: number) => {
    setShowKey(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>API Keys</h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your API keys and access tokens</p>
          </div>
          <button
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{
              backgroundColor: 'var(--button-primary-bg)',
              color: 'var(--button-primary-text)',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
            }}
          >
            <Plus className="w-5 h-5" />
            Create New Key
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total API Keys', value: '3', icon: Key },
            { label: 'API Requests Today', value: '24.8K', icon: Activity },
            { label: 'Success Rate', value: '99.8%', icon: CheckCircle },
            { label: 'Active Endpoints', value: '12', icon: Code }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border transition-all hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--accent-primary)' }} />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* API Keys */}
        <div 
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Your API Keys</h2>
          <div className="space-y-4">
            {apiKeys.map((apiKey, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border transition-all hover:scale-[1.01]"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  borderColor: 'var(--border-default)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                      <Key className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {apiKey.name}
                      </h3>
                      <div className="flex items-center gap-3 mb-3">
                        <code 
                          className="px-3 py-2 rounded-lg font-mono text-sm"
                          style={{
                            backgroundColor: 'var(--surface-default)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          {showKey[idx] ? apiKey.key : '••••••••••••••••••••'}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(idx)}
                          className="p-2 rounded-lg transition-all hover:scale-110"
                          style={{ backgroundColor: 'var(--surface-default)' }}
                        >
                          {showKey[idx] ? (
                            <EyeOff className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                          ) : (
                            <Eye className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                          )}
                        </button>
                        <button
                          className="p-2 rounded-lg transition-all hover:scale-110"
                          style={{ backgroundColor: 'var(--surface-default)' }}
                        >
                          <Copy className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                        </button>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Created: {apiKey.created}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          Last used: {apiKey.lastUsed}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {apiKey.requests} requests
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--status-positive-bg)',
                        color: 'var(--status-positive-text)'
                      }}
                    >
                      {apiKey.status}
                    </span>
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ 
                        backgroundColor: 'var(--status-critical-bg)',
                        color: 'var(--status-critical-text)'
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Endpoints */}
        <div 
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Available Endpoints</h2>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 flex items-center gap-2"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                border: `1px solid var(--border-default)`
              }}
            >
              <FileCode className="w-4 h-4" />
              View Documentation
            </button>
          </div>
          <div className="space-y-3">
            {endpoints.map((endpoint, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'var(--surface-subtle)' }}
              >
                <div className="flex items-center gap-4">
                  <span 
                    className="px-3 py-1 rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: endpoint.method === 'POST' 
                        ? 'var(--status-info-bg)' 
                        : 'var(--status-positive-bg)',
                      color: endpoint.method === 'POST' 
                        ? 'var(--status-info-text)' 
                        : 'var(--status-positive-text)'
                    }}
                  >
                    {endpoint.method}
                  </span>
                  <code 
                    className="font-mono text-sm font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {endpoint.path}
                  </code>
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {endpoint.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
