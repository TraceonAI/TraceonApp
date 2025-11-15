'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Copy,
  Star,
  TrendingUp,
  Zap,
  AlertTriangle,
  Users
} from 'lucide-react';

interface Runbook {
  id: string;
  name: string;
  description: string;
  category: string;
  executionTime: string;
  successRate: number;
  lastRun: string;
  steps: number;
  automated: boolean;
  tags: string[];
}

export default function RunbooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const runbooks: Runbook[] = [
    {
      id: 'RB-001',
      name: 'Database Connection Pool Recovery',
      description: 'Automatically recover database connection pool exhaustion issues',
      category: 'Database',
      executionTime: '2m 15s',
      successRate: 98.5,
      lastRun: '2 hours ago',
      steps: 8,
      automated: true,
      tags: ['database', 'recovery', 'critical']
    },
    {
      id: 'RB-002',
      name: 'API Gateway Restart Procedure',
      description: 'Graceful restart of API Gateway with zero downtime',
      category: 'Infrastructure',
      executionTime: '5m 30s',
      successRate: 100,
      lastRun: '1 day ago',
      steps: 12,
      automated: true,
      tags: ['api', 'restart', 'zero-downtime']
    },
    {
      id: 'RB-003',
      name: 'Cache Invalidation and Warmup',
      description: 'Clear cache and pre-warm with frequently accessed data',
      category: 'Performance',
      executionTime: '3m 45s',
      successRate: 96.2,
      lastRun: '6 hours ago',
      steps: 6,
      automated: false,
      tags: ['cache', 'performance', 'optimization']
    },
    {
      id: 'RB-004',
      name: 'Kubernetes Pod Auto-Scaling',
      description: 'Scale pods based on CPU and memory metrics',
      category: 'Scaling',
      executionTime: '1m 20s',
      successRate: 99.1,
      lastRun: '30 minutes ago',
      steps: 5,
      automated: true,
      tags: ['kubernetes', 'scaling', 'auto']
    },
    {
      id: 'RB-005',
      name: 'Log Rotation and Cleanup',
      description: 'Archive old logs and free up disk space',
      category: 'Maintenance',
      executionTime: '4m 10s',
      successRate: 97.8,
      lastRun: '12 hours ago',
      steps: 7,
      automated: true,
      tags: ['logs', 'cleanup', 'maintenance']
    }
  ];

  const stats = [
    { label: 'Total Runbooks', value: '42', icon: BookOpen, color: 'var(--accent-primary)' },
    { label: 'Avg Success Rate', value: '98.3%', icon: CheckCircle, color: 'var(--status-positive)' },
    { label: 'Automated', value: '34', icon: Zap, color: 'var(--status-info)' },
    { label: 'Executions Today', value: '127', icon: TrendingUp, color: 'var(--status-warning)' }
  ];

  const categories = ['All', 'Database', 'Infrastructure', 'Performance', 'Scaling', 'Maintenance', 'Security'];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Runbooks
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Automated procedures and operational playbooks
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
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(124, 58, 237, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            <Plus className="w-5 h-5" />
            Create Runbook
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
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--surface-subtle)' }}
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div 
            className="flex-1 min-w-[300px] flex items-center gap-3 px-4 py-3 rounded-xl border"
            style={{
              backgroundColor: 'var(--input-bg)',
              borderColor: 'var(--input-border)'
            }}
          >
            <Search className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search runbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ color: 'var(--input-text)' }}
            />
          </div>

          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: selectedCategory === category.toLowerCase() 
                    ? 'var(--accent-primary)' 
                    : 'var(--surface-subtle)',
                  color: selectedCategory === category.toLowerCase()
                    ? 'var(--text-inverse)'
                    : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === category.toLowerCase() ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Runbooks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {runbooks.map((runbook) => (
            <div
              key={runbook.id}
              className="p-6 rounded-xl border cursor-pointer group"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--card-border)';
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                    >
                      <BookOpen className="w-5 h-5" style={{ color: 'var(--text-inverse)' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:underline" style={{ color: 'var(--text-primary)' }}>
                        {runbook.name}
                      </h3>
                      <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                        {runbook.id}
                      </p>
                    </div>
                    {runbook.automated && (
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                        style={{
                          backgroundColor: 'var(--status-info-bg)',
                          color: 'var(--status-info-text)'
                        }}
                      >
                        <Zap className="w-3 h-3" />
                        Auto
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {runbook.description}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Success Rate</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold" style={{ color: 'var(--status-positive)' }}>
                      {runbook.successRate}%
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Avg Time</p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {runbook.executionTime}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Steps</p>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                    {runbook.steps}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {runbook.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--button-primary-bg)',
                    color: 'var(--button-primary-text)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                >
                  <Play className="w-4 h-4" />
                  Execute
                </button>
                <button
                  className="px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-secondary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-secondary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                  }}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <Star className="w-4 h-4" />
                </button>
              </div>

              {/* Last Run */}
              <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                <span>Last run: {runbook.lastRun}</span>
                <span className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                  {runbook.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
