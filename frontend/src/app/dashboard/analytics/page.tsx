'use client';

import React from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Target
} from 'lucide-react';

export default function AnalyticsPage() {
  const metrics = [
    {
      label: 'Total Incidents',
      value: '247',
      change: '-12%',
      trend: 'down',
      icon: Activity,
      color: 'from-purple-500 to-blue-500'
    },
    {
      label: 'Auto-Resolved',
      value: '94.2%',
      change: '+3.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Avg Resolution Time',
      value: '8.2s',
      change: '-15%',
      trend: 'up',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Critical Incidents',
      value: '3',
      change: '-40%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const incidentTrends = [
    { month: 'Jan', incidents: 312, resolved: 289 },
    { month: 'Feb', incidents: 285, resolved: 268 },
    { month: 'Mar', incidents: 298, resolved: 281 },
    { month: 'Apr', incidents: 247, resolved: 233 },
  ];

  const categoryBreakdown = [
    { category: 'Database', count: 89, percentage: 36, color: 'bg-purple-500' },
    { category: 'API', count: 67, percentage: 27, color: 'bg-blue-500' },
    { category: 'Infrastructure', count: 52, percentage: 21, color: 'bg-green-500' },
    { category: 'Cache', count: 24, percentage: 10, color: 'bg-orange-500' },
    { category: 'Other', count: 15, percentage: 6, color: 'bg-gray-400' },
  ];

  const aiPerformance = [
    { metric: 'Root Cause Accuracy', value: '98.2%', trend: '+2.1%' },
    { metric: 'Pattern Detection Rate', value: '96.5%', trend: '+1.8%' },
    { metric: 'Auto-Resolution Success', value: '94.1%', trend: '+3.2%' },
    { metric: 'False Positive Rate', value: '1.8%', trend: '-0.5%' },
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Analytics</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Performance insights and trend analysis</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg hover:border-opacity-80"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{metric.value}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{metric.label}</p>
              <div className="flex items-center gap-1 mt-2">
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--status-positive)' }} />
                ) : (
                  <TrendingDown className="w-4 h-4" style={{ color: 'var(--status-positive)' }} />
                )}
                <span className="text-xs font-medium" style={{ color: 'var(--status-positive)' }}>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Incident Trends Chart */}
        <div 
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Incident Trends</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-positive)' }}></div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Resolved</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {incidentTrends.map((trend, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{trend.month}</span>
                  <div className="flex items-center gap-4">
                    <span style={{ color: 'var(--text-secondary)' }}>{trend.incidents} total</span>
                    <span style={{ color: 'var(--status-positive)' }}>{trend.resolved} resolved</span>
                  </div>
                </div>
                <div className="flex gap-1 h-8">
                  <div 
                    className="rounded-lg flex items-center justify-center text-white text-xs font-medium"
                    style={{ 
                      width: `${(trend.incidents / 350) * 100}%`,
                      backgroundColor: 'var(--accent-primary)'
                    }}
                  >
                    {trend.incidents}
                  </div>
                  <div 
                    className="rounded-lg flex items-center justify-center text-white text-xs font-medium"
                    style={{ 
                      width: `${(trend.resolved / 350) * 100}%`,
                      backgroundColor: 'var(--status-positive)'
                    }}
                  >
                    {trend.resolved}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <div 
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)'
            }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Incident Categories</h2>
            <div className="space-y-4">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{cat.category}</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cat.count} ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                    <div 
                      className={`${cat.color} h-2 rounded-full transition-all`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Performance */}
          <div 
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)'
            }}
          >
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>AI Performance Metrics</h2>
            <div className="space-y-4">
              {aiPerformance.map((perf, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--surface-subtle)' }}
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{perf.metric}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{perf.value}</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--status-positive)' }}>{perf.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resolution Time Distribution */}
        <div 
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Resolution Time Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-subtle)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>62%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>&lt; 5s</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-subtle)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>23%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>5-10s</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-subtle)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>9%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>10-30s</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-subtle)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>4%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>30-60s</p>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-subtle)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>2%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>&gt; 60s</p>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
