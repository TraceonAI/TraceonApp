'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  FileBarChart,
  Download,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  frequency: string;
  lastGenerated: string;
  format: string;
  size: string;
}

export default function ReportsPage() {
  const reports: Report[] = [
    {
      id: 'RPT-001',
      name: 'Weekly Incident Summary',
      type: 'Incidents',
      frequency: 'Weekly',
      lastGenerated: '2 hours ago',
      format: 'PDF',
      size: '2.4 MB'
    },
    {
      id: 'RPT-002',
      name: 'Monthly Performance Metrics',
      type: 'Performance',
      frequency: 'Monthly',
      lastGenerated: '3 days ago',
      format: 'Excel',
      size: '5.8 MB'
    },
    {
      id: 'RPT-003',
      name: 'Daily Operations Dashboard',
      type: 'Operations',
      frequency: 'Daily',
      lastGenerated: '1 hour ago',
      format: 'PDF',
      size: '1.2 MB'
    },
    {
      id: 'RPT-004',
      name: 'Quarterly Business Review',
      type: 'Executive',
      frequency: 'Quarterly',
      lastGenerated: '2 weeks ago',
      format: 'PowerPoint',
      size: '12.3 MB'
    }
  ];

  const stats = [
    { label: 'Total Reports', value: '156', icon: FileBarChart, color: 'var(--accent-primary)' },
    { label: 'Generated Today', value: '12', icon: Clock, color: 'var(--status-info)' },
    { label: 'Scheduled', value: '24', icon: Calendar, color: 'var(--status-warning)' },
    { label: 'Downloads', value: '842', icon: Download, color: 'var(--status-positive)' }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Reports & Analytics
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Generate and download operational reports
            </p>
          </div>
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
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(124, 58, 237, 0.4)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.15) rotate(-5deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <FileBarChart className="w-5 h-5" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
            Create Report
          </button>
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

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 rounded-xl border cursor-pointer group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.12)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                const icon = e.currentTarget.querySelector('.report-icon');
                if (icon) (icon as HTMLElement).style.transform = 'rotate(-5deg) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--card-border)';
                const icon = e.currentTarget.querySelector('.report-icon');
                if (icon) (icon as HTMLElement).style.transform = 'rotate(0deg) scale(1)';
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    className="report-icon w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--accent-primary)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <FileBarChart className="w-6 h-6" style={{ color: 'var(--text-inverse)' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold group-hover:underline mb-1" style={{ color: 'var(--text-primary)' }}>
                      {report.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {report.frequency}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Last: {report.lastGenerated}
                      </span>
                      <span 
                        className="px-2 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: 'var(--surface-subtle)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {report.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {report.format}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {report.size}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                    style={{
                      backgroundColor: 'var(--button-primary-bg)',
                      color: 'var(--button-primary-text)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.3)';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as unknown as HTMLElement).style.transform = 'translateY(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) (icon as unknown as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <Download className="w-4 h-4" style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Insights */}
        <div 
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Quick Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: 'var(--surface-subtle)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(34, 197, 94, 0.2)';
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.15) rotate(12deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--status-positive)', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Uptime This Month
                </h3>
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--status-positive)' }}>
                99.97%
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                +0.05% from last month
              </p>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: 'var(--surface-subtle)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.15) rotate(12deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5" style={{ color: 'var(--status-info)', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Avg Response Time
                </h3>
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--status-info)' }}>
                124ms
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                -18ms from last month
              </p>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: 'var(--surface-subtle)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(251, 146, 60, 0.2)';
                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1.15) rotate(12deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) (icon as unknown as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" style={{ color: 'var(--status-warning)', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Total Requests
                </h3>
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--status-warning)' }}>
                124M
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                +12% from last month
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
