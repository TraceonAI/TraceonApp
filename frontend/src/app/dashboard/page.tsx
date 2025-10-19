'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
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
  ArrowDown
} from 'lucide-react';

export default function Dashboard() {
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

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your systems today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-600" />
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Incidents</h2>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-4 ${
                      incident.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-gray-500">{incident.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              incident.status === 'Resolved' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {incident.status}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mt-1">{incident.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                            <Brain className="w-4 h-4 text-purple-500" />
                            {incident.aiAction}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{incident.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI Agent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Root Cause Analysis</p>
                    <p className="text-xs text-gray-500">45 incidents analyzed today</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Auto-Resolved</p>
                    <p className="text-xs text-gray-500">42 incidents without intervention</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Notifications Sent</p>
                    <p className="text-xs text-gray-500">127 alerts to teams</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Data Sources</p>
                    <p className="text-xs text-gray-500">15 integrations active</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-900 mb-2">Average Response Time</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">8.2s</p>
                <p className="text-xs text-gray-600 mt-1">2.1s faster than last week</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
              <Zap className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg">Create Incident</h3>
              <p className="text-sm text-purple-100 mt-1">Manually log a new incident</p>
            </button>
            <button className="bg-white border-2 border-purple-200 text-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-left">
              <BarChart3 className="w-8 h-8 mb-3 text-purple-600" />
              <h3 className="font-bold text-lg">View Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Deep dive into performance metrics</p>
            </button>
            <button className="bg-white border-2 border-purple-200 text-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-left">
              <Target className="w-8 h-8 mb-3 text-purple-600" />
              <h3 className="font-bold text-lg">Configure Alerts</h3>
              <p className="text-sm text-gray-600 mt-1">Set up notification rules</p>
            </button>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
