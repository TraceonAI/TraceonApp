'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Database,
  MessageSquare,
  Activity,
  CheckCircle,
  AlertCircle,
  Settings,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Datadog',
      category: 'Monitoring',
      status: 'Connected',
      icon: Activity,
      color: 'from-purple-500 to-violet-500',
      dataPoints: '1.2M/day',
      lastSync: '2 mins ago'
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      status: 'Connected',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      dataPoints: '845K/day',
      lastSync: '5 mins ago'
    },
    {
      name: 'Slack',
      category: 'Communication',
      status: 'Connected',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500',
      dataPoints: '342 notifications/day',
      lastSync: '1 min ago'
    },
    {
      name: 'PagerDuty',
      category: 'Incident Management',
      status: 'Connected',
      icon: AlertCircle,
      color: 'from-green-500 to-emerald-500',
      dataPoints: '127 alerts/day',
      lastSync: '3 mins ago'
    },
    {
      name: 'MongoDB',
      category: 'Database',
      status: 'Connected',
      icon: Database,
      color: 'from-green-600 to-teal-500',
      dataPoints: '625K/day',
      lastSync: '4 mins ago'
    },
    {
      name: 'Prometheus',
      category: 'Monitoring',
      status: 'Connected',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      dataPoints: '2.1M/day',
      lastSync: '1 min ago'
    },
    {
      name: 'Redis',
      category: 'Cache',
      status: 'Connected',
      icon: Zap,
      color: 'from-red-500 to-orange-500',
      dataPoints: '3.4M/day',
      lastSync: '30 secs ago'
    },
    {
      name: 'Elasticsearch',
      category: 'Logging',
      status: 'Connected',
      icon: Database,
      color: 'from-yellow-500 to-amber-500',
      dataPoints: '1.8M/day',
      lastSync: '2 mins ago'
    },
  ];

  const stats = [
    {
      label: 'Total Integrations',
      value: '8',
      change: '+2 this month',
      icon: Settings,
      color: 'from-purple-500 to-blue-500'
    },
    {
      label: 'Data Points Today',
      value: '10.4M',
      change: '+12% from yesterday',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Connections',
      value: '8/8',
      change: '100% uptime',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Avg Sync Time',
      value: '2.1s',
      change: '-8% faster',
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
              <p className="text-gray-600 mt-1">Manage your connected data sources and tools</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              Add Integration
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium mt-2">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center shadow-lg`}>
                      <integration.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-600">{integration.category}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {integration.status}
                  </span>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Points</span>
                    <span className="text-sm font-medium text-gray-900">{integration.dataPoints}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Sync</span>
                    <span className="text-sm font-medium text-gray-900">{integration.lastSync}</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Configure
                </button>
              </div>
            ))}
          </div>

          {/* Data Flow Overview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Data Flow Overview</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Monitoring Sources</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">3.3M</span>
                <span className="text-sm text-gray-600">events/day</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Database Sources</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">5.3M</span>
                <span className="text-sm text-gray-600">queries/day</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Communication Channels</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">469</span>
                <span className="text-sm text-gray-600">messages/day</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
