'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Brain,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  XCircle,
  ChevronRight
} from 'lucide-react';

export default function IncidentsPage() {
  const [filter, setFilter] = useState('all');

  const incidents = [
    {
      id: 'INC-2041',
      title: 'Database latency spike in production',
      status: 'Resolved',
      severity: 'high',
      aiAnalysis: 'Root cause: N+1 query in OrderService. Recommended fix: Add eager loading.',
      affectedService: 'OrderService',
      detectedAt: '2025-01-15 14:32:15',
      resolvedAt: '2025-01-15 14:35:42',
      responseTime: '3m 27s',
      autoResolved: true
    },
    {
      id: 'INC-2042',
      title: 'API response time degradation',
      status: 'Investigating',
      severity: 'medium',
      aiAnalysis: 'Correlating logs from 12 sources. Pattern detected in cache layer.',
      affectedService: 'API Gateway',
      detectedAt: '2025-01-15 15:12:08',
      resolvedAt: null,
      responseTime: 'Ongoing',
      autoResolved: false
    },
    {
      id: 'INC-2043',
      title: 'Memory leak in user-service pod',
      status: 'Resolved',
      severity: 'high',
      aiAnalysis: 'Memory usage exceeded 90%. Auto-restart initiated. Team notified via Slack.',
      affectedService: 'UserService',
      detectedAt: '2025-01-15 13:15:22',
      resolvedAt: '2025-01-15 13:18:45',
      responseTime: '3m 23s',
      autoResolved: true
    },
    {
      id: 'INC-2044',
      title: 'Elevated error rate in payment processing',
      status: 'Resolved',
      severity: 'critical',
      aiAnalysis: 'Third-party API timeout. Fallback mechanism activated automatically.',
      affectedService: 'PaymentService',
      detectedAt: '2025-01-15 12:45:11',
      resolvedAt: '2025-01-15 12:47:33',
      responseTime: '2m 22s',
      autoResolved: true
    },
    {
      id: 'INC-2045',
      title: 'Redis connection pool exhaustion',
      status: 'Monitoring',
      severity: 'medium',
      aiAnalysis: 'Connection pool increased. Monitoring for stability.',
      affectedService: 'CacheService',
      detectedAt: '2025-01-15 11:20:05',
      resolvedAt: null,
      responseTime: 'Ongoing',
      autoResolved: false
    },
  ];

  const stats = [
    { label: 'Total Incidents', value: '247', trend: '-12%', color: 'blue' },
    { label: 'Auto-Resolved', value: '94%', trend: '+8%', color: 'green' },
    { label: 'Avg Response Time', value: '8.2s', trend: '-2.1s', color: 'purple' },
    { label: 'Active Now', value: '3', trend: '-5', color: 'orange' },
  ];

  const filteredIncidents = filter === 'all' 
    ? incidents 
    : incidents.filter(inc => inc.status.toLowerCase() === filter.toLowerCase());

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Incidents</h1>
              <p className="text-gray-600 mt-1">AI-powered incident detection and resolution</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Create Incident
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 outline-none"
                >
                  <option value="all">All Incidents</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="monitoring">Monitoring</option>
                </select>
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search incidents..."
                  className="bg-transparent outline-none text-sm text-gray-700 w-full"
                />
              </div>
            </div>
          </div>

          {/* Incidents List */}
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-3 h-3 rounded-full ${
                        incident.severity === 'critical' ? 'bg-red-600' :
                        incident.severity === 'high' ? 'bg-red-500' :
                        incident.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}></span>
                      <span className="font-mono text-sm text-gray-500">{incident.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        incident.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                        incident.status === 'Investigating' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {incident.status}
                      </span>
                      {incident.autoResolved && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          Auto-Resolved
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{incident.title}</h3>
                    <div className="flex items-start gap-2 mb-3">
                      <Brain className="w-4 h-4 text-purple-500 mt-1" />
                      <p className="text-sm text-gray-600">{incident.aiAnalysis}</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {incident.responseTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {incident.detectedAt}
                      </span>
                      <span className="font-medium text-gray-700">{incident.affectedService}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
