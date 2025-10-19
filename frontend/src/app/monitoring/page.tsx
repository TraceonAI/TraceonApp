'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Brain,
  Bell,
  Search,
  Settings,
  User,
  Activity,
  TrendingUp,
  TrendingDown,
  Server,
  Database,
  Network,
  Cpu,
  HardDrive,
  Monitor,
  Gauge,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw,
  Filter,
  Calendar,
  Download,
  Eye,
  Play,
  Pause,
  ChevronRight,
  Hexagon
} from 'lucide-react';

// Mock monitoring data
const systemHealth = {
  overall: 98.7,
  services: [
    { name: 'API Gateway', health: 99.2, status: 'healthy', latency: '45ms', throughput: '2.1K/s' },
    { name: 'User Service', health: 97.8, status: 'warning', latency: '120ms', throughput: '850/s' },
    { name: 'Payment Service', health: 99.9, status: 'healthy', latency: '28ms', throughput: '1.2K/s' },
    { name: 'Database', health: 99.5, status: 'healthy', latency: '12ms', throughput: '5.8K/s' },
    { name: 'Cache Layer', health: 96.2, status: 'warning', latency: '8ms', throughput: '3.2K/s' },
    { name: 'Message Queue', health: 98.9, status: 'healthy', latency: '15ms', throughput: '890/s' }
  ]
};

const metrics = [
  { name: 'CPU Usage', value: '68%', trend: 'up', color: 'var(--orange)', data: [45, 52, 68, 71, 65, 58, 68] },
  { name: 'Memory Usage', value: '72%', trend: 'stable', color: 'var(--blue)', data: [70, 72, 71, 73, 72, 71, 72] },
  { name: 'Disk I/O', value: '34%', trend: 'down', color: 'var(--green)', data: [42, 38, 35, 34, 36, 33, 34] },
  { name: 'Network', value: '1.2GB/s', trend: 'up', color: 'var(--teal)', data: [0.8, 0.9, 1.1, 1.2, 1.0, 1.1, 1.2] }
];

const alerts = [
  { id: 1, level: 'warning', message: 'High CPU usage on node-3', service: 'compute-cluster', time: '2m ago' },
  { id: 2, level: 'info', message: 'Cache hit rate below optimal', service: 'redis-cluster', time: '5m ago' },
  { id: 3, level: 'error', message: 'Database connection timeout', service: 'postgres-primary', time: '8m ago' },
  { id: 4, level: 'info', message: 'Auto-scaling triggered', service: 'kubernetes', time: '12m ago' }
];

const infrastructureNodes = [
  { name: 'prod-web-01', cpu: 45, memory: 68, disk: 23, status: 'healthy', region: 'us-east-1' },
  { name: 'prod-web-02', cpu: 52, memory: 71, disk: 28, status: 'healthy', region: 'us-east-1' },
  { name: 'prod-api-01', cpu: 78, memory: 82, disk: 45, status: 'warning', region: 'us-west-2' },
  { name: 'prod-db-01', cpu: 34, memory: 56, disk: 67, status: 'healthy', region: 'us-east-1' },
  { name: 'prod-cache-01', cpu: 23, memory: 45, disk: 12, status: 'healthy', region: 'us-west-2' },
  { name: 'prod-queue-01', cpu: 67, memory: 74, disk: 34, status: 'warning', region: 'eu-west-1' }
];

