'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Cpu,
  HardDrive,
  Zap,
  Clock,
  Server,
  Database,
  RefreshCw,
  Download,
  Calendar,
  Filter,
  Maximize2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function MetricsPage() {
  const [timeRange, setTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedApp, setSelectedApp] = useState<string>('all');

  // HTTP Status Code Statistics by Application
  const httpStatusByApp = {
    'OrderService': { '2xx': 8942, '3xx': 234, '4xx': 89, '5xx': 12 },
    'PaymentAPI': { '2xx': 6521, '3xx': 145, '4xx': 56, '5xx': 8 },
    'AuthService': { '2xx': 12340, '3xx': 423, '4xx': 234, '5xx': 3 },
    'UserService': { '2xx': 9876, '3xx': 321, '4xx': 112, '5xx': 7 }
  };

  // Application Health & Uptime
  const applicationHealth = [
    { name: 'OrderService', uptime: 99.97, lastCheck: '30s ago', status: 'healthy', responseTime: 45, pingSuccess: 99.98 },
    { name: 'PaymentAPI', uptime: 99.95, lastCheck: '25s ago', status: 'healthy', responseTime: 180, pingSuccess: 99.94 },
    { name: 'AuthService', uptime: 99.99, lastCheck: '15s ago', status: 'healthy', responseTime: 23, pingSuccess: 99.99 },
    { name: 'UserService', uptime: 98.80, lastCheck: '45s ago', status: 'degraded', responseTime: 420, pingSuccess: 98.75 },
    { name: 'NotificationService', uptime: 99.92, lastCheck: '20s ago', status: 'healthy', responseTime: 92, pingSuccess: 99.91 }
  ];

  const metrics = [
    {
      name: 'CPU Usage',
      value: '68.4%',
      change: '+12%',
      trend: 'up',
      icon: Cpu,
      color: 'var(--status-warning)',
      sparkline: [45, 52, 48, 62, 58, 65, 68]
    },
    {
      name: 'Memory Usage',
      value: '82.1%',
      change: '+8%',
      trend: 'up',
      icon: HardDrive,
      color: 'var(--status-critical)',
      sparkline: [72, 74, 78, 76, 79, 81, 82]
    },
    {
      name: 'Request Rate',
      value: '2.4K/s',
      change: '-5%',
      trend: 'down',
      icon: Activity,
      color: 'var(--status-info)',
      sparkline: [2800, 2600, 2500, 2450, 2420, 2400, 2400]
    },
    {
      name: 'Response Time',
      value: '245ms',
      change: '-18%',
      trend: 'down',
      icon: Zap,
      color: 'var(--status-positive)',
      sparkline: [320, 298, 285, 270, 258, 250, 245]
    },
    {
      name: 'Error Rate',
      value: '0.42%',
      change: '+0.12%',
      trend: 'up',
      icon: Activity,
      color: 'var(--status-warning)',
      sparkline: [0.2, 0.25, 0.3, 0.35, 0.38, 0.4, 0.42]
    },
    {
      name: 'Database Queries',
      value: '1.8K/s',
      change: '+24%',
      trend: 'up',
      icon: Database,
      color: 'var(--accent-primary)',
      sparkline: [1200, 1350, 1450, 1550, 1650, 1750, 1800]
    }
  ];

  const services = [
    { name: 'API Gateway', health: 98, latency: 45, throughput: '4.2K/s', status: 'healthy' },
    { name: 'Auth Service', health: 99, latency: 23, throughput: '1.8K/s', status: 'healthy' },
    { name: 'Order Service', health: 85, latency: 320, throughput: '890/s', status: 'degraded' },
    { name: 'Payment API', health: 95, latency: 180, throughput: '450/s', status: 'healthy' },
    { name: 'User Service', health: 100, latency: 18, throughput: '2.1K/s', status: 'healthy' },
    { name: 'Notification Service', health: 92, latency: 92, throughput: '650/s', status: 'healthy' }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Metrics Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Real-time performance monitoring and analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                autoRefresh ? 'animate-pulse' : ''
              }`}
              style={{
                backgroundColor: autoRefresh ? 'var(--status-positive)' : 'var(--surface-subtle)',
                color: autoRefresh ? 'var(--text-inverse)' : 'var(--text-secondary)',
                border: autoRefresh ? 'none' : `1px solid var(--border-default)`,
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = autoRefresh 
                  ? '0 8px 16px rgba(16, 185, 129, 0.25)' 
                  : '0 8px 16px rgba(124, 58, 237, 0.1)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1.1) rotate(180deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <RefreshCw 
                className="w-4 h-4" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              Auto-refresh
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border outline-none cursor-pointer"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--input-border)',
                color: 'var(--input-text)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--input-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="5m">Last 5 minutes</option>
              <option value="15m">Last 15 minutes</option>
              <option value="1h">Last 1 hour</option>
              <option value="6h">Last 6 hours</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </select>
            <button
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2"
              style={{
                backgroundColor: 'var(--button-primary-bg)',
                color: 'var(--button-primary-text)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.4)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <Download 
                className="w-4 h-4" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              Export
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const isPositive = metric.trend === 'down' && (metric.name.includes('Response Time') || metric.name.includes('Error'));
            const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border cursor-pointer group"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--surface-subtle)',
                      boxShadow: `0 0 20px ${metric.color}20`,
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(12deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                  <span 
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: isPositive ? 'var(--status-positive-bg)' : metric.trend === 'up' ? 'var(--status-critical-bg)' : 'var(--status-positive-bg)',
                      color: isPositive ? 'var(--status-positive-text)' : metric.trend === 'up' ? 'var(--status-critical-text)' : 'var(--status-positive-text)'
                    }}
                  >
                    <TrendIcon className="w-3 h-3" />
                    {metric.change}
                  </span>
                </div>
                
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {metric.name}
                </p>
                <p className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {metric.value}
                </p>

                {/* Sparkline */}
                <div className="flex items-end gap-1 h-12">
                  {metric.sparkline.map((value, i) => {
                    const maxValue = Math.max(...metric.sparkline);
                    const height = (value / maxValue) * 100;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all hover:opacity-80"
                        style={{
                          height: `${height}%`,
                          backgroundColor: metric.color,
                          opacity: i === metric.sparkline.length - 1 ? 1 : 0.6
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Health */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Service Health Overview
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Real-time health scores and performance metrics
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                border: `1px solid var(--border-default)`,
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <Maximize2 
                className="w-4 h-4" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              View All
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-6 p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--surface-subtle)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Server className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {service.name}
                    </h3>
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: service.status === 'healthy' ? 'var(--status-positive-bg)' : 'var(--status-warning-bg)',
                        color: service.status === 'healthy' ? 'var(--status-positive-text)' : 'var(--status-warning-text)'
                      }}
                    >
                      {service.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>Health: {service.health}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Latency: {service.latency}ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Throughput: {service.throughput}</span>
                    </div>
                  </div>
                </div>

                {/* Health Bar */}
                <div className="w-48">
                  <div className="flex items-center justify-between mb-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>Health Score</span>
                    <span className="font-bold">{service.health}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-default)' }}>
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${service.health}%`,
                        backgroundColor: service.health >= 95 ? 'var(--status-positive)' : service.health >= 85 ? 'var(--status-warning)' : 'var(--status-critical)'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HTTP Status Code Dashboard */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                HTTP Status Code Distribution
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Response status breakdown by application
              </p>
            </div>
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              className="px-4 py-2 rounded-lg border outline-none cursor-pointer"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--input-border)',
                color: 'var(--input-text)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--input-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="all">All Applications</option>
              {Object.keys(httpStatusByApp).map(app => (
                <option key={app} value={app}>{app}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedApp === 'all' ? (
              // Aggregated view for all apps
              <>
                {['2xx', '3xx', '4xx', '5xx'].map(statusCode => {
                  const total = Object.values(httpStatusByApp).reduce((sum, app) => sum + (app[statusCode as keyof typeof app] || 0), 0);
                  const color = statusCode === '2xx' ? 'var(--status-positive)' : 
                               statusCode === '3xx' ? 'var(--status-info)' : 
                               statusCode === '4xx' ? 'var(--status-warning)' : 
                               'var(--status-critical)';
                  const bgColor = statusCode === '2xx' ? 'var(--status-positive-bg)' : 
                                 statusCode === '3xx' ? 'var(--status-info-bg)' : 
                                 statusCode === '4xx' ? 'var(--status-warning-bg)' : 
                                 'var(--status-critical-bg)';
                  
                  return (
                    <div 
                      key={statusCode}
                      className="p-4 rounded-xl border"
                      style={{ 
                        backgroundColor: bgColor, 
                        borderColor: color,
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                        e.currentTarget.style.boxShadow = `0 12px 24px ${color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="text-xs font-semibold mb-2" style={{ color }}>
                        {statusCode} Success {statusCode === '2xx' ? '✓' : statusCode === '3xx' ? '↗' : statusCode === '4xx' ? '⚠' : '✗'}
                      </div>
                      <div className="text-3xl font-bold" style={{ color }}>
                        {total.toLocaleString()}
                      </div>
                      <div className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                        {statusCode === '2xx' && 'Successful responses'}
                        {statusCode === '3xx' && 'Redirections'}
                        {statusCode === '4xx' && 'Client errors'}
                        {statusCode === '5xx' && 'Server errors'}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              // Per-app view
              <>
                {['2xx', '3xx', '4xx', '5xx'].map(statusCode => {
                  const count = httpStatusByApp[selectedApp as keyof typeof httpStatusByApp]?.[statusCode as '2xx' | '3xx' | '4xx' | '5xx'] || 0;
                  const color = statusCode === '2xx' ? 'var(--status-positive)' : 
                               statusCode === '3xx' ? 'var(--status-info)' : 
                               statusCode === '4xx' ? 'var(--status-warning)' : 
                               'var(--status-critical)';
                  const bgColor = statusCode === '2xx' ? 'var(--status-positive-bg)' : 
                                 statusCode === '3xx' ? 'var(--status-info-bg)' : 
                                 statusCode === '4xx' ? 'var(--status-warning-bg)' : 
                                 'var(--status-critical-bg)';
                  
                  return (
                    <div 
                      key={statusCode}
                      className="p-4 rounded-xl border"
                      style={{ 
                        backgroundColor: bgColor, 
                        borderColor: color,
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                        e.currentTarget.style.boxShadow = `0 12px 24px ${color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div className="text-xs font-semibold mb-2" style={{ color }}>
                        {statusCode} {selectedApp}
                      </div>
                      <div className="text-3xl font-bold" style={{ color }}>
                        {count.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Breakdown by Application */}
          {selectedApp === 'all' && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Breakdown by Application
              </h3>
              {Object.entries(httpStatusByApp).map(([app, stats]) => {
                const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
                const successRate = ((stats['2xx'] / total) * 100).toFixed(2);
                
                return (
                  <div 
                    key={app}
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: 'var(--surface-subtle)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{app}</span>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {successRate}% success rate
                      </span>
                    </div>
                    <div className="flex gap-1 h-6">
                      <div 
                        className="rounded flex items-center justify-center text-xs text-white font-bold"
                        style={{ 
                          width: `${(stats['2xx'] / total) * 100}%`,
                          backgroundColor: 'var(--status-positive)',
                          minWidth: stats['2xx'] > 0 ? '40px' : '0'
                        }}
                      >
                        {stats['2xx'] > 0 && stats['2xx']}
                      </div>
                      <div 
                        className="rounded flex items-center justify-center text-xs text-white font-bold"
                        style={{ 
                          width: `${(stats['3xx'] / total) * 100}%`,
                          backgroundColor: 'var(--status-info)',
                          minWidth: stats['3xx'] > 0 ? '30px' : '0'
                        }}
                      >
                        {stats['3xx'] > 0 && stats['3xx']}
                      </div>
                      <div 
                        className="rounded flex items-center justify-center text-xs text-white font-bold"
                        style={{ 
                          width: `${(stats['4xx'] / total) * 100}%`,
                          backgroundColor: 'var(--status-warning)',
                          minWidth: stats['4xx'] > 0 ? '30px' : '0'
                        }}
                      >
                        {stats['4xx'] > 0 && stats['4xx']}
                      </div>
                      <div 
                        className="rounded flex items-center justify-center text-xs text-white font-bold"
                        style={{ 
                          width: `${(stats['5xx'] / total) * 100}%`,
                          backgroundColor: 'var(--status-critical)',
                          minWidth: stats['5xx'] > 0 ? '30px' : '0'
                        }}
                      >
                        {stats['5xx'] > 0 && stats['5xx']}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Application Health & Uptime Dashboard */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Application Health & Uptime
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Live ping checks and uptime monitoring
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Monitoring Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {applicationHealth.map((app, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-lg border"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  borderColor: app.status === 'healthy' ? 'var(--status-positive)' : 'var(--status-warning)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const color = app.status === 'healthy' ? 'var(--status-positive)' : 'var(--status-warning)';
                  e.currentTarget.style.boxShadow = `0 12px 24px ${color}30`;
                  e.currentTarget.style.borderColor = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = app.status === 'healthy' ? 'var(--status-positive)' : 'var(--status-warning)';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: app.status === 'healthy' ? 'var(--status-positive)' : 'var(--status-warning)',
                          boxShadow: `0 0 10px ${app.status === 'healthy' ? 'var(--status-positive)' : 'var(--status-warning)'}`
                        }}
                      ></div>
                      <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                        {app.name}
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                        style={{
                          backgroundColor: app.status === 'healthy' ? 'var(--status-positive-bg)' : 'var(--status-warning-bg)',
                          color: app.status === 'healthy' ? 'var(--status-positive-text)' : 'var(--status-warning-text)'
                        }}
                      >
                        {app.status}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        Last check: {app.lastCheck}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Uptime</div>
                        <div className="text-2xl font-bold" style={{ 
                          color: app.uptime >= 99.9 ? 'var(--status-positive)' : 
                                 app.uptime >= 99.0 ? 'var(--status-warning)' : 'var(--status-critical)' 
                        }}>
                          {app.uptime}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Response Time</div>
                        <div className="text-2xl font-bold" style={{ 
                          color: app.responseTime < 100 ? 'var(--status-positive)' : 
                                 app.responseTime < 300 ? 'var(--status-warning)' : 'var(--status-critical)' 
                        }}>
                          {app.responseTime}ms
                        </div>
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Ping Success</div>
                        <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                          {app.pingSuccess}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Status</div>
                        <div className="flex items-center gap-2 text-sm font-semibold" style={{ 
                          color: app.status === 'healthy' ? 'var(--status-positive)' : 'var(--status-warning)' 
                        }}>
                          {app.status === 'healthy' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                          {app.status === 'healthy' ? 'Healthy' : 'Degraded'}
                        </div>
                      </div>
                    </div>

                    {/* Uptime Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span>Last 30 days uptime</span>
                        <span>{app.uptime}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-default)' }}>
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${app.uptime}%`,
                            backgroundColor: app.uptime >= 99.9 ? 'var(--status-positive)' : 
                                           app.uptime >= 99.0 ? 'var(--status-warning)' : 'var(--status-critical)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Rate Line Chart */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Activity className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                Request Rate Over Time
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                HTTP requests per minute (last hour)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Total Requests</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-critical)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Error Requests</span>
              </div>
            </div>
          </div>
          
          {/* Line Chart Area */}
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs" style={{ color: 'var(--text-muted)', width: '45px' }}>
              <span>5000</span>
              <span>4000</span>
              <span>3000</span>
              <span>2000</span>
              <span>1000</span>
              <span>0</span>
            </div>
            
            {/* Chart container */}
            <div className="absolute left-12 right-0 top-0 bottom-8">
              <svg className="w-full h-full" style={{ overflow: 'visible' }}>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="0%"
                    y1={`${i * 20}%`}
                    x2="100%"
                    y2={`${i * 20}%`}
                    stroke="var(--border-subtle)"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
                
                {/* Success requests line */}
                <polyline
                  points="0,80 8.33,75 16.66,70 25,60 33.33,55 41.66,50 50,45 58.33,40 66.66,38 75,35 83.33,33 91.66,30 100,28"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(124, 58, 237, 0.4))' }}
                />
                
                {/* Gradient fill under line */}
                <defs>
                  <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,80 8.33,75 16.66,70 25,60 33.33,55 41.66,50 50,45 58.33,40 66.66,38 75,35 83.33,33 91.66,30 100,28 100,100 0,100"
                  fill="url(#successGradient)"
                />
                
                {/* Error requests line */}
                <polyline
                  points="0,95 8.33,94 16.66,96 25,93 33.33,95 41.66,92 50,94 58.33,91 66.66,93 75,90 83.33,92 91.66,89 100,91"
                  fill="none"
                  stroke="var(--status-critical)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                
                {/* Data points (circles) */}
                {[0, 8.33, 16.66, 25, 33.33, 41.66, 50, 58.33, 66.66, 75, 83.33, 91.66, 100].map((x, i) => {
                  const yValues = [80, 75, 70, 60, 55, 50, 45, 40, 38, 35, 33, 30, 28];
                  return (
                    <circle
                      key={i}
                      cx={`${x}%`}
                      cy={`${yValues[i]}%`}
                      r="4"
                      fill="var(--accent-primary)"
                      className="cursor-pointer transition-all duration-300 hover:r-6"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(124, 58, 237, 0.5))' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.setAttribute('r', '6');
                        e.currentTarget.style.fill = 'var(--accent-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.setAttribute('r', '4');
                        e.currentTarget.style.fill = 'var(--accent-primary)';
                      }}
                    >
                      <title>{`${4800 - i * 200} requests`}</title>
                    </circle>
                  );
                })}
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute left-12 right-0 bottom-0 flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>12:00</span>
              <span>12:15</span>
              <span>12:30</span>
              <span>12:45</span>
              <span>13:00</span>
            </div>
          </div>
          
          {/* Stats below chart */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Avg Requests/min</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>2,840</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Peak</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>4,800</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Success Rate</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--status-positive)' }}>99.8%</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Avg Latency</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>124ms</p>
            </div>
          </div>
        </div>

        {/* Response Time Distribution */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Clock className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                Response Time Distribution
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Latency buckets (ms)
              </p>
            </div>
          </div>
          
          {/* Histogram */}
          <div className="relative h-48">
            <div className="flex items-end justify-between h-full gap-2">
              {[
                { label: '0-50', value: 4200, color: 'var(--status-positive)' },
                { label: '50-100', value: 3800, color: 'var(--status-info)' },
                { label: '100-200', value: 2100, color: 'var(--accent-primary)' },
                { label: '200-500', value: 890, color: 'var(--status-warning)' },
                { label: '500-1000', value: 340, color: 'var(--status-critical)' },
                { label: '1000+', value: 120, color: '#dc2626' }
              ].map((bucket, idx) => {
                const maxValue = 4200;
                const heightPercent = (bucket.value / maxValue) * 100;
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group">
                    <div 
                      className="w-full rounded-t-lg transition-all duration-300 cursor-pointer relative flex items-end justify-center pb-2"
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: bucket.color,
                        minHeight: '8px',
                        opacity: 0.8
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'scaleY(1.05)';
                        e.currentTarget.style.filter = 'brightness(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.8';
                        e.currentTarget.style.transform = 'scaleY(1)';
                        e.currentTarget.style.filter = 'brightness(1)';
                      }}
                    >
                      <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'white' }}>
                        {bucket.value.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>
                      {bucket.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Percentile Stats */}
          <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>p50</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>45ms</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>p75</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>82ms</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>p90</p>
              <p className="text-lg font-bold" style={{ color: 'var(--status-info)' }}>124ms</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>p95</p>
              <p className="text-lg font-bold" style={{ color: 'var(--status-warning)' }}>245ms</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>p99</p>
              <p className="text-lg font-bold" style={{ color: 'var(--status-critical)' }}>520ms</p>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
