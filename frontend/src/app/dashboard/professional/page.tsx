'use client';

import React, { useState, useEffect } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  AlertTriangle,
  Activity,
  Clock,
  Bot,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Zap,
  Database,
  Server,
  Globe,
  ArrowUpRight,
  ArrowRight,
  Brain,
  Shield,
  Target
} from 'lucide-react';

export default function ProfessionalOverviewPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const kpiCards = [
    {
      label: 'Active Incidents',
      value: 3,
      change: -40,
      intent: 'critical',
      icon: AlertTriangle,
      href: '/dashboard/incidents?state=active'
    },
    {
      label: 'Error Rate',
      value: '0.12%',
      change: -15,
      intent: 'positive',
      icon: Activity,
      href: '/dashboard/metrics?chart=errors'
    },
    {
      label: 'Mean Time to Detect',
      value: '8.2s',
      change: -25,
      intent: 'positive',
      icon: Clock,
      href: '/dashboard/metrics'
    },
    {
      label: 'Agent Resolutions (24h)',
      value: 42,
      change: 18,
      intent: 'positive',
      icon: Bot,
      href: '/dashboard/agent-console'
    }
  ];

  const recentIncidents = [
    {
      id: 'INC-2041',
      title: 'Database latency spike in us-west-2',
      severity: 'P2',
      service: 'payment-service',
      status: 'investigating',
      startedAt: '2 mins ago',
      owner: 'Sarah Chen'
    },
    {
      id: 'INC-2040',
      title: 'Memory leak detected in user-service',
      severity: 'P3',
      service: 'user-service',
      status: 'monitoring',
      startedAt: '15 mins ago',
      owner: 'Marcus Rodriguez'
    },
    {
      id: 'INC-2039',
      title: 'Redis connection pool exhausted',
      severity: 'P1',
      service: 'cache-service',
      status: 'resolved',
      startedAt: '1 hour ago',
      owner: 'AI Agent'
    }
  ];

  const agentActivity = [
    {
      id: 1,
      actor: 'AI Agent',
      action: 'Identified root cause',
      target: 'Database N+1 query in OrderService',
      confidence: 98,
      timestamp: '2 mins ago',
      status: 'success'
    },
    {
      id: 2,
      actor: 'AI Agent',
      action: 'Auto-resolved incident',
      target: 'INC-2039: Redis connection pool',
      confidence: 95,
      timestamp: '45 mins ago',
      status: 'success'
    },
    {
      id: 3,
      actor: 'AI Agent',
      action: 'Sent notification',
      target: '@platform-team via Slack',
      confidence: 100,
      timestamp: '1 hour ago',
      status: 'success'
    },
    {
      id: 4,
      actor: 'AI Agent',
      action: 'Analyzed metrics correlation',
      target: '12 data sources',
      confidence: 92,
      timestamp: '2 hours ago',
      status: 'success'
    }
  ];

  const systemHealth = [
    { service: 'API Gateway', status: 'healthy', latency: '45ms', uptime: 99.98 },
    { service: 'Payment Service', status: 'degraded', latency: '340ms', uptime: 99.45 },
    { service: 'User Service', status: 'healthy', latency: '52ms', uptime: 99.99 },
    { service: 'Database Cluster', status: 'healthy', latency: '12ms', uptime: 99.97 },
    { service: 'Cache Layer', status: 'healthy', latency: '3ms', uptime: 99.99 }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Overview
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Executive snapshot of system health and agent activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
              style={{
                backgroundColor: 'var(--button-secondary-bg)',
                borderColor: 'var(--border-default)',
                color: 'var(--button-secondary-text)'
              }}
            >
              Last 24 hours
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--button-primary-bg)',
                color: 'var(--button-primary-text)'
              }}
            >
              New Incident
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, idx) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change > 0 ? kpi.intent === 'positive' : kpi.intent !== 'critical';
            
            return (
              <div
                key={idx}
                className="rounded-xl border p-6 cursor-pointer transition-all hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)'
                }}
                onClick={() => window.location.href = kpi.href}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: kpi.intent === 'critical' ? 'var(--status-critical-bg)' : 
                                     kpi.intent === 'positive' ? 'var(--status-positive-bg)' : 'var(--status-info-bg)'
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{
                        color: kpi.intent === 'critical' ? 'var(--status-critical)' : 
                               kpi.intent === 'positive' ? 'var(--status-positive)' : 'var(--status-info)'
                      }}
                    />
                  </div>
                  <ArrowUpRight className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {kpi.label}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {typeof kpi.value === 'number' ? (
                        <AnimatedCounter end={kpi.value} />
                      ) : (
                        kpi.value
                      )}
                    </span>
                    <span 
                      className="flex items-center gap-1 text-sm font-medium"
                      style={{ color: isPositive ? 'var(--status-positive)' : 'var(--status-critical)' }}
                    >
                      {isPositive ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                      {Math.abs(kpi.change)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Incidents */}
          <div className="lg:col-span-2 rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="p-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Active Incidents
                </h2>
                <button className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--text-link)' }}>
                  View all <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border-default)' }}>
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-6 hover:bg-opacity-50 transition-colors cursor-pointer" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2 py-1 text-xs font-semibold rounded"
                        style={{
                          backgroundColor: incident.severity === 'P1' ? 'var(--status-critical-bg)' : 
                                         incident.severity === 'P2' ? 'var(--status-warning-bg)' : 'var(--status-info-bg)',
                          color: incident.severity === 'P1' ? 'var(--status-critical-text)' : 
                                 incident.severity === 'P2' ? 'var(--status-warning-text)' : 'var(--status-info-text)'
                        }}
                      >
                        {incident.severity}
                      </span>
                      <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                        {incident.id}
                      </span>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full capitalize"
                      style={{
                        backgroundColor: incident.status === 'resolved' ? 'var(--status-positive-bg)' : 
                                       incident.status === 'investigating' ? 'var(--status-warning-bg)' : 'var(--surface-subtle)',
                        color: incident.status === 'resolved' ? 'var(--status-positive-text)' : 
                               incident.status === 'investigating' ? 'var(--status-warning-text)' : 'var(--text-secondary)'
                      }}
                    >
                      {incident.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {incident.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex items-center gap-1">
                      <Server className="w-4 h-4" />
                      {incident.service}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {incident.startedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--text-inverse)' }}>
                        {incident.owner.split(' ').map(n => n[0]).join('')}
                      </div>
                      {incident.owner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Activity */}
          <div className="rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="p-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Bot className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                Agent Activity
              </h2>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {agentActivity.map((activity) => (
                <div key={activity.id} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                      <Brain className="w-4 h-4" style={{ color: 'var(--text-inverse)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {activity.action}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {activity.target}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${activity.confidence}%`,
                              backgroundColor: 'var(--status-positive)'
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          {activity.confidence}%
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="p-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              System Health
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: 'var(--surface-subtle)' }}>
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Latency</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase" style={{ color: 'var(--text-secondary)' }}>Uptime (30d)</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-default)' }}>
                {systemHealth.map((service, idx) => (
                  <tr key={idx} className="hover:bg-opacity-50 transition-colors" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <td className="px-6 py-4">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{service.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: service.status === 'healthy' ? 'var(--status-positive-bg)' : 'var(--status-warning-bg)',
                          color: service.status === 'healthy' ? 'var(--status-positive-text)' : 'var(--status-warning-text)'
                        }}
                      >
                        {service.status === 'healthy' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>{service.latency}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-xs h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${service.uptime}%`,
                              backgroundColor: service.uptime > 99.9 ? 'var(--status-positive)' : 'var(--status-warning)'
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          {service.uptime}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
