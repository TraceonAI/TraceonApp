'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  Plug,
  CheckCircle,
  AlertTriangle,
  Plus,
  Settings,
  Zap,
  Database,
  MessageSquare,
  Mail,
  Cloud,
  Activity,
  TrendingUp,
  X,
  Eye,
  EyeOff,
  Copy,
  Check
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  logo: string;
  dataFlowRate: string;
  lastSync: string;
  eventsToday: number;
  apiKey?: string;
  customName?: string;
}

export default function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ apiKey: '', customName: '' });

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Slack',
      category: 'Communication',
      description: 'Send notifications and alerts to Slack channels',
      status: 'connected',
      logo: '/images/Slack.png',
      dataFlowRate: '2.4K/day',
      lastSync: '2 minutes ago',
      eventsToday: 127,
      apiKey: 'xoxb-1234567890-abcdefghijklmnop'
    },
    {
      id: '2',
      name: 'Datadog',
      category: 'Monitoring',
      description: 'Stream metrics and logs to Datadog',
      status: 'connected',
      logo: '/images/Datadog.png',
      dataFlowRate: '45K/hour',
      lastSync: '1 minute ago',
      eventsToday: 1240,
      apiKey: 'dd-api-key-1234567890abcdef'
    },
    {
      id: '3',
      name: 'PostgreSQL',
      category: 'Database',
      description: 'Monitor database performance and queries',
      status: 'connected',
      logo: '/images/PostgreSQL.png',
      dataFlowRate: '12K/hour',
      lastSync: '5 minutes ago',
      eventsToday: 456,
      apiKey: 'postgresql://user:pass@localhost:5432/db'
    },
    {
      id: '4',
      name: 'MySQL',
      category: 'Database',
      description: 'Track MySQL database metrics',
      status: 'error',
      logo: '/images/MySQL.png',
      dataFlowRate: '8K/hour',
      lastSync: '2 hours ago',
      eventsToday: 234,
      apiKey: 'mysql://user:pass@localhost:3306/db'
    },
    {
      id: '5',
      name: 'MongoDB',
      category: 'Database',
      description: 'Monitor MongoDB collections and performance',
      status: 'connected',
      logo: '/images/MongoDB.png',
      dataFlowRate: '15K/hour',
      lastSync: '3 minutes ago',
      eventsToday: 678,
      apiKey: 'mongodb://user:pass@localhost:27017/db'
    },
    {
      id: '6',
      name: 'Prometheus',
      category: 'Monitoring',
      description: 'Collect and query time-series metrics',
      status: 'connected',
      logo: '/images/Prometheus.png',
      dataFlowRate: '35K/hour',
      lastSync: '1 minute ago',
      eventsToday: 892,
      apiKey: 'prom-api-key-xyz123'
    },
    {
      id: '7',
      name: 'Grafana',
      category: 'Visualization',
      description: 'Create dashboards and visualizations',
      status: 'connected',
      logo: '/images/Grafana.png',
      dataFlowRate: '5K/day',
      lastSync: '10 minutes ago',
      eventsToday: 123,
      apiKey: 'grafana-api-key-abc456'
    },
    {
      id: '8',
      name: 'Splunk',
      category: 'Log Management',
      description: 'Search, monitor and analyze machine data',
      status: 'disconnected',
      logo: '/images/Splunk.png',
      dataFlowRate: '0/day',
      lastSync: 'Never',
      eventsToday: 0
    },
    {
      id: '9',
      name: 'Sentry',
      category: 'Error Tracking',
      description: 'Application error monitoring and tracking',
      status: 'connected',
      logo: '/images/Sentry.svg',
      dataFlowRate: '2K/day',
      lastSync: '5 minutes ago',
      eventsToday: 45,
      apiKey: 'sentry-dsn-key-789def'
    }
  ]);

  const stats = [
    { label: 'Total Integrations', value: '24', icon: Plug, color: 'var(--accent-primary)' },
    { label: 'Active', value: '18', icon: CheckCircle, color: 'var(--status-positive)' },
    { label: 'Events Today', value: '6.3K', icon: Activity, color: 'var(--status-info)' },
    { label: 'Data Flow', value: '2.8M/day', icon: TrendingUp, color: 'var(--status-warning)' }
  ];

  const statusConfig = {
    connected: { icon: CheckCircle, color: 'var(--status-positive)', bg: 'var(--status-positive-bg)', text: 'var(--status-positive-text)' },
    disconnected: { icon: AlertTriangle, color: 'var(--text-muted)', bg: 'var(--surface-subtle)', text: 'var(--text-muted)' },
    error: { icon: AlertTriangle, color: 'var(--status-critical)', bg: 'var(--status-critical-bg)', text: 'var(--status-critical-text)' }
  };

  const categoryIcons: Record<string, any> = {
    'Communication': MessageSquare,
    'Incident Management': AlertTriangle,
    'Monitoring': Activity,
    'Project Management': Plug,
    'Development': Cloud,
    'Cloud Monitoring': Database,
    'Database': Database,
    'Visualization': TrendingUp,
    'Log Management': Activity,
    'Error Tracking': AlertTriangle
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setFormData({
      apiKey: integration.apiKey || '',
      customName: integration.customName || integration.name
    });
    setShowConfigModal(true);
    setShowApiKey(false);
    setCopied(false);
  };

  const handleSaveConfig = () => {
    if (selectedIntegration) {
      setIntegrations(integrations.map(int => 
        int.id === selectedIntegration.id 
          ? { ...int, apiKey: formData.apiKey, customName: formData.customName, status: formData.apiKey ? 'connected' : 'disconnected' }
          : int
      ));
      setShowConfigModal(false);
    }
  };

  const handleTestConnection = () => {
    // Simulate connection test
    alert('Testing connection... ✓ Connection successful!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Integrations
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Connect with your favorite tools and platforms
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
              if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.2) rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <Plus className="w-5 h-5" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
            Add Integration
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  const iconContainer = e.currentTarget.querySelector('.icon-container');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1.1) rotate(12deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  const iconContainer = e.currentTarget.querySelector('.icon-container');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="icon-container w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--surface-subtle)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
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

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => {
            const CategoryIcon = categoryIcons[integration.category] || Plug;
            const StatusIcon = statusConfig[integration.status].icon;
            const statusStyle = statusConfig[integration.status];
            
            return (
              <div
                key={integration.id}
                className="p-6 rounded-xl border cursor-pointer group"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(124, 58, 237, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  const iconContainer = e.currentTarget.querySelector('.integration-icon');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1.1) rotate(-5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  const iconContainer = e.currentTarget.querySelector('.integration-icon');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="integration-icon w-12 h-12 rounded-xl flex items-center justify-center p-2"
                      style={{ 
                        backgroundColor: 'var(--surface-subtle)',
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <Image 
                        src={integration.logo} 
                        alt={integration.name}
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:underline" style={{ color: 'var(--text-primary)' }}>
                        {integration.customName || integration.name}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {integration.category}
                      </p>
                    </div>
                  </div>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text
                    }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {integration.status}
                  </span>
                </div>

                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {integration.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Data Flow</p>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {integration.dataFlowRate}
                    </p>
                  </div>
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Events Today</p>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {integration.eventsToday.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Last sync: {integration.lastSync}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConfigure(integration);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      color: 'var(--text-secondary)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                      e.currentTarget.style.color = 'var(--text-inverse)';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as unknown as HTMLElement).style.transform = 'rotate(90deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as unknown as HTMLElement).style.transform = 'rotate(0deg)';
                    }}
                  >
                    <Settings className="w-3 h-3 inline mr-1" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    Configure
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Integrations */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Available Integrations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Grafana', 'New Relic', 'Splunk', 'Prometheus', 'Jenkins', 'CircleCI'].map((name) => (
              <button
                key={name}
                className="p-4 rounded-lg text-center"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: `1px solid var(--border-default)`,
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.15) rotate(12deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <Plug className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {name}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Not connected
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Modal */}
        {showConfigModal && selectedIntegration && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onClick={() => setShowConfigModal(false)}
          >
            <div 
              className="relative max-w-2xl w-full rounded-2xl border p-8"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowConfigModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--status-critical-bg)';
                  e.currentTarget.style.color = 'var(--status-critical)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center p-3"
                  style={{ backgroundColor: 'var(--surface-subtle)' }}
                >
                  <Image 
                    src={selectedIntegration.logo} 
                    alt={selectedIntegration.name}
                    width={48}
                    height={48}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Configure {selectedIntegration.name}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {selectedIntegration.category}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Custom Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Custom Name
                  </label>
                  <input
                    type="text"
                    value={formData.customName}
                    onChange={(e) => setFormData({ ...formData, customName: e.target.value })}
                    placeholder="e.g., Production DB, Main Monitoring"
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-default)'}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Give this integration a memorable name
                  </p>
                </div>

                {/* API Key / Secret Key */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    API Key / Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      placeholder="Enter your API key or connection string"
                      className="w-full px-4 py-3 rounded-lg border pr-24"
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        borderColor: 'var(--border-default)',
                        color: 'var(--text-primary)',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-default)'}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="p-2 rounded"
                        style={{
                          backgroundColor: 'var(--surface-subtle)',
                          color: 'var(--text-secondary)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                          e.currentTarget.style.color = 'var(--text-inverse)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 rounded"
                        style={{
                          backgroundColor: 'var(--surface-subtle)',
                          color: 'var(--text-secondary)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                          e.currentTarget.style.color = 'var(--text-inverse)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Your API key is encrypted and stored securely
                  </p>
                </div>

                {/* Connection Status */}
                <div 
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: selectedIntegration.status === 'connected' 
                      ? 'var(--status-positive-bg)' 
                      : selectedIntegration.status === 'error' 
                      ? 'var(--status-critical-bg)' 
                      : 'var(--surface-subtle)',
                    borderColor: selectedIntegration.status === 'connected' 
                      ? 'var(--status-positive)' 
                      : selectedIntegration.status === 'error' 
                      ? 'var(--status-critical)' 
                      : 'var(--border-default)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedIntegration.status === 'connected' ? (
                        <CheckCircle className="w-5 h-5" style={{ color: 'var(--status-positive)' }} />
                      ) : selectedIntegration.status === 'error' ? (
                        <AlertTriangle className="w-5 h-5" style={{ color: 'var(--status-critical)' }} />
                      ) : (
                        <Plug className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                      )}
                      <span className="font-semibold" style={{ 
                        color: selectedIntegration.status === 'connected' 
                          ? 'var(--status-positive)' 
                          : selectedIntegration.status === 'error' 
                          ? 'var(--status-critical)' 
                          : 'var(--text-secondary)' 
                      }}>
                        {selectedIntegration.status === 'connected' 
                          ? 'Connected' 
                          : selectedIntegration.status === 'error' 
                          ? 'Connection Error' 
                          : 'Not Connected'}
                      </span>
                    </div>
                    <button
                      onClick={handleTestConnection}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--text-inverse)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Test Connection
                    </button>
                  </div>
                  {selectedIntegration.lastSync && (
                    <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                      Last sync: {selectedIntegration.lastSync}
                    </p>
                  )}
                </div>

                {/* Metrics Display */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Data Flow Rate</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {selectedIntegration.dataFlowRate}
                    </p>
                  </div>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Events Today</p>
                    <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {selectedIntegration.eventsToday.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--border-default)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveConfig}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold"
                  style={{
                    backgroundColor: 'var(--button-primary-bg)',
                    color: 'var(--button-primary-text)',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
                  }}
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfessionalDashboardLayout>
  );
}
