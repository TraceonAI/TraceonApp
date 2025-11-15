'use client';

import React, { useState } from 'react';
import ChatBot from '@/components/ChatBot';
import AnalysisDisplay, { AnalysisData } from '@/components/AnalysisDisplay';
import { Brain, Activity } from 'lucide-react';
import { apiService } from '@/services/api';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Traceon AI</h1>
                <p className="text-sm text-gray-500">Intelligent Log Analysis & Root Cause Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Analysis Display */}
          <div className="order-2 lg:order-1">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Analysis Results</h2>
              <p className="text-sm text-gray-600">Real-time analysis and root cause investigation</p>
            </div>
            <div className="h-full">
              <AnalysisDisplay analysis={currentAnalysis} isLoading={isAnalyzing} />
            </div>
          </div>

          {/* Chat Interface */}
          <div className="order-1 lg:order-2">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
              <p className="text-sm text-gray-600">Interact with Traceon AI for analysis and insights</p>
            </div>
            <div className="h-full">
              <ChatBot 
                onAnalysisRequest={handleAnalysisRequest} 
                isLoading={isAnalyzing}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2024 Traceon AI. Intelligent log analysis for modern applications.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <span>API Status: Connected</span>
              <span>Integrations: Slack, Sentry, Splunk, Teams</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
