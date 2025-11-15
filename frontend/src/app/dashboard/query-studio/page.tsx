'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  Database,
  Play,
  Save,
  Download,
  History,
  BookOpen,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle,
  Copy,
  Maximize2
} from 'lucide-react';

interface QueryResult {
  id: string;
  title: string;
  severity: string;
  status: string;
  created_at: string;
  service?: string;
  error_count?: number;
  avg_response_time?: number;
}

export default function QueryStudioPage() {
  const [query, setQuery] = useState('SELECT * FROM incidents\nWHERE severity = \'critical\'\n  AND created_at >= NOW() - INTERVAL \'24 hours\'\nORDER BY created_at DESC\nLIMIT 100;');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentResults, setCurrentResults] = useState<QueryResult[]>([]);
  const [executionTime, setExecutionTime] = useState('234ms');
  const [resultCount, setResultCount] = useState(0);

  // Demo query results
  const demoResults = {
    incidents: [
      { id: 'INC-2045', title: 'Database connection pool exhausted', severity: 'CRITICAL', status: 'Active', created_at: '2025-01-15 14:32:08' },
      { id: 'INC-2044', title: 'API Gateway timeout spike', severity: 'CRITICAL', status: 'Active', created_at: '2025-01-15 13:18:42' },
      { id: 'INC-2043', title: 'Redis cache memory overflow', severity: 'CRITICAL', status: 'Investigating', created_at: '2025-01-15 12:05:19' },
      { id: 'INC-2042', title: 'Kafka consumer lag increasing', severity: 'CRITICAL', status: 'Active', created_at: '2025-01-15 11:47:33' },
      { id: 'INC-2041', title: 'S3 bucket access denied errors', severity: 'CRITICAL', status: 'Resolved', created_at: '2025-01-15 10:22:15' },
      { id: 'INC-2040', title: 'PostgreSQL disk space critical', severity: 'CRITICAL', status: 'Resolved', created_at: '2025-01-15 09:15:48' },
      { id: 'INC-2039', title: 'Load balancer health check failing', severity: 'CRITICAL', status: 'Active', created_at: '2025-01-15 08:33:21' },
      { id: 'INC-2038', title: 'Authentication service degraded', severity: 'CRITICAL', status: 'Investigating', created_at: '2025-01-15 07:42:09' }
    ],
    errorLogs: [
      { id: '1', service: 'api-gateway', error_count: 1247, severity: 'ERROR', status: 'Active', created_at: '2025-01-15 14:00:00' },
      { id: '2', service: 'auth-service', error_count: 892, severity: 'ERROR', status: 'Active', created_at: '2025-01-15 14:00:00' },
      { id: '3', service: 'payment-processor', error_count: 634, severity: 'ERROR', status: 'Active', created_at: '2025-01-15 14:00:00' },
      { id: '4', service: 'notification-service', error_count: 421, severity: 'ERROR', status: 'Active', created_at: '2025-01-15 14:00:00' },
      { id: '5', service: 'user-service', error_count: 318, severity: 'ERROR', status: 'Active', created_at: '2025-01-15 14:00:00' }
    ],
    metrics: [
      { id: '1', service: 'api-gateway', avg_response_time: 245, title: 'Response Time', severity: 'WARNING', status: 'Monitored', created_at: '2025-01-15 14:00:00' },
      { id: '2', service: 'auth-service', avg_response_time: 189, title: 'Response Time', severity: 'OK', status: 'Monitored', created_at: '2025-01-15 14:00:00' },
      { id: '3', service: 'payment-processor', avg_response_time: 1523, title: 'Response Time', severity: 'CRITICAL', status: 'Monitored', created_at: '2025-01-15 14:00:00' },
      { id: '4', service: 'notification-service', avg_response_time: 98, title: 'Response Time', severity: 'OK', status: 'Monitored', created_at: '2025-01-15 14:00:00' },
      { id: '5', service: 'user-service', avg_response_time: 156, title: 'Response Time', severity: 'OK', status: 'Monitored', created_at: '2025-01-15 14:00:00' }
    ]
  };

  const queryHistory = [
    { query: 'SELECT COUNT(*) FROM logs WHERE level = \'error\'', timestamp: '2 minutes ago', duration: '145ms' },
    { query: 'SELECT service, AVG(response_time) FROM metrics GROUP BY service', timestamp: '15 minutes ago', duration: '892ms' },
    { query: 'SELECT * FROM incidents WHERE status = \'active\'', timestamp: '1 hour ago', duration: '234ms' }
  ];

  const savedQueries = [
    { name: 'Critical Incidents Today', description: 'All critical severity incidents in last 24h' },
    { name: 'Top Error Producers', description: 'Services with highest error rates' },
    { name: 'Slow Endpoints', description: 'API endpoints with p95 > 1s' }
  ];

  const handleExecute = () => {
    setIsExecuting(true);
    
    // Determine which demo results to show based on query content
    setTimeout(() => {
      const queryLower = query.toLowerCase();
      
      if (queryLower.includes('incidents')) {
        setCurrentResults(demoResults.incidents as any);
        setResultCount(demoResults.incidents.length);
        setExecutionTime('234ms');
      } else if (queryLower.includes('logs') || queryLower.includes('error')) {
        setCurrentResults(demoResults.errorLogs as any);
        setResultCount(demoResults.errorLogs.length);
        setExecutionTime('145ms');
      } else if (queryLower.includes('metrics') || queryLower.includes('response_time')) {
        setCurrentResults(demoResults.metrics as any);
        setResultCount(demoResults.metrics.length);
        setExecutionTime('892ms');
      } else {
        // Default to incidents
        setCurrentResults(demoResults.incidents as any);
        setResultCount(demoResults.incidents.length);
        setExecutionTime('234ms');
      }
      
      setIsExecuting(false);
    }, 1500);
  };

  // Initialize with default results
  React.useEffect(() => {
    setCurrentResults(demoResults.incidents as any);
    setResultCount(demoResults.incidents.length);
  }, []);

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6 h-full flex flex-col" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Query Studio
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Interactive SQL editor for data exploration
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2"
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
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <Save 
                className="w-4 h-4" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              Save Query
            </button>
            <button
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2"
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
                if (icon) icon.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                const icon = e.currentTarget.querySelector('svg');
                if (icon) icon.style.transform = 'scale(1)';
              }}
            >
              <BookOpen 
                className="w-4 h-4" 
                style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              Templates
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Editor Section */}
          <div className="lg:col-span-3 space-y-4">
            {/* Query Editor */}
            <div 
              className="rounded-xl border overflow-hidden flex flex-col"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                height: '400px'
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--surface-subtle)' }}>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    SQL Editor
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      color: 'var(--text-secondary)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Copy className="w-3 h-3 inline mr-1" />
                    Copy
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      color: 'var(--text-secondary)',
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Maximize2 className="w-3 h-3 inline mr-1" />
                    Expand
                  </button>
                </div>
              </div>
              
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-4 font-mono text-sm resize-none outline-none"
                style={{
                  backgroundColor: 'var(--surface-default)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Enter your SQL query here..."
              />

              <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span>Lines: 5</span>
                  <span>Characters: {query.length}</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" style={{ color: 'var(--status-positive)' }} />
                    Valid SQL
                  </span>
                </div>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="px-6 py-2 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--button-primary-bg)',
                    color: 'var(--button-primary-text)',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isExecuting) {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.4)';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.transform = 'scale(1)';
                  }}
                >
                  {isExecuting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Play 
                        className="w-4 h-4" 
                        style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />
                      Execute Query
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results */}
            <div 
              className="rounded-xl border overflow-hidden flex-1"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--surface-subtle)' }}>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    Query Results
                  </span>
                  <span 
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--status-positive-bg)',
                      color: 'var(--status-positive-text)'
                    }}
                  >
                    {resultCount} rows
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <Clock className="w-3 h-3" />
                    <span>Executed in {executionTime}</span>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--surface-default)',
                    color: 'var(--text-secondary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.transform = 'scale(1)';
                  }}
                >
                  <Download 
                    className="w-3 h-3" 
                    style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />
                  Export CSV
                </button>
              </div>
              
              <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                <table className="w-full">
                  <thead className="sticky top-0" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>ID</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        {currentResults[0]?.service ? 'SERVICE' : 'TITLE'}
                      </th>
                      {currentResults[0]?.error_count !== undefined && (
                        <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>ERROR_COUNT</th>
                      )}
                      {currentResults[0]?.avg_response_time !== undefined && (
                        <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>AVG_RESPONSE_TIME (ms)</th>
                      )}
                      <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>SEVERITY</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>STATUS</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>CREATED_AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResults.map((result, i) => {
                      const getSeverityStyle = (severity: string) => {
                        if (severity === 'CRITICAL') return { bg: 'var(--status-critical-bg)', text: 'var(--status-critical-text)' };
                        if (severity === 'ERROR') return { bg: 'var(--status-critical-bg)', text: 'var(--status-critical-text)' };
                        if (severity === 'WARNING') return { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' };
                        return { bg: 'var(--status-positive-bg)', text: 'var(--status-positive-text)' };
                      };
                      const style = getSeverityStyle(result.severity);
                      
                      return (
                        <tr 
                          key={i}
                          style={{ 
                            borderBottom: `1px solid var(--border-subtle)`,
                            backgroundColor: 'var(--card-bg)',
                            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(4px)';
                            e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                          }}
                        >
                          <td className="px-4 py-3 text-sm font-mono" style={{ color: 'var(--text-primary)' }}>{result.id}</td>
                          <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                            {result.service || result.title}
                          </td>
                          {result.error_count !== undefined && (
                            <td className="px-4 py-3 text-sm font-mono font-bold" style={{ color: 'var(--status-critical-text)' }}>
                              {result.error_count.toLocaleString()}
                            </td>
                          )}
                          {result.avg_response_time !== undefined && (
                            <td className="px-4 py-3 text-sm font-mono font-bold" style={{ 
                              color: result.avg_response_time > 1000 ? 'var(--status-critical-text)' : 
                                     result.avg_response_time > 200 ? 'var(--status-warning-text)' : 
                                     'var(--status-positive-text)' 
                            }}>
                              {result.avg_response_time.toFixed(0)} ms
                            </td>
                          )}
                          <td className="px-4 py-3">
                            <span 
                              className="px-2 py-1 rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: style.bg,
                                color: style.text
                              }}
                            >
                              {result.severity}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{result.status}</td>
                          <td className="px-4 py-3 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{result.created_at}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Saved Queries */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <BookOpen className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                Saved Queries
              </h3>
              <div className="space-y-2">
                {savedQueries.map((saved, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-3 rounded-lg"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      border: `1px solid var(--border-subtle)`,
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <p className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {saved.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {saved.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Query History */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <History className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                Recent Queries
              </h3>
              <div className="space-y-2">
                {queryHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      border: `1px solid var(--border-subtle)`,
                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                      e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                  >
                    <p className="font-mono text-xs mb-2 truncate" style={{ color: 'var(--text-primary)' }}>
                      {item.query}
                    </p>
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>{item.timestamp}</span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {item.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
