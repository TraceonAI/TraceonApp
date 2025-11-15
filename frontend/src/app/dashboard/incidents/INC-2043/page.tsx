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
  Server,
  HardDrive,
  Cpu,
  MemoryStick
} from 'lucide-react';

export default function IncidentINC2043() {
  const router = useRouter();

  const incidentData = {
    id: 'INC-2043',
    title: 'Redis cache memory overflow',
    severity: 'CRITICAL',
    status: 'Investigating',
    createdAt: '2025-01-15 12:05:19',
    duration: '1h 52m (ongoing)',
    assignee: 'Emily Watson',
    affectedServices: ['redis-cluster', 'product-catalog', 'user-sessions'],
    currentInvestigation: 'Analyzing memory usage patterns and identifying memory leak in cache layer',
    leadingHypothesis: 'Potential memory leak in product catalog caching logic causing unbounded growth',
    metrics: {
      currentMemory: '14.8 GB',
      maxMemory: '16 GB',
      utilizationPercent: 92.5,
      evictionRate: '2.3k keys/sec',
      hitRate: 67.4,
      connectedClients: 847
    }
  };

  const timeline = [
    { time: '12:05:19', event: 'Alert triggered - Redis memory usage exceeded 85%', type: 'alert', icon: AlertTriangle },
    { time: '12:06:33', event: 'Auto-assigned to SRE Emily Watson', type: 'assignment', icon: Users },
    { time: '12:08:15', event: 'Investigation started - Checking cache eviction policies', type: 'investigation', icon: Activity },
    { time: '12:22:47', event: 'Memory usage reached 90% - Eviction rate increasing', type: 'metric', icon: TrendingUp },
    { time: '12:35:22', event: 'Identified large keys in product catalog namespace', type: 'finding', icon: Database },
    { time: '12:48:05', event: 'Memory hit 92% - Cache hit rate degrading', type: 'metric', icon: TrendingUp },
    { time: '13:15:33', event: 'Analyzing product catalog caching code for memory leak', type: 'investigation', icon: Activity },
    { time: '13:42:18', event: 'Found potential leak in image URL caching logic', type: 'finding', icon: Terminal },
    { time: '13:55:47', event: 'Preparing fix for unbounded cache growth', type: 'investigation', icon: Activity }
  ];

  const memoryBreakdown = [
    { namespace: 'product:images', memory: '4.2 GB', keys: '847k', avgSize: '5.2 KB', growth: '+350 MB/hr' },
    { namespace: 'product:catalog', memory: '3.8 GB', keys: '234k', avgSize: '17.1 KB', growth: '+180 MB/hr' },
    { namespace: 'user:sessions', memory: '2.9 GB', keys: '1.2M', avgSize: '2.5 KB', growth: '+85 MB/hr' },
    { namespace: 'api:responses', memory: '2.1 GB', keys: '456k', avgSize: '4.8 KB', growth: '+120 MB/hr' },
    { namespace: 'other', memory: '1.8 GB', keys: '892k', avgSize: '2.1 KB', growth: '+45 MB/hr' }
  ];

  const redisNodes = [
    { node: 'redis-01', role: 'master', memory: '15.1 GB', status: 'critical', clients: 342 },
    { node: 'redis-02', role: 'replica', memory: '14.9 GB', status: 'critical', clients: 289 },
    { node: 'redis-03', role: 'replica', memory: '14.8 GB', status: 'critical', clients: 216 }
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

        {/* Header */}
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
                    backgroundColor: 'var(--status-warning-bg)',
                    color: 'var(--status-warning-text)'
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

          {/* Memory Metrics */}
          <div className="grid grid-cols-6 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Memory Used</p>
              <p className="text-xl font-bold" style={{ color: 'var(--status-critical-text)' }}>
                {incidentData.metrics.currentMemory}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>of {incidentData.metrics.maxMemory}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Utilization</p>
              <p className="text-xl font-bold" style={{ color: 'var(--status-critical-text)' }}>
                {incidentData.metrics.utilizationPercent}%
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>+2.3%/min</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Eviction Rate</p>
              <p className="text-xl font-bold" style={{ color: 'var(--status-warning-text)' }}>
                {incidentData.metrics.evictionRate}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>keys/sec</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Hit Rate</p>
              <p className="text-xl font-bold" style={{ color: 'var(--status-warning-text)' }}>
                {incidentData.metrics.hitRate}%
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>-8.2%</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Connected Clients</p>
              <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {incidentData.metrics.connectedClients}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>active</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Memory Pressure</p>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${incidentData.metrics.utilizationPercent}%`,
                    backgroundColor: 'var(--status-critical-text)'
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--status-critical-text)' }}>Critical</p>
            </div>
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
                Investigation Timeline
              </h2>
              <div className="space-y-3">
                {timeline.map((item, idx) => {
                  const Icon = item.icon;
                  const isRecent = idx >= timeline.length - 3;
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
                                          item.type === 'finding' ? 'var(--status-warning-bg)' :
                                          'var(--surface-subtle)',
                          color: item.type === 'alert' ? 'var(--status-critical-text)' :
                                 item.type === 'finding' ? 'var(--status-warning-text)' :
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

            {/* Memory Breakdown by Namespace */}
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <HardDrive className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  Memory Breakdown by Namespace
                </h2>
              </div>
              
              <div className="space-y-3">
                {memoryBreakdown.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      borderColor: idx < 2 ? 'var(--status-critical-text)' : 'var(--border-default)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.namespace}
                      </span>
                      <span className="text-lg font-bold" style={{ color: idx < 2 ? 'var(--status-critical-text)' : 'var(--text-primary)' }}>
                        {item.memory}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Keys</p>
                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.keys}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Avg Size</p>
                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{item.avgSize}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Growth Rate</p>
                        <p className="font-bold" style={{ color: 'var(--status-critical-text)' }}>{item.growth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redis Cluster Nodes */}
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
                  Redis Cluster Nodes
                </h2>
              </div>
              
              <div className="space-y-3">
                {redisNodes.map((node, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      borderColor: 'var(--status-critical-text)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                          {node.node}
                        </span>
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-bold uppercase"
                          style={{
                            backgroundColor: node.role === 'master' ? 'var(--accent-primary)' : 'var(--surface-default)',
                            color: node.role === 'master' ? 'white' : 'var(--text-secondary)'
                          }}
                        >
                          {node.role}
                        </span>
                      </div>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-bold uppercase"
                        style={{
                          backgroundColor: 'var(--status-critical-bg)',
                          color: 'var(--status-critical-text)'
                        }}
                      >
                        {node.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Memory Usage</p>
                        <p className="font-bold" style={{ color: 'var(--status-critical-text)' }}>
                          {node.memory} / 16 GB
                        </p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--text-muted)' }}>Connected Clients</p>
                        <p className="font-bold" style={{ color: 'var(--text-primary)' }}>
                          {node.clients}
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
            {/* Leading Hypothesis */}
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
                  Leading Hypothesis
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {incidentData.leadingHypothesis}
              </p>
            </div>

            {/* Current Investigation */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Active Investigation
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {incidentData.currentInvestigation}
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

            {/* Diagnostic Tools */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Diagnostic Tools
              </h3>
              <div className="space-y-2">
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
                    <MemoryStick className="w-4 h-4" />
                    Memory Analysis
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
                    <Terminal className="w-4 h-4" />
                    Redis CLI
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
