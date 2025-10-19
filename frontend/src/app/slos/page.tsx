'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Bell,
  Search,
  Settings,
  User,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Plus,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  BarChart3,
  Calendar,
  ChevronRight,
  Gauge,
  Zap,
  Server,
  Hexagon
} from 'lucide-react';

// Mock SLO data
const slos = [
  {
    id: 'SLO-001',
    name: 'API Availability',
    description: 'Percentage of successful API requests over total requests',
    target: 99.9,
    current: 99.97,
    status: 'healthy',
    errorBudget: {
      remaining: 78.5,
      consumed: 21.5,
      totalMinutes: 43.8
    },
    service: 'api-gateway',
    timeWindow: '30d',
    alerts: 2,
    history: [99.95, 99.97, 99.89, 99.98, 99.97, 99.96, 99.97]
  },
  {
    id: 'SLO-002', 
    name: 'Response Time P95',
    description: '95th percentile response time for all API endpoints',
    target: 200,
    current: 145,
    status: 'healthy',
    errorBudget: {
      remaining: 65.2,
      consumed: 34.8,
      totalMinutes: 87.6
    },
    service: 'api-gateway',
    timeWindow: '30d',
    alerts: 1,
    history: [167, 145, 189, 156, 145, 138, 145]
  },
  {
    id: 'SLO-003',
    name: 'Database Query Performance',
    description: 'Average database query response time',
    target: 50,
    current: 32,
    status: 'healthy',
    errorBudget: {
      remaining: 89.3,
      consumed: 10.7,
      totalMinutes: 15.2
    },
    service: 'database',
    timeWindow: '30d',
    alerts: 0,
    history: [35, 32, 38, 31, 32, 29, 32]
  },
  {
    id: 'SLO-004',
    name: 'Payment Success Rate',
    description: 'Percentage of successful payment transactions',
    target: 99.5,
    current: 98.9,
    status: 'at-risk',
    errorBudget: {
      remaining: 12.4,
      consumed: 87.6,
      totalMinutes: 156.7
    },
    service: 'payment-service',
    timeWindow: '30d',
    alerts: 3,
    history: [99.1, 98.9, 98.7, 99.2, 98.9, 98.8, 98.9]
  },
  {
    id: 'SLO-005',
    name: 'Cache Hit Rate',
    description: 'Percentage of cache hits over total cache requests',
    target: 95.0,
    current: 92.3,
    status: 'breached',
    errorBudget: {
      remaining: 0,
      consumed: 100,
      totalMinutes: 210.4
    },
    service: 'cache-service',
    timeWindow: '30d',
    alerts: 5,
    history: [94.2, 92.3, 91.8, 93.1, 92.3, 91.9, 92.3]
  }
];

const sloStats = {
  total: 12,
  healthy: 8,
  atRisk: 2,
  breached: 2,
  averageCompliance: 96.8
};

const statusColors: Record<string, string> = {
  healthy: 'var(--green)',
  'at-risk': 'var(--orange)', 
  breached: 'var(--salmon)'
};

