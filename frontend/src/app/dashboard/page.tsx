'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SidebarLayout from '@/components/SidebarLayout';
import ChatBot from '@/components/ChatBot';
import AnalysisDisplay, { AnalysisData } from '@/components/AnalysisDisplay';
import { Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService } from '@/services/api';

export default function Dashboard() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisRequest = async (key: string, input?: string) => {
    setIsAnalyzing(true);
    
    try {
      // Use the API service to get analysis data
      const analysis = await apiService.getMockAnalysis(key);
      setCurrentAnalysis(analysis);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      // Fallback to basic error analysis
      setCurrentAnalysis({
        id: key,
        title: `Analysis for ${key}`,
        status: 'error',
        timestamp: new Date(),
        summary: 'Unable to complete analysis due to system error. Please try again.',
        severity: 'medium',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Mock dashboard stats
  const stats = [
    {
      name: 'Active Analyses',
      value: '12',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      name: 'Critical Issues',
      value: '3',
      change: '-12.5%',
      changeType: 'positive' as const,
      icon: AlertCircle,
    },
    {
      name: 'Resolved Today',
      value: '8',
      change: '+4.3%',
      changeType: 'positive' as const,
      icon: CheckCircle,
    },
    {
      name: 'System Health',
      value: '98.2%',
      change: '+0.1%',
      changeType: 'positive' as const,
      icon: Activity,
    },
  ];

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 min-h-0 flex flex-col">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your system health and recent analyses</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">System Operational</span>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {/* Stats Grid */}
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                        <span className={`ml-2 text-sm font-medium ${
                          stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Analysis Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-20rem)]">
              {/* Analysis Display */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analysis Results</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time analysis and root cause investigation</p>
                </div>
                <div className="h-full p-4">
                  <AnalysisDisplay analysis={currentAnalysis} isLoading={isAnalyzing} />
                </div>
              </div>

              {/* Chat Interface */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interact with Traceon AI for analysis and insights</p>
                </div>
                <div className="h-full">
                  <ChatBot 
                    onAnalysisRequest={handleAnalysisRequest} 
                    isLoading={isAnalyzing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </ProtectedRoute>
  );
}
