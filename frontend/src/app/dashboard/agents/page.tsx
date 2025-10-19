'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Brain, 
  Activity,
  TrendingUp,
  Zap,
  CheckCircle,
  Clock,
  BarChart3,
  Target
} from 'lucide-react';

export default function AIAgentsPage() {
  const agents = [
    {
      name: 'Root Cause Analyzer',
      status: 'Active',
      incidentsProcessed: 45,
      accuracy: '98.2%',
      avgTime: '6.8s',
      icon: Brain,
      color: 'from-purple-500 to-blue-500'
    },
    {
      name: 'Pattern Detector',
      status: 'Active',
      incidentsProcessed: 52,
      accuracy: '96.5%',
      avgTime: '4.2s',
      icon: Target,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Auto-Resolver',
      status: 'Active',
      incidentsProcessed: 42,
      accuracy: '94.1%',
      avgTime: '8.5s',
      icon: Zap,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Notification Router',
      status: 'Active',
      incidentsProcessed: 127,
      accuracy: '99.8%',
      avgTime: '0.8s',
      icon: Activity,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const recentActions = [
    {
      agent: 'Root Cause Analyzer',
      action: 'Identified N+1 query issue in OrderService',
      time: '2 mins ago',
      result: 'Success'
    },
    {
      agent: 'Auto-Resolver',
      action: 'Restarted user-service pod due to memory leak',
      time: '5 mins ago',
      result: 'Success'
    },
    {
      agent: 'Notification Router',
      action: 'Sent Slack alert to @backend-team',
      time: '8 mins ago',
      result: 'Delivered'
    },
    {
      agent: 'Pattern Detector',
      action: 'Detected recurring cache timeout pattern',
      time: '12 mins ago',
      result: 'Investigating'
    },
    {
      agent: 'Root Cause Analyzer',
      action: 'Analyzed database latency spike',
      time: '18 mins ago',
      result: 'Success'
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
            <p className="text-gray-600 mt-1">Monitor and manage your autonomous AI agents</p>
          </div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
                    <agent.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {agent.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{agent.name}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Processed</p>
                    <p className="text-2xl font-bold text-gray-900">{agent.incidentsProcessed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Accuracy</p>
                    <p className="text-2xl font-bold text-gray-900">{agent.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Time</p>
                    <p className="text-2xl font-bold text-gray-900">{agent.avgTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Overview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">266</p>
                <p className="text-sm text-gray-600 mt-1">Total Actions Today</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">97.2%</p>
                <p className="text-sm text-gray-600 mt-1">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">5.1s</p>
                <p className="text-sm text-gray-600 mt-1">Avg Response Time</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">+18%</p>
                <p className="text-sm text-gray-600 mt-1">Efficiency Gain</p>
              </div>
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Agent Actions</h2>
            <div className="space-y-3">
              {recentActions.map((action, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">{action.agent}</span>
                    </div>
                    <p className="text-sm text-gray-900">{action.action}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      action.result === 'Success' || action.result === 'Delivered' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {action.result}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
