'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SidebarLayout from '@/components/SidebarLayout';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  totalAnalyses: number;
  successRate: number;
  averageTime: number;
  criticalIssues: number;
  topSources: { name: string; count: number }[];
  timeSeriesData: { date: string; analyses: number; errors: number }[];
  severityBreakdown: { severity: string; count: number; percentage: number }[];
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('analyses');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    totalAnalyses: 1247,
    successRate: 94.2,
    averageTime: 12.5,
    criticalIssues: 23,
    topSources: [
      { name: 'user-service', count: 342 },
      { name: 'api-gateway', count: 289 },
      { name: 'payment-service', count: 201 },
      { name: 'database', count: 156 },
      { name: 'notification-service', count: 134 }
    ],
    timeSeriesData: [
      { date: '2024-10-01', analyses: 45, errors: 3 },
      { date: '2024-10-02', analyses: 52, errors: 2 },
      { date: '2024-10-03', analyses: 38, errors: 5 },
      { date: '2024-10-04', analyses: 61, errors: 1 },
      { date: '2024-10-05', analyses: 49, errors: 4 },
      { date: '2024-10-06', analyses: 55, errors: 2 },
      { date: '2024-10-07', analyses: 67, errors: 3 }
    ],
    severityBreakdown: [
      { severity: 'Critical', count: 23, percentage: 1.8 },
      { severity: 'High', count: 87, percentage: 7.0 },
      { severity: 'Medium', count: 324, percentage: 26.0 },
      { severity: 'Low', count: 813, percentage: 65.2 }
    ]
  };

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const stats = [
    {
      name: 'Total Analyses',
      value: analyticsData.totalAnalyses.toLocaleString(),
      change: '+12.3%',
      changeType: 'positive' as const,
      icon: BarChart3,
    },
    {
      name: 'Success Rate',
      value: `${analyticsData.successRate}%`,
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: CheckCircle,
    },
    {
      name: 'Avg. Analysis Time',
      value: `${analyticsData.averageTime}s`,
      change: '-8.4%',
      changeType: 'positive' as const,
      icon: Clock,
    },
    {
      name: 'Critical Issues',
      value: analyticsData.criticalIssues.toString(),
      change: '-15.2%',
      changeType: 'positive' as const,
      icon: AlertCircle,
    },
  ];

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
            <p className="text-sm text-gray-600">Analysis trends, performance metrics, and system insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <span className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time Series Chart */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Analysis Trends</h3>
                <p className="text-sm text-gray-600">Daily analysis volume and error rates</p>
              </div>
              <div className="p-6">
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.timeSeriesData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="flex flex-col items-center space-y-1 mb-2">
                        <div 
                          className="bg-blue-500 rounded-t"
                          style={{ 
                            height: `${(data.analyses / 70) * 200}px`,
                            width: '20px'
                          }}
                        />
                        <div 
                          className="bg-red-500 rounded-t"
                          style={{ 
                            height: `${(data.errors / 5) * 40}px`,
                            width: '20px'
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">Analyses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600">Errors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Severity Breakdown */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Issue Severity Distribution</h3>
                <p className="text-sm text-gray-600">Breakdown of issues by severity level</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {analyticsData.severityBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-sm font-medium text-gray-700">
                        {item.severity}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.severity === 'Critical' ? 'bg-red-500' :
                              item.severity === 'High' ? 'bg-orange-500' :
                              item.severity === 'Medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">
                        {item.count}
                      </div>
                      <div className="w-12 text-sm text-gray-500 text-right">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Sources */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Top Error Sources</h3>
                <p className="text-sm text-gray-600">Services generating the most analysis requests</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {analyticsData.topSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900 w-4">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-700">{source.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(source.count / analyticsData.topSources[0].count) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8 text-right">
                          {source.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Analysis Activity</h3>
                <p className="text-sm text-gray-600">Latest analysis requests and their status</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { id: 'CR-2024-001', status: 'completed', time: '2 min ago', severity: 'medium' },
                    { id: 'LOG-2024-089', status: 'analyzing', time: '5 min ago', severity: 'high' },
                    { id: 'INC-2024-034', status: 'completed', time: '12 min ago', severity: 'critical' },
                    { id: 'CR-2024-002', status: 'failed', time: '18 min ago', severity: 'low' },
                    { id: 'LOG-2024-090', status: 'completed', time: '25 min ago', severity: 'medium' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-500' :
                          activity.status === 'analyzing' ? 'bg-blue-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">{activity.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          activity.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          activity.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {activity.severity}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
              <p className="text-sm text-gray-600">AI-generated insights based on your analysis patterns</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Trending Up</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Analysis completion rate improved by 15% this week, primarily due to optimized query patterns.
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">Attention Needed</span>
                  </div>
                  <p className="text-sm text-yellow-800">
                    User-service shows 23% higher error rates during peak hours (2-4 PM).
                  </p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Recommendation</span>
                  </div>
                  <p className="text-sm text-green-800">
                    Consider increasing connection pool size for database during peak hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}
