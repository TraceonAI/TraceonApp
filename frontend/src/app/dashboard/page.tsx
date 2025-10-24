'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import AnimatedCounter from '@/components/AnimatedCounter';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Brain,
  Zap,
  Clock,
  Target,
  BarChart3,
  ArrowUp,
  ArrowDown,
  TrendingDown,
  Bot,
  Server,
  ArrowUpRight,
  ArrowRight,
  XCircle,
  Shield,
  Network,
  Database,
  Globe
} from 'lucide-react';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedIncidentFilter, setSelectedIncidentFilter] = useState('all');
  const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
  const [hoveredServiceNode, setHoveredServiceNode] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Request rate chart data (last 24 hours)
  const requestRateData = [
    { time: '00:00', requests: 1240 },
    { time: '02:00', requests: 890 },
    { time: '04:00', requests: 650 },
    { time: '06:00', requests: 1100 },
    { time: '08:00', requests: 2340 },
    { time: '10:00', requests: 3120 },
    { time: '12:00', requests: 3580 },
    { time: '14:00', requests: 3890 },
    { time: '16:00', requests: 4120 },
    { time: '18:00', requests: 3640 },
    { time: '20:00', requests: 2890 },
    { time: '22:00', requests: 1980 },
  ];

  // Service topology data
  const serviceNodes = [
    { id: 'frontend', name: 'Frontend', x: 50, y: 20, status: 'healthy', requests: 4120, latency: '45ms' },
    { id: 'api-gateway', name: 'API Gateway', x: 50, y: 40, status: 'healthy', requests: 4098, latency: '12ms' },
    { id: 'auth-service', name: 'Auth Service', x: 20, y: 60, status: 'healthy', requests: 1240, latency: '8ms' },
    { id: 'user-service', name: 'User Service', x: 50, y: 60, status: 'warning', requests: 2340, latency: '124ms' },
    { id: 'order-service', name: 'Order Service', x: 80, y: 60, status: 'healthy', requests: 890, latency: '34ms' },
    { id: 'database', name: 'PostgreSQL', x: 35, y: 80, status: 'healthy', requests: 3420, latency: '5ms' },
    { id: 'cache', name: 'Redis Cache', x: 65, y: 80, status: 'healthy', requests: 8920, latency: '2ms' },
  ];

  const serviceConnections = [
    { from: 'frontend', to: 'api-gateway' },
    { from: 'api-gateway', to: 'auth-service' },
    { from: 'api-gateway', to: 'user-service' },
    { from: 'api-gateway', to: 'order-service' },
    { from: 'user-service', to: 'database' },
    { from: 'order-service', to: 'database' },
    { from: 'user-service', to: 'cache' },
    { from: 'order-service', to: 'cache' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'var(--status-positive)';
      case 'warning': return 'var(--status-warning)';
      case 'critical': return 'var(--status-critical)';
      default: return 'var(--text-muted)';
    }
  };

  const stats = [
    { 
      name: 'Incidents Resolved',
      value: '94%',
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      name: 'Active Incidents',
      value: '3',
      change: '-5',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500'
    },
    { 
      name: 'AI Analysis Time',
      value: '8.2s',
      change: '-2.1s',
      trend: 'down',
      icon: Brain,
      color: 'from-purple-500 to-blue-500'
    },
    { 
      name: 'System Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const recentIncidents = [
    { 
      id: 'INC-2041',
      title: 'Database latency spike detected',
      status: 'Resolved',
      aiAction: 'Root cause: N+1 query in OrderService',
      time: '5 mins ago',
      severity: 'high'
    },
    { 
      id: 'INC-2042',
      title: 'API response time degradation',
      status: 'Analyzing',
      aiAction: 'Correlating logs from 12 sources...',
      time: '12 mins ago',
      severity: 'medium'
    },
    { 
      id: 'INC-2043',
      title: 'Memory leak in user-service',
      status: 'Resolved',
      aiAction: 'Auto-restart initiated, team notified',
      time: '1 hour ago',
      severity: 'high'
    },
  ];

  const kpiCards = [
    {
      label: 'Incidents Resolved',
      value: 94,
      change: 12,
      intent: 'positive',
      icon: CheckCircle,
      href: '/dashboard/incidents?state=resolved'
    },
    {
      label: 'Active Incidents',
      value: 3,
      change: -40,
      intent: 'critical',
      icon: AlertTriangle,
      href: '/dashboard/incidents?state=active'
    },
    {
      label: 'AI Analysis Time',
      value: '8.2s',
      change: -25,
      intent: 'positive',
      icon: Brain,
      href: '/dashboard/metrics'
    },
    {
      label: 'System Uptime',
      value: '99.97%',
      change: 0.02,
      intent: 'positive',
      icon: Activity,
      href: '/dashboard/metrics'
    }
  ];

  return (
    <ProtectedRoute>
      <ProfessionalDashboardLayout>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Welcome back!
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Here's what's happening with your systems today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:border-opacity-60 hover:shadow-sm border cursor-pointer outline-none"
                style={{
                  backgroundColor: 'var(--button-secondary-bg)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--button-secondary-text)'
                }}
              >
                <option value="1h">Last 1 hour</option>
                <option value="6h">Last 6 hours</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
              <button
                onClick={() => setShowNewIncidentModal(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-98"
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
                  className="group rounded-xl border p-6 cursor-pointer active:scale-98"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                  }}
                  onClick={() => window.location.href = kpi.href}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: kpi.intent === 'critical' ? 'var(--status-critical-bg)' : 
                                       kpi.intent === 'positive' ? 'var(--status-positive-bg)' : 'var(--status-info-bg)'
                      }}
                    >
                      <Icon 
                        className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" 
                        style={{
                          color: kpi.intent === 'critical' ? 'var(--status-critical)' : 
                                 kpi.intent === 'positive' ? 'var(--status-positive)' : 'var(--status-info)'
                        }}
                      />
                    </div>
                    <ArrowUpRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {kpi.label}
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        {typeof kpi.value === 'number' ? (
                          <><AnimatedCounter end={kpi.value} />%</>
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

          {/* Original stats section removed, replaced with KPI cards above */}
          <div style={{ display: 'none' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{stat.name}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm font-medium text-green-600 ml-1">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-2">vs last week</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Incidents */}
            <div className="lg:col-span-2 rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Recent Incidents
                  </h2>
                  <button 
                    onClick={() => window.location.href = '/dashboard/incidents'}
                    className="text-sm font-medium flex items-center gap-1 transition-all duration-200 hover:gap-2" 
                    style={{ color: 'var(--text-link)' }}
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex items-center gap-2">
                  {['all', 'active', 'resolved'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedIncidentFilter(filter)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:shadow-sm capitalize"
                      style={{
                        backgroundColor: selectedIncidentFilter === filter ? 'var(--accent-primary)' : 'var(--surface-subtle)',
                        color: selectedIncidentFilter === filter ? 'var(--text-inverse)' : 'var(--text-secondary)'
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border-default)' }}>
                {recentIncidents
                  .filter(incident => {
                    if (selectedIncidentFilter === 'all') return true;
                    if (selectedIncidentFilter === 'active') return incident.status !== 'Resolved';
                    if (selectedIncidentFilter === 'resolved') return incident.status === 'Resolved';
                    return true;
                  })
                  .map((incident) => (
                  <div 
                    key={incident.id} 
                    onClick={() => window.location.href = `/dashboard/incidents/${incident.id}`}
                    className="p-6 cursor-pointer group active:scale-[0.99]" 
                    style={{ 
                      backgroundColor: 'var(--card-bg)',
                      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="px-2 py-1 text-xs font-semibold rounded transition-all duration-200 group-hover:shadow-sm"
                          style={{
                            backgroundColor: incident.severity === 'high' ? 'var(--status-critical-bg)' : 'var(--status-warning-bg)',
                            color: incident.severity === 'high' ? 'var(--status-critical-text)' : 'var(--status-warning-text)'
                          }}
                        >
                          {incident.severity === 'high' ? 'P1' : 'P2'}
                        </span>
                        <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                          {incident.id}
                        </span>
                      </div>
                      <span
                        className="px-3 py-1 text-xs font-medium rounded-full capitalize transition-all duration-200 group-hover:shadow-sm"
                        style={{
                          backgroundColor: incident.status === 'Resolved' ? 'var(--status-positive-bg)' : 'var(--status-info-bg)',
                          color: incident.status === 'Resolved' ? 'var(--status-positive-text)' : 'var(--status-info-text)'
                        }}
                      >
                        {incident.status}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-2 transition-all duration-200 group-hover:translate-x-1" style={{ color: 'var(--text-primary)' }}>
                      {incident.title}
                    </h3>
                    <div className="flex items-start gap-2 text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                      <Brain className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
                      <span>{incident.aiAction}</span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{incident.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Activity */}
            <div className="rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-default)' }}>
                <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Bot className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  AI Agent Activity
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div 
                  onClick={() => window.location.href = '/dashboard/query-studio'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' }}>
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                                    <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Root Cause Analysis</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>45 incidents analyzed today</p>
                  </div>
                  <ArrowRight 
                    className="w-4 h-4 transition-all duration-300 group-hover:arrow-reveal" 
                    style={{ 
                      color: 'var(--text-muted)',
                      opacity: 0,
                      transform: 'translateX(-8px)'
                    }} 
                  />
                </div>
                <div 
                  onClick={() => window.location.href = '/dashboard/incidents?state=resolved'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--status-positive-bg)' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--status-positive-text)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Auto-Resolved</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>42 incidents without intervention</p>
                  </div>
                  <ArrowRight 
                    className="w-4 h-4 transition-all duration-300 group-hover:arrow-reveal" 
                    style={{ 
                      color: 'var(--text-muted)',
                      opacity: 0,
                      transform: 'translateX(-8px)'
                    }} 
                  />
                </div>
                <div 
                  onClick={() => window.location.href = '/dashboard/notifications'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" style={{ backgroundColor: 'var(--status-info-bg)' }}>
                    <Zap className="w-5 h-5" style={{ color: 'var(--status-info-text)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications Sent</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>127 alerts to teams</p>
                  </div>
                  <ArrowRight 
                    className="w-4 h-4 transition-all duration-300 group-hover:arrow-reveal" 
                    style={{ 
                      color: 'var(--text-muted)',
                      opacity: 0,
                      transform: 'translateX(-8px)'
                    }} 
                  />
                </div>
                <div 
                  onClick={() => window.location.href = '/dashboard/integrations'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--status-warning-bg)' }}>
                    <Server className="w-5 h-5" style={{ color: 'var(--status-warning-text)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Data Sources</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>18 integrations active</p>
                  </div>
                  <ArrowRight 
                    className="w-4 h-4 transition-all duration-300 group-hover:arrow-reveal" 
                    style={{ 
                      color: 'var(--text-muted)',
                      opacity: 0,
                      transform: 'translateX(-8px)'
                    }} 
                  />
                </div>
                <div 
                  onClick={() => window.location.href = '/dashboard/incidents?state=resolved'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--status-positive-bg)' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--status-positive-text)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Auto-Resolved</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>42 incidents without intervention</p>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'var(--text-muted)', opacity: 0 }} />
                </div>
                <div 
                  onClick={() => window.location.href = '/dashboard/notifications'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" style={{ backgroundColor: 'var(--status-info-bg)' }}>
                    <Zap className="w-5 h-5" style={{ color: 'var(--status-info-text)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications Sent</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>127 alerts to teams</p>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'var(--text-muted)', opacity: 0 }} />
                </div>
                <div 
                  onClick={() => window.location.href = '/dashboard/integrations'}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer group active:scale-98" 
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-default)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--status-warning-bg)' }}>
                    <Server className="w-5 h-5" style={{ color: 'var(--status-warning-text)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Data Sources</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>18 integrations active</p>
                  </div>
                  <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" style={{ color: 'var(--text-muted)', opacity: 0 }} />
                </div>
              </div>
              
              <div className="m-4 p-6 rounded-xl" style={{ backgroundColor: 'var(--surface-subtle)', borderLeft: '4px solid var(--accent-primary)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Average Response Time</p>
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--accent-primary)' }}>
                  <AnimatedCounter end={8.2} decimals={1} suffix="s" />
                </p>
                <p className="text-xs flex items-center gap-1" style={{ color: 'var(--status-positive-text)' }}>
                  <ArrowUpRight className="w-3 h-3" />
                  2.1s faster than last week
                </p>
              </div>
            </div>
          </div>

          {/* Request Rate Chart */}
          <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <BarChart3 className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  Request Rate Over Time
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  HTTP requests per hour (last 24 hours)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Peak:</span>
                <span className="text-lg font-bold" style={{ color: 'var(--accent-primary)' }}>4,120</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>req/min</span>
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="relative h-64" style={{ width: '100%' }}>
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs" style={{ color: 'var(--text-muted)', width: '40px' }}>
                <span>4000</span>
                <span>3000</span>
                <span>2000</span>
                <span>1000</span>
                <span>0</span>
              </div>
              
              {/* Chart container */}
              <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-between gap-1">
                {requestRateData.map((data, idx) => {
                  const maxValue = Math.max(...requestRateData.map(d => d.requests));
                  const heightPercent = (data.requests / maxValue) * 100;
                  
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group">
                      <div 
                        className="w-full rounded-t-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
                        style={{
                          height: `${heightPercent}%`,
                          background: `linear-gradient(to top, var(--accent-primary), var(--accent-secondary))`,
                          minHeight: '2px',
                          boxShadow: '0 -2px 8px rgba(124, 58, 237, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scaleY(1.05)';
                          e.currentTarget.style.filter = 'brightness(1.2)';
                          e.currentTarget.style.boxShadow = '0 -4px 16px rgba(124, 58, 237, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scaleY(1)';
                          e.currentTarget.style.filter = 'brightness(1)';
                          e.currentTarget.style.boxShadow = '0 -2px 8px rgba(124, 58, 237, 0.3)';
                        }}
                      >
                        {/* Tooltip on hover */}
                        <div 
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-default)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                          }}
                        >
                          {data.requests.toLocaleString()} req
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* X-axis labels */}
              <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                {requestRateData.filter((_, idx) => idx % 2 === 0).map((data, idx) => (
                  <span key={idx}>{data.time}</span>
                ))}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>HTTP Requests</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-positive)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Avg Response: 124ms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-warning)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Error Rate: 0.02%</span>
              </div>
            </div>
          </div>

          {/* Interactive Service Map */}
          <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <Network className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  Interactive Service Map
                </h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Real-time service topology and health status
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{ 
                    backgroundColor: 'var(--status-positive-bg)',
                    color: 'var(--status-positive-text)'
                  }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--status-positive)' }} />
                  All Services Operational
                </span>
              </div>
            </div>
            
            {/* Topology Graph */}
            <div className="relative rounded-lg p-8" style={{ backgroundColor: 'var(--surface-subtle)', height: '500px' }}>
              {/* Connection lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                {serviceConnections.map((conn, idx) => {
                  const fromNode = serviceNodes.find(n => n.id === conn.from);
                  const toNode = serviceNodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;
                  
                  const x1 = `${fromNode.x}%`;
                  const y1 = `${fromNode.y}%`;
                  const x2 = `${toNode.x}%`;
                  const y2 = `${toNode.y}%`;
                  
                  return (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--border-default)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.5"
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>
              
              {/* Service nodes */}
              {serviceNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    zIndex: hoveredServiceNode === node.id ? 10 : 2,
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setHoveredServiceNode(node.id)}
                  onMouseLeave={() => setHoveredServiceNode(null)}
                >
                  {/* Node circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 relative"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: `3px solid ${getStatusColor(node.status)}`,
                      boxShadow: hoveredServiceNode === node.id 
                        ? `0 0 0 8px ${getStatusColor(node.status)}20, 0 8px 24px rgba(0,0,0,0.2)` 
                        : `0 0 0 4px ${getStatusColor(node.status)}10`,
                      transform: hoveredServiceNode === node.id ? 'scale(1.3)' : 'scale(1)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {/* Status pulse */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: getStatusColor(node.status),
                        opacity: node.status === 'warning' ? 0.3 : 0.1
                      }}
                    />
                    
                    {/* Icon based on service type */}
                    {node.id.includes('database') && <Database className="w-6 h-6 relative z-10" style={{ color: getStatusColor(node.status) }} />}
                    {node.id.includes('cache') && <Zap className="w-6 h-6 relative z-10" style={{ color: getStatusColor(node.status) }} />}
                    {node.id.includes('frontend') && <Globe className="w-6 h-6 relative z-10" style={{ color: getStatusColor(node.status) }} />}
                    {node.id.includes('gateway') && <Network className="w-6 h-6 relative z-10" style={{ color: getStatusColor(node.status) }} />}
                    {!node.id.includes('database') && !node.id.includes('cache') && !node.id.includes('frontend') && !node.id.includes('gateway') && (
                      <Server className="w-6 h-6 relative z-10" style={{ color: getStatusColor(node.status) }} />
                    )}
                  </div>
                  
                  {/* Node label */}
                  <div 
                    className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-center whitespace-nowrap transition-all duration-300"
                    style={{ 
                      color: 'var(--text-primary)',
                      opacity: hoveredServiceNode === node.id ? 1 : 0.7
                    }}
                  >
                    {node.name}
                  </div>
                  
                  {/* Detailed tooltip on hover */}
                  {hoveredServiceNode === node.id && (
                    <div 
                      className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-xl min-w-48 animate-in fade-in zoom-in-95"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: '1px solid var(--border-default)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        zIndex: 20
                      }}
                    >
                      <div className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{node.name}</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                          <span 
                            className="font-medium capitalize"
                            style={{ color: getStatusColor(node.status) }}
                          >
                            {node.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: 'var(--text-muted)' }}>Requests/min:</span>
                          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                            {node.requests.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span style={{ color: 'var(--text-muted)' }}>Latency:</span>
                          <span 
                            className="font-medium"
                            style={{ color: node.latency.includes('124') ? 'var(--status-warning)' : 'var(--status-positive)' }}
                          >
                            {node.latency}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Service Map Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--status-positive)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--status-warning)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--status-critical)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Critical</span>
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                • Hover over nodes for details
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              className="p-6 rounded-xl shadow-sm text-left group"
              style={{ 
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                color: 'white',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.25)';
              }}
              onClick={() => setShowNewIncidentModal(true)}
            >
              <Zap className="w-8 h-8 mb-3 opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-12" />
              <h3 className="font-bold text-lg mb-1">Create Incident</h3>
              <p className="text-sm opacity-80">Manually log a new incident</p>
            </button>
            
            <button 
              className="p-6 rounded-xl border-2 text-left group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.2)';
                e.currentTarget.style.borderColor = 'var(--accent-secondary)';
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              }}
              onClick={() => window.location.href = '/dashboard/reports'}
            >
              <BarChart3 className="w-8 h-8 mb-3 transition-all duration-300 group-hover:scale-125" style={{ color: 'var(--accent-primary)' }} />
              <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>View Analytics</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Deep dive into performance metrics</p>
            </button>
            
            <button 
              className="p-6 rounded-xl border text-left group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-default)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              }}
              onClick={() => window.location.href = '/dashboard/settings'}
            >
              <Target className="w-8 h-8 mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-90" style={{ color: 'var(--accent-primary)' }} />
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Configure Alerts</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Set up notification rules</p>
            </button>
          </div>

          {/* New Incident Modal */}
          {showNewIncidentModal && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowNewIncidentModal(false)}
            >
              <div 
                className="rounded-xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95"
                style={{ backgroundColor: 'var(--card-bg)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Create New Incident</h2>
                  <button 
                    onClick={() => setShowNewIncidentModal(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-opacity-80"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <XCircle className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Incident Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Database connection timeout"
                      className="w-full px-4 py-2 rounded-lg border outline-none transition-all duration-200 focus:border-opacity-100"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--input-border)',
                        color: 'var(--input-text)'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Severity
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border outline-none cursor-pointer transition-all duration-200 focus:border-opacity-100"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--input-border)',
                        color: 'var(--input-text)'
                      }}
                    >
                      <option value="low">P3 - Low</option>
                      <option value="medium">P2 - Medium</option>
                      <option value="high">P1 - High</option>
                      <option value="critical">P0 - Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      Description
                    </label>
                    <textarea
                      placeholder="Describe the incident..."
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border outline-none resize-none transition-all duration-200 focus:border-opacity-100"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--input-border)',
                        color: 'var(--input-text)'
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      // Handle submit
                      setShowNewIncidentModal(false);
                      window.location.href = '/dashboard/incidents';
                    }}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-98"
                    style={{
                      backgroundColor: 'var(--button-primary-bg)',
                      color: 'var(--button-primary-text)'
                    }}
                  >
                    Create Incident
                  </button>
                  <button
                    onClick={() => setShowNewIncidentModal(false)}
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-opacity-80 active:scale-98"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ProfessionalDashboardLayout>
    </ProtectedRoute>
  );
}
