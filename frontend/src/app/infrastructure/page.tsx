'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Bell,
  Search,
  Settings,
  User,
  Server,
  Database,
  Network,
  Cloud,
  Container,
  Cpu,
  HardDrive,
  Activity,
  TrendingUp,
  TrendingDown,
  Plus,
  RefreshCw,
  Filter,
  Eye,
  Edit,
  Power,
  Gauge,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  ChevronRight,
  BarChart3,
  Hexagon
} from 'lucide-react';

// Mock infrastructure data
const infrastructureNodes = [
  {
    id: 'node-001',
    name: 'prod-web-01',
    type: 'web-server',
    status: 'healthy',
    region: 'us-east-1',
    zone: 'us-east-1a',
    instanceType: 't3.large',
    metrics: {
      cpu: 45,
      memory: 68,
      disk: 23,
      network: 1.2
    },
    uptime: '99.98%',
    lastRestart: '2025-10-15T08:30:00Z',
    cost: '$42.30/month'
  },
  {
    id: 'node-002',
    name: 'prod-api-01',
    type: 'api-server',
    status: 'warning',
    region: 'us-west-2',
    zone: 'us-west-2b',
    instanceType: 'c5.xlarge',
    metrics: {
      cpu: 78,
      memory: 82,
      disk: 45,
      network: 2.8
    },
    uptime: '99.85%',
    lastRestart: '2025-10-18T14:20:00Z',
    cost: '$89.40/month'
  },
  {
    id: 'node-003',
    name: 'prod-db-primary',
    type: 'database',
    status: 'healthy',
    region: 'us-east-1',
    zone: 'us-east-1c',
    instanceType: 'r5.2xlarge',
    metrics: {
      cpu: 34,
      memory: 56,
      disk: 67,
      network: 5.2
    },
    uptime: '99.99%',
    lastRestart: '2025-10-10T02:15:00Z',
    cost: '$156.80/month'
  },
  {
    id: 'node-004',
    name: 'prod-cache-01',
    type: 'cache',
    status: 'healthy',
    region: 'us-west-2',
    zone: 'us-west-2a',
    instanceType: 'm5.large',
    metrics: {
      cpu: 23,
      memory: 45,
      disk: 12,
      network: 0.8
    },
    uptime: '99.96%',
    lastRestart: '2025-10-12T10:45:00Z',
    cost: '$35.20/month'
  },
  {
    id: 'node-005',
    name: 'prod-queue-01',
    type: 'message-queue',
    status: 'warning',
    region: 'eu-west-1',
    zone: 'eu-west-1a',
    instanceType: 't3.medium',
    metrics: {
      cpu: 67,
      memory: 74,
      disk: 34,
      network: 1.5
    },
    uptime: '99.89%',
    lastRestart: '2025-10-17T16:30:00Z',
    cost: '$28.90/month'
  },
  {
    id: 'node-006',
    name: 'prod-lb-01',
    type: 'load-balancer',
    status: 'healthy',
    region: 'us-east-1',
    zone: 'us-east-1b',
    instanceType: 'nlb',
    metrics: {
      cpu: 15,
      memory: 32,
      disk: 8,
      network: 12.4
    },
    uptime: '99.99%',
    lastRestart: '2025-10-08T06:00:00Z',
    cost: '$65.70/month'
  }
];

const regions = [
  { name: 'us-east-1', nodes: 3, healthy: 3, warning: 0, cost: '$264.80' },
  { name: 'us-west-2', nodes: 2, healthy: 1, warning: 1, cost: '$124.60' },
  { name: 'eu-west-1', nodes: 1, healthy: 0, warning: 1, cost: '$28.90' }
];

const infrastructureStats = {
  totalNodes: 6,
  healthy: 4,
  warning: 2,
  critical: 0,
  totalCost: '$418.30',
  avgCpuUsage: 43.7,
  avgMemoryUsage: 59.5
};

const nodeTypeIcons: Record<string, any> = {
  'web-server': Server,
  'api-server': Cloud,
  'database': Database,
  'cache': Container,
  'message-queue': Network,
  'load-balancer': Activity
};

const statusColors: Record<string, string> = {
  healthy: 'var(--green)',
  warning: 'var(--orange)',
  critical: 'var(--salmon)',
  offline: 'var(--text-tertiary)'
};

