'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Bell,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCircle,
  Clock,
  Settings,
  Filter
} from 'lucide-react';

export default function NotificationsPage() {
  const channels = [
    {
      name: 'Slack',
      type: 'slack',
      status: 'Active',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500',
      sent: '342',
      delivered: '342'
    },
    {
      name: 'Email',
      type: 'email',
      status: 'Active',
      icon: Mail,
      color: 'from-blue-500 to-cyan-500',
      sent: '156',
      delivered: '154'
    },
    {
      name: 'PagerDuty',
      type: 'pagerduty',
      status: 'Active',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500',
      sent: '89',
      delivered: '89'
    },
  ];

  const rules = [
    {
      name: 'Critical Database Issues',
      trigger: 'Severity: Critical, Source: Database',
      channels: ['Slack', 'PagerDuty', 'Email'],
      active: true
    },
    {
      name: 'API Performance Degradation',
      trigger: 'Response time > 500ms for 2 mins',
      channels: ['Slack', 'Email'],
      active: true
    },
    {
      name: 'Memory Leak Detection',
      trigger: 'Memory usage > 85%',
      channels: ['Slack', 'PagerDuty'],
      active: true
    },
    {
      name: 'Payment Processing Errors',
      trigger: 'Service: payment-service, Type: error',
      channels: ['Slack', 'PagerDuty', 'Email'],
      active: true
    },
    {
      name: 'Cache Performance Issues',
      trigger: 'Redis latency > 100ms',
      channels: ['Slack'],
      active: false
    },
  ];

  const recentNotifications = [
    {
      title: 'Database latency spike detected',
      message: 'PostgreSQL query time increased by 340%',
      channel: 'Slack',
      time: '2 mins ago',
      status: 'Delivered'
    },
    {
      title: 'User service restarted successfully',
      message: 'Memory leak resolved, pod restarted',
      channel: 'Email',
      time: '8 mins ago',
      status: 'Delivered'
    },
    {
      title: 'Critical: Payment API timeout',
      message: 'Payment processing endpoint not responding',
      channel: 'PagerDuty',
      time: '15 mins ago',
      status: 'Delivered'
    },
    {
      title: 'Redis cache connection restored',
      message: 'Cache performance back to normal',
      channel: 'Slack',
      time: '24 mins ago',
      status: 'Delivered'
    },
    {
      title: 'API rate limit threshold reached',
      message: 'Rate limit at 85% for external-api service',
      channel: 'Email',
      time: '42 mins ago',
      status: 'Delivered'
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Configure alerts and notification channels</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              Create Rule
            </button>
          </div>

          {/* Channel Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((channel, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center`}>
                    <channel.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {channel.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{channel.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Sent Today</p>
                    <p className="text-2xl font-bold text-gray-900">{channel.sent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-gray-900">{channel.delivered}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notification Rules */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Notification Rules</h2>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
            <div className="space-y-3">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        rule.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {rule.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rule.trigger}</p>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <div className="flex gap-2">
                        {rule.channels.map((channel, cIdx) => (
                          <span key={cIdx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Notifications</h2>
            <div className="space-y-3">
              {recentNotifications.map((notif, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Bell className="w-4 h-4 text-purple-500" />
                      <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.time}
                      </span>
                      <span className="text-xs text-gray-500">via {notif.channel}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {notif.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Stats */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                <Bell className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">587</p>
                <p className="text-sm text-gray-600 mt-1">Total Sent Today</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">99.7%</p>
                <p className="text-sm text-gray-600 mt-1">Delivery Rate</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">0.8s</p>
                <p className="text-sm text-gray-600 mt-1">Avg Delivery Time</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600 mt-1">Active Rules</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
