'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Users,
  TrendingUp,
  Activity,
  Zap,
  MessageSquare,
  XCircle,
  ChevronRight,
  Play,
  Plus
} from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'resolved' | 'monitoring';
  assignee: string;
  createdAt: Date;
  duration: string;
  affectedServices: string[];
  metrics: {
    errorRate: number;
    affectedUsers: number;
    responseTime: number;
  };
}

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const incidents: Incident[] = [
    {
      id: 'INC-1234',
      title: 'Database Connection Pool Exhaustion - OrderService',
      severity: 'critical',
      status: 'investigating',
      assignee: 'Sarah Chen',
      createdAt: new Date(Date.now() - 1000 * 60 * 23),
      duration: '23m',
      affectedServices: ['OrderService', 'PaymentAPI', 'UserService'],
      metrics: {
        errorRate: 12.4,
        affectedUsers: 3450,
        responseTime: 8200
      }
    },
    {
      id: 'INC-1233',
      title: 'Elevated API Response Times in us-west-2',
      severity: 'high',
      status: 'active',
      assignee: 'Mike Johnson',
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
      duration: '45m',
      affectedServices: ['APIGateway', 'AuthService'],
      metrics: {
        errorRate: 3.2,
        affectedUsers: 892,
        responseTime: 2100
      }
    },
    {
      id: 'INC-1232',
      title: 'Redis Cache Miss Rate Spike',
      severity: 'medium',
      status: 'monitoring',
      assignee: 'Alex Kumar',
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
      duration: '2h',
      affectedServices: ['CacheLayer', 'ProductCatalog'],
      metrics: {
        errorRate: 0.8,
        affectedUsers: 245,
        responseTime: 450
      }
    },
    {
      id: 'INC-1231',
      title: 'Memory Leak in BackgroundWorker',
      severity: 'low',
      status: 'resolved',
      assignee: 'Jessica Wang',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
      duration: '4h',
      affectedServices: ['BackgroundWorker'],
      metrics: {
        errorRate: 0.2,
        affectedUsers: 0,
        responseTime: 120
      }
    }
  ];

  const severityConfig = {
    critical: { color: 'var(--status-critical)', bg: 'var(--status-critical-bg)', text: 'var(--status-critical-text)' },
    high: { color: 'var(--status-warning)', bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
    medium: { color: 'var(--status-info)', bg: 'var(--status-info-bg)', text: 'var(--status-info-text)' },
    low: { color: 'var(--status-positive)', bg: 'var(--status-positive-bg)', text: 'var(--status-positive-text)' }
  };

  const statusConfig = {
    active: { icon: AlertTriangle, color: 'var(--status-critical)' },
    investigating: { icon: Activity, color: 'var(--status-warning)' },
    monitoring: { icon: Clock, color: 'var(--status-info)' },
    resolved: { icon: CheckCircle, color: 'var(--status-positive)' }
  };

  const stats = [
    { label: 'Active Incidents', value: '2', change: '+1', icon: AlertTriangle, color: 'var(--status-critical)' },
    { label: 'MTTD', value: '2.4m', change: '-18%', icon: Clock, color: 'var(--status-info)' },
    { label: 'MTTR', value: '12.3m', change: '-24%', icon: Zap, color: 'var(--status-positive)' },
    { label: 'Affected Users', value: '4.3K', change: '+320%', icon: Users, color: 'var(--status-warning)' }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
                {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Incident Command Center
          </h1>
          <button
            className="px-6 py-3 rounded-xl font-semibold active:scale-98 flex items-center gap-2 group"
            style={{
              backgroundColor: 'var(--button-primary-bg)',
              color: 'var(--button-primary-text)',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
          >
            <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            Create Incident
          </button>
        </div>

        {/* Stats */}
                {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Incidents', value: '12', change: '+3', icon: Activity, color: 'var(--status-critical)' },
            { label: 'Resolved Today', value: '28', change: '+15%', icon: CheckCircle, color: 'var(--status-positive)' },
            { label: 'Avg Response Time', value: '4.2m', change: '-22%', icon: Clock, color: 'var(--accent-primary)' },
            { label: 'Total This Week', value: '84', change: '+8', icon: Zap, color: 'var(--status-warning)' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border cursor-pointer group"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ 
                      backgroundColor: `${stat.color}15`,
                      transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(12deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span 
                    className="text-sm font-bold px-2 py-1 rounded-lg"
                    style={{
                      backgroundColor: stat.change.startsWith('+') 
                        ? 'var(--status-positive-subtle)' 
                        : 'var(--status-critical-subtle)',
                      color: stat.change.startsWith('+') 
                        ? 'var(--status-positive)' 
                        : 'var(--status-critical)'
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div 
            className="flex-1 min-w-[300px] flex items-center gap-3 px-4 py-3 rounded-xl border"
            style={{
              backgroundColor: 'var(--input-bg)',
              borderColor: 'var(--input-border)'
            }}
          >
            <Search className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ color: 'var(--input-text)' }}
            />
          </div>

                    <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 rounded-lg font-medium cursor-pointer group"
            style={{
              backgroundColor: 'var(--surface-subtle)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-default)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

                    <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg font-medium cursor-pointer"
            style={{
              backgroundColor: 'var(--surface-subtle)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-default)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </select>

          <button
            className="px-4 py-3 rounded-xl border flex items-center gap-2 group"
            style={{
              backgroundColor: 'var(--surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-secondary)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
          >
            <Filter className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            More Filters
          </button>
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {incidents.map((incident) => {
            const StatusIcon = statusConfig[incident.status].icon;
            const severityStyle = severityConfig[incident.severity];
            
            return (
              <div
                key={incident.id}
                className="p-6 rounded-xl border cursor-pointer group"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: severityStyle.bg,
                          color: severityStyle.text
                        }}
                      >
                        {incident.severity.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" style={{ color: statusConfig[incident.status].color }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                        {incident.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2" style={{ 
                      color: 'var(--text-primary)',
                      transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    >
                      {incident.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {incident.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Assignee: {incident.assignee}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight 
                    className="w-6 h-6" 
                    style={{ 
                      color: 'var(--text-muted)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: 0.5,
                      transform: 'translateX(-8px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.5';
                      e.currentTarget.style.transform = 'translateX(-8px)';
                    }}
                  />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="w-4 h-4" style={{ color: 'var(--status-critical)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Error Rate
                      </span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {incident.metrics.errorRate}%
                    </p>
                  </div>
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4" style={{ color: 'var(--status-warning)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Affected Users
                      </span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {incident.metrics.affectedUsers.toLocaleString()}
                    </p>
                  </div>
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--status-info)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Response Time
                      </span>
                    </div>
                    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {incident.metrics.responseTime}ms
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Affected Services:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedServices.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--text-inverse)'
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium active:scale-98"
                    style={{
                      backgroundColor: 'var(--button-primary-bg)',
                      color: 'var(--button-primary-text)',
                      boxShadow: '0 2px 8px rgba(124, 58, 237, 0.2)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.2)';
                    }}
                  >
                    View Details
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium active:scale-98 flex items-center gap-2 group"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-default)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                    }}
                  >
                    <MessageSquare className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    Add Note
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium active:scale-98 flex items-center gap-2 group"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-default)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = 'var(--border-default)';
                    }}
                  >
                    <Play className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    Run Runbook
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