export default function SLOs() {
  const [selectedSLO, setSelectedSLO] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');

  const filteredSLOs = slos.filter(slo => {
    const statusMatch = filterStatus === 'all' || slo.status === filterStatus;
    const serviceMatch = filterService === 'all' || slo.service === filterService;
    return statusMatch && serviceMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" style={{ color: 'var(--green)' }} />;
      case 'at-risk': return <AlertTriangle className="w-4 h-4" style={{ color: 'var(--orange)' }} />;
      case 'breached': return <AlertTriangle className="w-4 h-4" style={{ color: 'var(--salmon)' }} />;
      default: return <Activity className="w-4 h-4" style={{ color: 'var(--blue)' }} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-primary)' }}>
      {/* Top Navigation */}
      <nav className="nav-sticky border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-full px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/landing" className="flex items-center space-x-3">
                <div className="relative">
                  <Hexagon className="w-8 h-8" style={{ color: 'var(--teal)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-4 h-4" style={{ color: 'var(--background-primary)' }} />
                  </div>
                </div>
                <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>TraceonAI</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                {[
                  { name: 'Dashboard', href: '/dashboard' },
                  { name: 'Monitoring', href: '/monitoring' },
                  { name: 'Incidents', href: '/incidents' },
                  { name: 'SLOs', href: '/slos' },
                  { name: 'Infrastructure', href: '/infrastructure' }
                ].map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      item.name === 'SLOs' ? 'text-white' : 'hover:text-white'
                    }`}
                    style={{ color: item.name === 'SLOs' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                <input 
                  type="text"
                  placeholder="Search SLOs..."
                  className="pl-10 pr-4 py-2 rounded-lg text-sm border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                  style={{ 
                    backgroundColor: 'var(--background-card)', 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="relative">
                <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800">
                  <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--orange)' }}></div>
                </button>
              </div>

              <Link href="/settings">
                <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800">
                  <Settings className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </Link>

              <button className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--teal)' }}>
                  <User className="w-4 h-4" style={{ color: 'var(--background-primary)' }} />
                </div>
                <span className="text-sm font-medium hidden md:block" style={{ color: 'var(--text-primary)' }}>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-full mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Service Level Objectives
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Monitor and manage SLOs to ensure reliable service delivery
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="btn-primary text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create SLO
              </button>
              
              <button className="btn-secondary text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total SLOs', value: sloStats.total, color: 'var(--text-primary)' },
              { label: 'Healthy', value: sloStats.healthy, color: 'var(--green)' },
              { label: 'At Risk', value: sloStats.atRisk, color: 'var(--orange)' },
              { label: 'Breached', value: sloStats.breached, color: 'var(--salmon)' },
              { label: 'Avg Compliance', value: `${sloStats.averageCompliance}%`, color: 'var(--teal)' }
            ].map((stat, index) => (
              <div key={index} className="card-primary p-4">
                <p className="text-lg font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--background-card)' }}>
            <Filter className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm border transition-colors duration-300 focus:outline-none"
              style={{ 
                backgroundColor: 'var(--background-surface)', 
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="at-risk">At Risk</option>
              <option value="breached">Breached</option>
            </select>
            
            <select 
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm border transition-colors duration-300 focus:outline-none"
              style={{ 
                backgroundColor: 'var(--background-surface)', 
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="all">All Services</option>
              <option value="api-gateway">API Gateway</option>
              <option value="database">Database</option>
              <option value="payment-service">Payment Service</option>
              <option value="cache-service">Cache Service</option>
            </select>
          </div>

          {/* SLOs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSLOs.map((slo) => (
              <div key={slo.id} className="card-primary p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--background-surface)' }}>
                      <Target className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {slo.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {slo.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(slo.status)}
                    <span className="text-xs font-medium capitalize" style={{ color: statusColors[slo.status] }}>
                      {slo.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Current vs Target */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Current</p>
                    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {slo.name.includes('Time') ? `${slo.current}ms` : `${slo.current}%`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Target</p>
                    <p className="text-xl font-bold" style={{ color: 'var(--text-secondary)' }}>
                      {slo.name.includes('Time') ? `<${slo.target}ms` : `${slo.target}%`}
                    </p>
                  </div>
                </div>

                {/* Error Budget */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Error Budget</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {slo.errorBudget.remaining.toFixed(1)}% remaining
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--background-surface)' }}>
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        backgroundColor: slo.errorBudget.remaining > 50 ? 'var(--green)' :
                                       slo.errorBudget.remaining > 20 ? 'var(--orange)' : 'var(--salmon)',
                        width: `${slo.errorBudget.remaining}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    <span>{slo.errorBudget.totalMinutes.toFixed(1)} min budget</span>
                    <span>{slo.timeWindow} window</span>
                  </div>
                </div>

                {/* Service Info and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{slo.service}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{slo.alerts} alerts</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <Eye className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <Edit className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <BarChart3 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-end gap-1 h-8">
                    {slo.history.map((point, i) => (
                      <div 
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ 
                          backgroundColor: 'var(--teal)' + '40',
                          height: `${(point / Math.max(...slo.history)) * 100}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-tertiary)' }}>
                    Last 7 days trend
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