export default function Infrastructure() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredNodes = infrastructureNodes.filter(node => {
    const statusMatch = filterStatus === 'all' || node.status === filterStatus;
    const regionMatch = filterRegion === 'all' || node.region === filterRegion;
    const typeMatch = filterType === 'all' || node.type === filterType;
    return statusMatch && regionMatch && typeMatch;
  });

  const getNodeIcon = (type: string) => {
    const IconComponent = nodeTypeIcons[type] || Server;
    return <IconComponent className="w-5 h-5" style={{ color: 'var(--teal)' }} />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" style={{ color: 'var(--green)' }} />;
      case 'warning': return <AlertTriangle className="w-4 h-4" style={{ color: 'var(--orange)' }} />;
      case 'critical': return <AlertTriangle className="w-4 h-4" style={{ color: 'var(--salmon)' }} />;
      default: return <Activity className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />;
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
                      item.name === 'Infrastructure' ? 'text-white' : 'hover:text-white'
                    }`}
                    style={{ color: item.name === 'Infrastructure' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
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
                  placeholder="Search infrastructure..."
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
                Infrastructure Management
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Monitor and manage your cloud infrastructure resources
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="btn-primary text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Resource
              </button>
              
              <button className="btn-secondary text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { label: 'Total Nodes', value: infrastructureStats.totalNodes, color: 'var(--text-primary)' },
              { label: 'Healthy', value: infrastructureStats.healthy, color: 'var(--green)' },
              { label: 'Warning', value: infrastructureStats.warning, color: 'var(--orange)' },
              { label: 'Critical', value: infrastructureStats.critical, color: 'var(--salmon)' },
              { label: 'Monthly Cost', value: infrastructureStats.totalCost, color: 'var(--blue)' },
              { label: 'Avg CPU', value: `${infrastructureStats.avgCpuUsage}%`, color: 'var(--teal)' },
              { label: 'Avg Memory', value: `${infrastructureStats.avgMemoryUsage}%`, color: 'var(--magenta)' }
            ].map((stat, index) => (
              <div key={index} className="card-primary p-4">
                <p className="text-lg font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Regional Overview */}
          <div className="card-primary p-6">
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Regional Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regions.map((region) => (
                <div key={region.name} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background-surface)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{region.name}</h4>
                    <MapPin className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Nodes</span>
                      <span style={{ color: 'var(--text-primary)' }}>{region.nodes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Healthy</span>
                      <span style={{ color: 'var(--green)' }}>{region.healthy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Warning</span>
                      <span style={{ color: 'var(--orange)' }}>{region.warning}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Cost</span>
                      <span style={{ color: 'var(--text-primary)' }}>{region.cost}/mo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
            
            <select 
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm border transition-colors duration-300 focus:outline-none"
              style={{ 
                backgroundColor: 'var(--background-surface)', 
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="all">All Regions</option>
              <option value="us-east-1">US East 1</option>
              <option value="us-west-2">US West 2</option>
              <option value="eu-west-1">EU West 1</option>
            </select>

            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm border transition-colors duration-300 focus:outline-none"
              style={{ 
                backgroundColor: 'var(--background-surface)', 
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="all">All Types</option>
              <option value="web-server">Web Server</option>
              <option value="api-server">API Server</option>
              <option value="database">Database</option>
              <option value="cache">Cache</option>
              <option value="message-queue">Message Queue</option>
              <option value="load-balancer">Load Balancer</option>
            </select>
          </div>

          {/* Infrastructure Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNodes.map((node) => (
              <div key={node.id} className="card-primary p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--background-surface)' }}>
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {node.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {node.instanceType} • {node.region}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(node.status)}
                    <span className="text-xs font-medium capitalize" style={{ color: statusColors[node.status] }}>
                      {node.status}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>CPU</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{node.metrics.cpu}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--background-surface)' }}>
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          backgroundColor: node.metrics.cpu > 80 ? 'var(--salmon)' :
                                         node.metrics.cpu > 60 ? 'var(--orange)' : 'var(--green)',
                          width: `${node.metrics.cpu}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Memory</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{node.metrics.memory}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--background-surface)' }}>
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          backgroundColor: node.metrics.memory > 80 ? 'var(--salmon)' :
                                         node.metrics.memory > 60 ? 'var(--orange)' : 'var(--blue)',
                          width: `${node.metrics.memory}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p style={{ color: 'var(--text-tertiary)' }}>Disk Usage</p>
                    <p style={{ color: 'var(--text-primary)' }}>{node.metrics.disk}%</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-tertiary)' }}>Network</p>
                    <p style={{ color: 'var(--text-primary)' }}>{node.metrics.network} GB/s</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-tertiary)' }}>Uptime</p>
                    <p style={{ color: 'var(--text-primary)' }}>{node.uptime}</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--text-tertiary)' }}>Cost</p>
                    <p style={{ color: 'var(--text-primary)' }}>{node.cost}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <Clock className="w-3 h-3" />
                    <span>Last restart: {new Date(node.lastRestart).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <Eye className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <Edit className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <Power className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                    <button className="p-2 rounded-lg transition-colors duration-300 hover:bg-gray-800/50">
                      <BarChart3 className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
