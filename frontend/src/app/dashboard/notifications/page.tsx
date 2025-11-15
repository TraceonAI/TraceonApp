'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  Filter,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'success' | 'info';
  channel: 'email' | 'slack' | 'pagerduty' | 'webhook';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export default function NotificationsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      channel: 'slack',
      title: 'High CPU Usage Detected',
      message: 'Production server CPU usage exceeded 85% threshold',
      timestamp: '2 minutes ago',
      read: false,
      priority: 'critical'
    },
    {
      id: '2',
      type: 'warning',
      channel: 'email',
      title: 'Database Connection Pool Warning',
      message: 'Connection pool utilization at 75%',
      timestamp: '15 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'success',
      channel: 'slack',
      title: 'Deployment Successful',
      message: 'API v2.4.1 deployed successfully to production',
      timestamp: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'info',
      channel: 'pagerduty',
      title: 'Scheduled Maintenance',
      message: 'Database maintenance window starts in 2 hours',
      timestamp: '3 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'alert',
      channel: 'webhook',
      title: 'API Error Rate Spike',
      message: 'Error rate increased to 3.2% in the last 10 minutes',
      timestamp: '4 hours ago',
      read: false,
      priority: 'high'
    }
  ];

  const stats = [
    { label: 'Unread', value: '23', icon: Bell, color: 'var(--accent-primary)' },
    { label: 'Today', value: '127', icon: CheckCircle, color: 'var(--status-info)' },
    { label: 'Channels', value: '8', icon: MessageSquare, color: 'var(--status-warning)' },
    { label: 'Delivery Rate', value: '99.8%', icon: CheckCircle, color: 'var(--status-positive)' }
  ];

  const channelConfig = {
    email: { icon: Mail, color: 'var(--status-info)', label: 'Email' },
    slack: { icon: MessageSquare, color: '#E01E5A', label: 'Slack' },
    pagerduty: { icon: Smartphone, color: '#06AC38', label: 'PagerDuty' },
    webhook: { icon: Bell, color: 'var(--accent-primary)', label: 'Webhook' }
  };

  const typeConfig = {
    alert: { color: 'var(--status-critical)', bg: 'var(--status-critical-bg)', text: 'var(--status-critical-text)' },
    warning: { color: 'var(--status-warning)', bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
    success: { color: 'var(--status-positive)', bg: 'var(--status-positive-bg)', text: 'var(--status-positive-text)' },
    info: { color: 'var(--status-info)', bg: 'var(--status-info-bg)', text: 'var(--status-info-text)' }
  };

  const priorityConfig = {
    critical: { color: 'var(--status-critical)' },
    high: { color: 'var(--status-warning)' },
    medium: { color: 'var(--status-info)' },
    low: { color: 'var(--text-muted)' }
  };

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Alerts & Notifications
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Manage your multi-channel alerting system
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
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
                if (icon) icon.style.transform = 'scale(1.1) rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <Settings 
                className="w-5 h-5" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              Configure Channels
            </button>
            <button
              className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
              style={{
                backgroundColor: 'var(--button-primary-bg)',
                color: 'var(--button-primary-text)',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
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
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <Bell 
                className="w-5 h-5" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              Create Alert Rule
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--card-border)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  const iconContainer = e.currentTarget.querySelector('.icon-container');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1.1) rotate(12deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  const iconContainer = e.currentTarget.querySelector('.icon-container');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="icon-container w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--surface-subtle)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Channels */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Active Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(channelConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div 
                  key={key}
                  className="p-4 rounded-lg cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--surface-subtle)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                    const icon = e.currentTarget.querySelector('.channel-icon');
                    if (icon) (icon as HTMLElement).style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const icon = e.currentTarget.querySelector('.channel-icon');
                    if (icon) (icon as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon 
                      className="channel-icon w-6 h-6" 
                      style={{ 
                        color: config.color,
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }} 
                    />
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: 'var(--status-positive)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Operational
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
          <div className="flex gap-2">
            {['all', 'alert', 'warning', 'success', 'info'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="px-4 py-2 rounded-lg text-sm font-medium capitalize"
                style={{
                  backgroundColor: selectedType === type ? 'var(--accent-primary)' : 'var(--surface-subtle)',
                  color: selectedType === type ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedType !== type) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const ChannelIcon = channelConfig[notification.channel].icon;
            const typeStyle = typeConfig[notification.type];
            
            return (
              <div
                key={notification.id}
                className="p-6 rounded-xl border cursor-pointer"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: notification.read ? 'var(--card-border)' : 'var(--accent-primary)',
                  borderWidth: notification.read ? '1px' : '2px',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = notification.read 
                    ? '0 8px 16px rgba(124, 58, 237, 0.1)' 
                    : '0 12px 24px rgba(124, 58, 237, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: typeStyle.bg }}
                    >
                      <ChannelIcon className="w-5 h-5" style={{ color: typeStyle.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {notification.title}
                        </h3>
                        <span 
                          className="px-2 py-1 rounded-lg text-xs font-bold uppercase"
                          style={{
                            backgroundColor: typeStyle.bg,
                            color: typeStyle.text
                          }}
                        >
                          {notification.type}
                        </span>
                        <span 
                          className="px-2 py-1 rounded-lg text-xs font-bold uppercase"
                          style={{
                            backgroundColor: 'var(--surface-subtle)',
                            color: priorityConfig[notification.priority].color
                          }}
                        >
                          {notification.priority}
                        </span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1">
                          <ChannelIcon className="w-3 h-3" />
                          {channelConfig[notification.channel].label}
                        </span>
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
