'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SidebarLayout from '@/components/SidebarLayout';
import ChatBot from '@/components/ChatBot';
import AnalysisDisplay, { AnalysisData } from '@/components/AnalysisDisplay';
import { MessageSquare, Clock, Database } from 'lucide-react';
import { apiService } from '@/services/api';

export default function ChatAnalysis() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisData[]>([]);

  const handleAnalysisRequest = async (key: string, input?: string) => {
    setIsAnalyzing(true);
    
    try {
      const analysis = await apiService.getMockAnalysis(key);
      setCurrentAnalysis(analysis);
      
      // Add to history
      setAnalysisHistory(prev => [analysis, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      const errorAnalysis: AnalysisData = {
        id: key,
        title: `Analysis for ${key}`,
        status: 'error',
        timestamp: new Date(),
        summary: 'Unable to complete analysis due to system error. Please try again.',
        severity: 'medium',
      };
      setCurrentAnalysis(errorAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ProtectedRoute>
      <SidebarLayout>
        <div className="flex-1 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chat Analysis</h1>
            <p className="text-sm text-gray-600">Interactive AI-powered log analysis and troubleshooting</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{analysisHistory.length}</span> recent analyses
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Chat Interface - Takes up 2/3 on large screens */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white rounded-lg shadow h-full flex flex-col">
              <div className="p-4 border-b flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Ask questions, provide analysis keys, or describe issues for intelligent investigation
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatBot 
                  onAnalysisRequest={handleAnalysisRequest} 
                  isLoading={isAnalyzing}
                />
              </div>
            </div>
          </div>

          {/* Analysis Results & History */}
          <div className="space-y-6 overflow-y-auto max-h-full">
            {/* Current Analysis */}
            {currentAnalysis && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h3 className="text-md font-semibold text-gray-900">Current Analysis</h3>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <AnalysisDisplay analysis={currentAnalysis} isLoading={isAnalyzing} />
                </div>
              </div>
            )}

            {/* Recent Analysis History */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <h3 className="text-md font-semibold text-gray-900">Recent Analyses</h3>
                </div>
              </div>
              <div className="p-4 max-h-80 overflow-y-auto">
                {analysisHistory.length > 0 ? (
                  <div className="space-y-3">
                    {analysisHistory.map((analysis, index) => (
                      <div 
                        key={analysis.id + index}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setCurrentAnalysis(analysis)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {analysis.title}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            analysis.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            analysis.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                            analysis.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {analysis.severity}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {analysis.timestamp.toLocaleString()}
                        </div>
                        {analysis.summary && (
                          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {analysis.summary}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No analyses yet</p>
                    <p className="text-xs">Start a conversation to begin</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-md font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                <button
                  onClick={() => handleAnalysisRequest('CR-DEMO-001')}
                  className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  disabled={isAnalyzing}
                >
                  📋 Demo Analysis (CR-DEMO-001)
                </button>
                <button
                  onClick={() => handleAnalysisRequest('INCIDENT-CRITICAL-001')}
                  className="w-full text-left p-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                  disabled={isAnalyzing}
                >
                  🚨 Critical Incident Demo
                </button>
                <button
                  onClick={() => handleAnalysisRequest('LOG-PERF-001')}
                  className="w-full text-left p-2 text-sm text-orange-600 hover:bg-orange-50 rounded transition-colors"
                  disabled={isAnalyzing}
                >
                  ⚡ Performance Analysis Demo
                </button>
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
