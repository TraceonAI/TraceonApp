'use client';

import React from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
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
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Agents</h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Monitor and manage your autonomous AI agents</p>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent, idx) => (
            <div 
              key={idx} 
              className="rounded-2xl p-6 border transition-all hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}
                >
                  <agent.icon className="w-7 h-7 text-white" />
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--status-positive-bg)',
                    color: 'var(--status-positive-text)'
                  }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--status-positive)' }}></div>
                  {agent.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{agent.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Processed</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{agent.incidentsProcessed}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Accuracy</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{agent.accuracy}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Avg Time</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{agent.avgTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Overview */}
        <div 
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div 
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: 'var(--surface-subtle)' }}
            >
              <BarChart3 className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--accent-primary)' }} />
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>266</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Total Actions Today</p>
            </div>
            <div 
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: 'var(--surface-subtle)' }}
            >
              <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--status-positive)' }} />
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>97.2%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Success Rate</p>
            </div>
            <div 
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: 'var(--surface-subtle)' }}
            >
              <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--status-info)' }} />
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>5.1s</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Avg Response Time</p>
            </div>
            <div 
              className="text-center p-4 rounded-xl"
              style={{ backgroundColor: 'var(--surface-subtle)' }}
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--status-warning)' }} />
              <p className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>+18%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Efficiency Gain</p>
            </div>
          </div>
        </div>

        {/* Recent Actions */}
        <div 
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Recent Agent Actions</h2>
          <div className="space-y-3">
            {recentActions.map((action, idx) => (
              <div 
                key={idx} 
                className="flex items-start justify-between p-4 rounded-lg transition-all hover:scale-[1.01]"
                style={{ backgroundColor: 'var(--surface-subtle)' }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{action.agent}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{action.action}</p>
                </div>
                <div className="text-right ml-4">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: action.result === 'Success' || action.result === 'Delivered' 
                        ? 'var(--status-positive-bg)' 
                        : 'var(--status-info-bg)',
                      color: action.result === 'Success' || action.result === 'Delivered' 
                        ? 'var(--status-positive-text)' 
                        : 'var(--status-info-text)'
                    }}
                  >
                    {action.result}
                  </span>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
