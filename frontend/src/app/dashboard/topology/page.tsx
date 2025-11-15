'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  Network,
  Server,
  Database,
  Cloud,
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap,
  ArrowRight,
  Maximize2
} from 'lucide-react';

interface ServiceNode {
  id: string;
  name: string;
  type: 'api' | 'database' | 'cache' | 'queue' | 'external';
  status: 'healthy' | 'degraded' | 'down';
  metrics: {
    requests: string;
    latency: number;
    errorRate: number;
  };
  dependencies: string[];
}

export default function TopologyPage() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const services: ServiceNode[] = [
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'api',
      status: 'healthy',
      metrics: { requests: '4.2K/s', latency: 45, errorRate: 0.1 },
      dependencies: ['auth-service', 'order-service', 'user-service']
    },
    {
      id: 'auth-service',
      name: 'Auth Service',
      type: 'api',
      status: 'healthy',
      metrics: { requests: '1.8K/s', latency: 23, errorRate: 0.05 },
      dependencies: ['user-db', 'redis-cache']
    },
    {
      id: 'order-service',
      name: 'Order Service',
      type: 'api',
      status: 'degraded',
      metrics: { requests: '890/s', latency: 320, errorRate: 2.4 },
      dependencies: ['order-db', 'payment-service', 'notification-queue']
    },
    {
      id: 'user-service',
      name: 'User Service',
      type: 'api',
      status: 'healthy',
      metrics: { requests: '2.1K/s', latency: 18, errorRate: 0.02 },
      dependencies: ['user-db', 'redis-cache']
    },
    {
      id: 'payment-service',
      name: 'Payment API',
      type: 'external',
      status: 'healthy',
      metrics: { requests: '450/s', latency: 180, errorRate: 0.3 },
      dependencies: []
    },
    {
      id: 'user-db',
      name: 'User Database',
      type: 'database',
      status: 'healthy',
      metrics: { requests: '3.2K/s', latency: 12, errorRate: 0 },
      dependencies: []
    },
    {
      id: 'order-db',
      name: 'Order Database',
      type: 'database',
      status: 'degraded',
      metrics: { requests: '1.5K/s', latency: 450, errorRate: 1.2 },
      dependencies: []
    },
    {
      id: 'redis-cache',
      name: 'Redis Cache',
      type: 'cache',
      status: 'healthy',
      metrics: { requests: '8.4K/s', latency: 3, errorRate: 0.01 },
      dependencies: []
    },
    {
      id: 'notification-queue',
      name: 'Notification Queue',
      type: 'queue',
      status: 'healthy',
      metrics: { requests: '650/s', latency: 8, errorRate: 0 },
      dependencies: []
    }
  ];

  const statusConfig = {
    healthy: { icon: CheckCircle, color: 'var(--status-positive)', bg: 'var(--status-positive-bg)', text: 'var(--status-positive-text)' },
    degraded: { icon: AlertTriangle, color: 'var(--status-warning)', bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
    down: { icon: AlertTriangle, color: 'var(--status-critical)', bg: 'var(--status-critical-bg)', text: 'var(--status-critical-text)' }
  };

  const typeConfig = {
    api: { icon: Server, color: 'var(--accent-primary)' },
    database: { icon: Database, color: 'var(--status-info)' },
    cache: { icon: Zap, color: 'var(--status-warning)' },
    queue: { icon: Activity, color: 'var(--status-positive)' },
    external: { icon: Cloud, color: 'var(--text-muted)' }
  };

  const stats = [
    { label: 'Total Services', value: '24', icon: Server, color: 'var(--accent-primary)' },
    { label: 'Healthy', value: '21', icon: CheckCircle, color: 'var(--status-positive)' },
    { label: 'Degraded', value: '3', icon: AlertTriangle, color: 'var(--status-warning)' },
    { label: 'Avg Latency', value: '42ms', icon: Zap, color: 'var(--status-info)' }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Service Topology
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Visual map of service dependencies and health
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
            <Maximize2 className="w-5 h-5" />
            Full Screen View
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

        {/* Interactive Topology Visualization */}
        <div 
          className="p-8 rounded-xl border relative"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            minHeight: '600px'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Network className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                Interactive Service Map
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Click nodes for details • Hover to highlight connections
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--status-positive-bg)', color: 'var(--status-positive-text)' }}>
                <CheckCircle className="w-3 h-3" />
                {services.filter(s => s.status === 'healthy').length} Healthy
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--status-warning-bg)', color: 'var(--status-warning-text)' }}>
                <AlertTriangle className="w-3 h-3" />
                {services.filter(s => s.status === 'degraded').length} Degraded
              </div>
            </div>
          </div>

          {/* Topology Graph */}
          <div className="relative rounded-lg p-8" style={{ backgroundColor: 'var(--surface-subtle)', height: '500px' }}>
            {/* Connection lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="var(--border-default)" opacity="0.5" />
                </marker>
              </defs>
              {services.map((service) => 
                service.dependencies.map((depId) => {
                  const fromService = service;
                  const toService = services.find(s => s.id === depId);
                  if (!toService) return null;

                  // Calculate positions (these match the node positions below)
                  const positions: { [key: string]: { x: number, y: number } } = {
                    'api-gateway': { x: 50, y: 15 },
                    'auth-service': { x: 20, y: 40 },
                    'order-service': { x: 50, y: 40 },
                    'user-service': { x: 80, y: 40 },
                    'payment-service': { x: 35, y: 65 },
                    'user-db': { x: 20, y: 80 },
                    'order-db': { x: 50, y: 80 },
                    'redis-cache': { x: 80, y: 80 },
                    'notification-queue': { x: 65, y: 65 }
                  };

                  const fromPos = positions[fromService.id] || { x: 50, y: 50 };
                  const toPos = positions[depId] || { x: 50, y: 50 };
                  
                  const isHighlighted = hoveredNode === fromService.id || hoveredNode === depId || selectedNode === fromService.id || selectedNode === depId;
                  
                  return (
                    <line
                      key={`${service.id}-${depId}`}
                      x1={`${fromPos.x}%`}
                      y1={`${fromPos.y}%`}
                      x2={`${toPos.x}%`}
                      y2={`${toPos.y}%`}
                      stroke={isHighlighted ? 'var(--accent-primary)' : 'var(--border-default)'}
                      strokeWidth={isHighlighted ? '3' : '2'}
                      strokeDasharray="4 4"
                      opacity={isHighlighted ? '0.8' : '0.3'}
                      markerEnd="url(#arrowhead)"
                      className="transition-all duration-300"
                    />
                  );
                })
              )}
            </svg>

            {/* Service Nodes */}
            {services.map((service) => {
              const TypeIcon = typeConfig[service.type].icon;
              const statusStyle = statusConfig[service.status];
              
              // Define positions for each service
              const positions: { [key: string]: { x: number, y: number } } = {
                'api-gateway': { x: 50, y: 15 },
                'auth-service': { x: 20, y: 40 },
                'order-service': { x: 50, y: 40 },
                'user-service': { x: 80, y: 40 },
                'payment-service': { x: 35, y: 65 },
                'user-db': { x: 20, y: 80 },
                'order-db': { x: 50, y: 80 },
                'redis-cache': { x: 80, y: 80 },
                'notification-queue': { x: 65, y: 65 }
              };
              
              const position = positions[service.id] || { x: 50, y: 50 };
              const isHovered = hoveredNode === service.id;
              const isSelected = selectedNode === service.id;
              const isConnected = hoveredNode && service.dependencies.includes(hoveredNode);
              const isHighlighted = isHovered || isSelected || isConnected;

              return (
                <div
                  key={service.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    zIndex: isHighlighted ? 10 : 2,
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setHoveredNode(service.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(selectedNode === service.id ? null : service.id)}
                >
                  {/* Node Circle */}
                  <div
                    className="relative transition-all duration-300"
                    style={{
                      transform: isHighlighted ? 'scale(1.3)' : 'scale(1)',
                    }}
                  >
                    {/* Status pulse animation */}
                    {service.status !== 'healthy' && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          backgroundColor: statusStyle.color,
                          opacity: 0.3
                        }}
                      />
                    )}
                    
                    {/* Main node */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center relative"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: `4px solid ${statusStyle.color}`,
                        boxShadow: isHighlighted 
                          ? `0 0 0 8px ${statusStyle.color}20, 0 8px 24px rgba(0,0,0,0.3)` 
                          : `0 0 0 4px ${statusStyle.color}10, 0 4px 12px rgba(0,0,0,0.1)`
                      }}
                    >
                      {/* Type icon */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: typeConfig[service.type].color,
                          color: 'white'
                        }}
                      >
                        <TypeIcon className="w-6 h-6" />
                      </div>
                      
                      {/* Status indicator */}
                      <div
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2"
                        style={{
                          backgroundColor: 'var(--card-bg)',
                          borderColor: statusStyle.color
                        }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: statusStyle.color }}
                        />
                      </div>
                    </div>
                    
                    {/* Node label */}
                    <div 
                      className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
                      style={{
                        opacity: isHighlighted ? 1 : 0.8
                      }}
                    >
                      <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        {service.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {service.metrics.requests}
                      </p>
                    </div>
                  </div>

                  {/* Detailed tooltip on hover/select */}
                  {(isHovered || isSelected) && (
                    <div 
                      className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-2xl min-w-64 animate-in fade-in zoom-in-95"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: `2px solid ${statusStyle.color}`,
                        boxShadow: `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${statusStyle.color}40`,
                        zIndex: 30
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: typeConfig[service.type].color,
                              color: 'white'
                            }}
                          >
                            <TypeIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                              {service.name}
                            </p>
                            <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                              {service.type}
                            </p>
                          </div>
                        </div>
                        <div
                          className="px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text
                          }}
                        >
                          {React.createElement(statusStyle.icon, { className: 'w-3 h-3' })}
                          {service.status}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Requests/sec:</span>
                          <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                            {service.metrics.requests}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Latency:</span>
                          <span 
                            className="text-sm font-bold"
                            style={{ 
                              color: service.metrics.latency > 200 
                                ? 'var(--status-warning)' 
                                : service.metrics.latency > 100 
                                  ? 'var(--status-info)' 
                                  : 'var(--status-positive)' 
                            }}
                          >
                            {service.metrics.latency}ms
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Error Rate:</span>
                          <span 
                            className="text-sm font-bold"
                            style={{ 
                              color: service.metrics.errorRate > 1 
                                ? 'var(--status-critical)' 
                                : service.metrics.errorRate > 0.5 
                                  ? 'var(--status-warning)' 
                                  : 'var(--status-positive)' 
                            }}
                          >
                            {service.metrics.errorRate}%
                          </span>
                        </div>
                      </div>

                      {/* Dependencies */}
                      {service.dependencies.length > 0 && (
                        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                          <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Dependencies ({service.dependencies.length}):
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {service.dependencies.map((depId) => {
                              const dep = services.find(s => s.id === depId);
                              if (!dep) return null;
                              return (
                                <div
                                  key={depId}
                                  className="px-2 py-1 rounded text-xs font-medium"
                                  style={{
                                    backgroundColor: 'var(--surface-subtle)',
                                    color: 'var(--text-secondary)'
                                  }}
                                >
                                  {dep.name}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-6">
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Status:</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-positive)' }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-warning)' }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Degraded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-critical)' }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Down</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Type:</p>
              {Object.entries(typeConfig).map(([type, config]) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: config.color }} />
                  <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Nodes Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Service Nodes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const TypeIcon = typeConfig[service.type].icon;
              const StatusIcon = statusConfig[service.status].icon;
              const statusStyle = statusConfig[service.status];
              
              return (
                <div
                  key={service.id}
                  className="p-5 rounded-xl border cursor-pointer"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.15)';
                    e.currentTarget.style.borderColor = statusStyle.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: typeConfig[service.type].color,
                          color: 'var(--text-inverse)'
                        }}
                      >
                        <TypeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                          {service.name}
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {service.type}
                        </p>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text
                      }}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {service.status}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'var(--surface-subtle)' }}
                    >
                      <p className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Requests</p>
                      <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        {service.metrics.requests}
                      </p>
                    </div>
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'var(--surface-subtle)' }}
                    >
                      <p className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Latency</p>
                      <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        {service.metrics.latency}ms
                      </p>
                    </div>
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'var(--surface-subtle)' }}
                    >
                      <p className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>Errors</p>
                      <p className="text-xs font-bold" style={{ 
                        color: service.metrics.errorRate > 1 ? 'var(--status-critical)' : 'var(--status-positive)'
                      }}>
                        {service.metrics.errorRate}%
                      </p>
                    </div>
                  </div>

                  {/* Dependencies */}
                  {service.dependencies.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                        Dependencies ({service.dependencies.length}):
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.dependencies.slice(0, 3).map((dep, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1"
                            style={{
                              backgroundColor: 'var(--accent-primary)',
                              color: 'var(--text-inverse)'
                            }}
                          >
                            <ArrowRight className="w-2 h-2" />
                            {dep.replace('-', ' ')}
                          </span>
                        ))}
                        {service.dependencies.length > 3 && (
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-medium"
                            style={{
                              backgroundColor: 'var(--surface-subtle)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            +{service.dependencies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
