'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  AlertTriangle,
  Clock,
  Users,
  Database,
  TrendingUp,
  Activity,
  ChevronLeft,
  ExternalLink,
  MessageSquare,
  Terminal,
  Zap,
  Server,
  BarChart3
} from 'lucide-react';

export default function IncidentINC2042() {
  const router = useRouter();

  const incidentData = {
    id: 'INC-2042',
    title: 'Kafka consumer lag increasing',
    severity: 'CRITICAL',
    status: 'Active',
    createdAt: '2025-01-15 11:47:33',
    duration: '2h 18m (ongoing)',
    assignee: 'Michael Rodriguez',
    affectedServices: ['event-processor', 'kafka-cluster', 'notification-service'],
    currentInvestigation: 'Analyzing consumer group performance and scaling consumer instances',
    nextSteps: 'Deploy additional consumer instances and investigate message processing bottleneck',
    metrics: {
      currentLag: 547823,
      lagGrowthRate: '+12.3k/min',
      consumerCount: 6,
      partitionCount: 24,
      avgProcessingTime: '1.8s'
    }
  };

  const timeline = [
    { time: '11:47:33', event: 'Alert triggered - Kafka consumer lag exceeded threshold', type: 'alert', icon: AlertTriangle },
    { time: '11:48:15', event: 'Auto-assigned to on-call SRE Michael Rodriguez', type: 'assignment', icon: Users },
    { time: '11:50:42', event: 'Investigation started - Checking consumer group health', type: 'investigation', icon: Activity },
    { time: '12:05:18', event: 'Lag growth rate: +8.5k messages/min', type: 'metric', icon: TrendingUp },
    { time: '12:15:33', event: 'Scaled consumers from 3 to 6 instances', type: 'action', icon: Zap },
    { time: '12:42:05', event: 'Lag growth slowed but still increasing', type: 'metric', icon: TrendingUp },
    { time: '13:15:22', event: 'Identified slow message processing in notification service', type: 'finding', icon: BarChart3 },
    { time: '13:58:47', event: 'Currently investigating message processing bottleneck', type: 'investigation', icon: Activity }
  ];

  const realtimeMetrics = [
    { label: 'Current Lag', value: '547,823', trend: '+12.3k/min', color: 'var(--status-critical-text)' },
    { label: 'Consumer Instances', value: '6', trend: '+3 scaled', color: 'var(--status-warning-text)' },
    { label: 'Partitions', value: '24', trend: 'Stable', color: 'var(--text-primary)' },
    { label: 'Avg Processing Time', value: '1.8s', trend: '+0.4s', color: 'var(--status-warning-text)' },
    { label: 'Messages/sec', value: '342', trend: '-15%', color: 'var(--status-critical-text)' },
    { label: 'Error Rate', value: '2.1%', trend: '+0.8%', color: 'var(--status-warning-text)' }
  ];

  const consumerGroups = [
    { name: 'notification-consumer', lag: 287453, instances: 3, status: 'degraded' },
    { name: 'analytics-consumer', lag: 156892, instances: 2, status: 'degraded' },
    { name: 'webhook-consumer', lag: 103478, instances: 1, status: 'critical' }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium"
          style={{
            color: 'var(--text-secondary)',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Incidents
        </button>

        {/* Header with Active Status */}
        <div 
          className="rounded-xl border p-6"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--status-critical-text)',
            borderWidth: '2px'
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-mono font-bold" style={{ color: 'var(--text-muted)' }}>
                  {incidentData.id}
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold animate-pulse"
                  style={{
                    backgroundColor: 'var(--status-critical-bg)',
                    color: 'var(--status-critical-text)'
                  }}
                >
                  {incidentData.status}
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--status-critical-bg)',
                    color: 'var(--status-critical-text)'
                  }}
                >
                  {incidentData.severity}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {incidentData.title}
              </h1>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Started: {incidentData.createdAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span>Duration: {incidentData.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {incidentData.assignee}
              </span>
            </div>
          </div>

          {/* Real-time Metrics Grid */}
          <div className="grid grid-cols-6 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            {realtimeMetrics.map((metric, idx) => (
              <div key={idx}>
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                  {metric.label}
                </p>
                <p className="text-xl font-bold mb-0.5" style={{ color: metric.color }}>
                  {metric.value}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {metric.trend}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Timeline */}
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Incident Timeline
              </h2>
              <div className="space-y-3">
                {timeline.map((item, idx) => {
                  const Icon = item.icon;
                  const isRecent = idx >= timeline.length - 2;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 pb-3"
                      style={{ 
                        borderBottom: idx < timeline.length - 1 ? `1px solid var(--border-subtle)` : 'none',
                        opacity: isRecent ? 1 : 0.7
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: item.type === 'alert' ? 'var(--status-critical-bg)' :
                                          item.type === 'action' ? 'var(--accent-primary)' :
                                          'var(--surface-subtle)',
                          color: item.type === 'alert' ? 'var(--status-critical-text)' :
                                 item.type === 'action' ? 'white' :
                                 'var(--text-secondary)'
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                            {item.time}
                          </span>
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{
                              backgroundColor: 'var(--surface-subtle)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                          {item.event}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consumer Groups Status */}
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  Consumer Groups
                </h2>
              </div>
              
              <div className="space-y-3">
                {consumerGroups.map((group, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      borderColor: group.status === 'critical' ? 'var(--status-critical-text)' : 
                                   group.status === 'degraded' ? 'var(--status-warning-text)' :
                                   'var(--border-default)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                        {group.name}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-bold uppercase"
                        style={{
                          backgroundColor: group.status === 'critical' ? 'var(--status-critical-bg)' : 
                                          group.status === 'degraded' ? 'var(--status-warning-bg)' :
                                          'var(--status-positive-bg)',
                          color: group.status === 'critical' ? 'var(--status-critical-text)' : 
                                 group.status === 'degraded' ? 'var(--status-warning-text)' :
                                 'var(--status-positive-text)'
                        }}
                      >
                        {group.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Current Lag</p>
                        <p className="font-bold" style={{ color: 'var(--status-critical-text)' }}>
                          {group.lag.toLocaleString()} messages
                        </p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Active Instances</p>
                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                          {group.instances} consumers
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Current Investigation */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--status-warning-text)',
                borderWidth: '2px'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4" style={{ color: 'var(--status-warning-text)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Active Investigation
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {incidentData.currentInvestigation}
              </p>
            </div>

            {/* Next Steps */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Next Steps
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {incidentData.nextSteps}
              </p>
            </div>

            {/* Affected Services */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Affected Services
              </h3>
              <div className="space-y-2">
                {incidentData.affectedServices.map((service, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    style={{
                      backgroundColor: 'var(--surface-subtle)'
                    }}
                  >
                    <Database className="w-4 h-4" style={{ color: 'var(--status-critical-text)' }} />
                    <span className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--status-critical-bg)',
                    color: 'var(--status-critical-text)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Scale Consumers
                  </span>
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-primary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    View Logs
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-primary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    War Room
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
