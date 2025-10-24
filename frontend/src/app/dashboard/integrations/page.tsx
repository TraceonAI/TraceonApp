'use client';

import React, { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
  dataFlowRate: string;
  lastSync: string;
  eventsToday: number;
}

export default function IntegrationsPage() {
  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Slack',
      category: 'Communication',
      description: 'Send notifications and alerts to Slack channels',
      status: 'connected',
      icon: 'slack',
      dataFlowRate: '2.4K/day',
      lastSync: '2 minutes ago',
      eventsToday: 127
    },
    {
      id: '2',
      name: 'PagerDuty',
      category: 'Incident Management',
      description: 'Automated incident escalation and on-call management',
      status: 'connected',
      icon: 'pagerduty',
      dataFlowRate: '340/day',
      lastSync: '5 minutes ago',
      eventsToday: 23
    },
    {
      id: '3',
      name: 'Datadog',
      category: 'Monitoring',
      description: 'Stream metrics and logs to Datadog',
      status: 'connected',
      icon: 'datadog',
      dataFlowRate: '45K/hour',
      lastSync: '1 minute ago',
      eventsToday: 1240
    },
    {
      id: '4',
      name: 'Jira',
      category: 'Project Management',
      description: 'Create and update tickets from incidents',
      status: 'error',
      icon: 'jira',
      dataFlowRate: '180/day',
      lastSync: '2 hours ago',
      eventsToday: 8
    },
    {
      id: '5',
      name: 'GitHub',
      category: 'Development',
      description: 'Track deployments and code changes',
      status: 'connected',
      icon: 'github',
      dataFlowRate: '420/day',
      lastSync: '10 minutes ago',
      eventsToday: 34
    },
    {
      id: '6',
      name: 'AWS CloudWatch',
      category: 'Cloud Monitoring',
      description: 'Ingest metrics from AWS infrastructure',
      status: 'connected',
      icon: 'aws',
      dataFlowRate: '120K/hour',
      lastSync: '30 seconds ago',
      eventsToday: 4892
    }
  ];

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
    'Cloud Monitoring': Database
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
                      className="integration-icon w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--text-inverse)',
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <CategoryIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:underline" style={{ color: 'var(--text-primary)' }}>
                        {integration.name}
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
      </div>
    </ProfessionalDashboardLayout>
  );
}