export default function Monitoring() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [isRealTime, setIsRealTime] = useState(true);

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
                      item.name === 'Monitoring' ? 'text-white' : 'hover:text-white'
                    }`}
                    style={{ color: item.name === 'Monitoring' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
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
                  placeholder="Search metrics, services..."
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
                System Monitoring
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Real-time performance metrics and system health monitoring
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsRealTime(!isRealTime)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors duration-300 flex items-center gap-2 ${
                  isRealTime ? 'bg-green-400/20 border-green-400/30 text-green-400' : ''
                }`}
                style={{ 
                  backgroundColor: isRealTime ? 'var(--green)' + '20' : 'var(--background-card)',
                  borderColor: isRealTime ? 'var(--green)' + '30' : 'var(--border)',
                  color: isRealTime ? 'var(--green)' : 'var(--text-primary)'
                }}
              >
                {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRealTime ? 'Live' : 'Paused'}
              </button>
              
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                style={{ 
                  backgroundColor: 'var(--background-card)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="5m">Last 5 minutes</option>
                <option value="1h">Last Hour</option>
                <option value="6h">Last 6 Hours</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
              
              <button className="btn-secondary text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* System Health Overview */}
          <div className="card-primary p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>System Health Overview</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-lg font-bold" style={{ color: 'var(--green)' }}>{systemHealth.overall}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemHealth.services.map((service, index) => (
                <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background-surface)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{service.name}</h4>
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'healthy' ? 'bg-green-400' :
                      service.status === 'warning' ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Health</span>
                      <span style={{ color: 'var(--text-primary)' }}>{service.health}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Latency</span>
                      <span style={{ color: 'var(--text-primary)' }}>{service.latency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Throughput</span>
                      <span style={{ color: 'var(--text-primary)' }}>{service.throughput}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="card-primary p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--background-surface)' }}>
                    {index === 0 && <Cpu className="w-5 h-5" style={{ color: metric.color }} />}
                    {index === 1 && <HardDrive className="w-5 h-5" style={{ color: metric.color }} />}
                    {index === 2 && <Database className="w-5 h-5" style={{ color: metric.color }} />}
                    {index === 3 && <Network className="w-5 h-5" style={{ color: metric.color }} />}
                  </div>
                  <div className="flex items-center gap-1">
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4" style={{ color: 'var(--orange)' }} />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4" style={{ color: 'var(--green)' }} />}
                    {metric.trend === 'stable' && <Activity className="w-4 h-4" style={{ color: 'var(--blue)' }} />}
                  </div>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{metric.value}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{metric.name}</p>
                </div>
                {/* Simple chart representation */}
                <div className="flex items-end gap-1 h-8">
                  {metric.data.map((point, i) => (
                    <div 
                      key={i}
                      className="flex-1 rounded-t"
                      style={{ 
                        backgroundColor: metric.color + '40',
                        height: `${(point / Math.max(...metric.data)) * 100}%`,
                        minHeight: '4px'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Infrastructure Nodes */}
            <div className="lg:col-span-2">
              <div className="card-primary p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Infrastructure Nodes</h3>
                  <button className="btn-secondary text-sm">View All</button>
                </div>
                
                <div className="space-y-4">
                  {infrastructureNodes.map((node, index) => (
                    <div key={index} className="p-4 rounded-lg border transition-colors duration-300 hover:bg-gray-800/50" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            node.status === 'healthy' ? 'bg-green-400' :
                            node.status === 'warning' ? 'bg-orange-400' : 'bg-red-400'
                          }`}></div>
                          <div>
                            <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{node.name}</h4>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{node.region}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <p style={{ color: 'var(--text-tertiary)' }}>CPU</p>
                            <p style={{ color: 'var(--text-primary)' }}>{node.cpu}%</p>
                          </div>
                          <div className="text-center">
                            <p style={{ color: 'var(--text-tertiary)' }}>MEM</p>
                            <p style={{ color: 'var(--text-primary)' }}>{node.memory}%</p>
                          </div>
                          <div className="text-center">
                            <p style={{ color: 'var(--text-tertiary)' }}>DISK</p>
                            <p style={{ color: 'var(--text-primary)' }}>{node.disk}%</p>
                          </div>
                          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Alerts */}
              <div className="card-primary p-6">
                <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Recent Alerts</h3>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        alert.level === 'error' ? 'bg-red-400' :
                        alert.level === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{alert.time}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{
                            backgroundColor: alert.level === 'error' ? 'var(--salmon)' + '20' :
                                           alert.level === 'warning' ? 'var(--orange)' + '20' : 'var(--blue)' + '20',
                            color: alert.level === 'error' ? 'var(--salmon)' :
                                   alert.level === 'warning' ? 'var(--orange)' : 'var(--blue)'
                          }}>
                            {alert.level}
                          </span>
                        </div>
                        <p className="text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{alert.message}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{alert.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-primary p-6">
                <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { icon: BarChart3, label: 'Create Dashboard', color: 'var(--blue)' },
                    { icon: Bell, label: 'Configure Alerts', color: 'var(--orange)' },
                    { icon: Download, label: 'Export Metrics', color: 'var(--teal)' },
                    { icon: Eye, label: 'View Logs', color: 'var(--magenta)' }
                  ].map((action, index) => (
                    <button key={index} className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 hover:bg-gray-800/50 text-left">
                      <action.icon className="w-4 h-4" style={{ color: action.color }} />
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
