'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
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
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Performance insights and trend analysis</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
                <div className="flex items-center gap-1 mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-600" />
                  )}
                  <span className="text-xs font-medium text-green-600">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Incident Trends Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Incident Trends</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Resolved</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {incidentTrends.map((trend, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{trend.month}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{trend.incidents} total</span>
                      <span className="text-green-600">{trend.resolved} resolved</span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-8">
                    <div 
                      className="bg-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(trend.incidents / 350) * 100}%` }}
                    >
                      {trend.incidents}
                    </div>
                    <div 
                      className="bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(trend.resolved / 350) * 100}%` }}
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
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Incident Categories</h2>
              <div className="space-y-4">
                {categoryBreakdown.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                      <span className="text-sm text-gray-600">{cat.count} ({cat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
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
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI Performance Metrics</h2>
              <div className="space-y-4">
                {aiPerformance.map((perf, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">{perf.metric}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{perf.value}</p>
                      <p className="text-xs text-green-600 font-medium">{perf.trend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resolution Time Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resolution Time Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">62%</p>
                <p className="text-sm text-gray-600 mt-1">&lt; 5s</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">23%</p>
                <p className="text-sm text-gray-600 mt-1">5-10s</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">9%</p>
                <p className="text-sm text-gray-600 mt-1">10-30s</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">4%</p>
                <p className="text-sm text-gray-600 mt-1">30-60s</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
                <p className="text-3xl font-bold text-gray-900">2%</p>
                <p className="text-sm text-gray-600 mt-1">&gt; 60s</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
