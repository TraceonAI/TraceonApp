'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Database, GitBranch } from 'lucide-react';

export interface AnalysisData {
  id: string;
  title: string;
  status: 'analyzing' | 'completed' | 'error';
  timestamp: Date;
  summary?: string;
  rootCause?: string;
  affectedSystems?: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendations?: string[];
  relatedIncidents?: string[];
  logEntries?: {
    timestamp: string;
    level: string;
    message: string;
    source: string;
  }[];
}

interface AnalysisDisplayProps {
  analysis: AnalysisData | null;
  isLoading?: boolean;
}

export default function AnalysisDisplay({ analysis, isLoading = false }: AnalysisDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Selected</h3>
        <p className="text-gray-500">
          Enter an analysis key in the chat to begin log analysis and root cause investigation.
        </p>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzing': return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{analysis.title}</h2>
          <div className="flex items-center space-x-2">
            {getStatusIcon(analysis.status)}
            <span className="text-sm text-gray-600 capitalize">{analysis.status}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {analysis.timestamp.toLocaleString()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(analysis.severity)}`}>
            {analysis.severity.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Summary
          </h3>
          <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{analysis.summary}</p>
        </div>
      )}

      {/* Root Cause */}
      {analysis.rootCause && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
            Root Cause Analysis
          </h3>
          <p className="text-gray-700 bg-red-50 p-3 rounded-lg">{analysis.rootCause}</p>
        </div>
      )}

      {/* Affected Systems */}
      {analysis.affectedSystems && analysis.affectedSystems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Affected Systems</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.affectedSystems.map((system, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {system}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Incidents */}
      {analysis.relatedIncidents && analysis.relatedIncidents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <GitBranch className="w-5 h-5 mr-2 text-purple-500" />
            Related Incidents
          </h3>
          <div className="space-y-1">
            {analysis.relatedIncidents.map((incident, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm mr-2 mb-1"
              >
                {incident}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Log Entries Preview */}
      {analysis.logEntries && analysis.logEntries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Log Entries</h3>
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 max-h-60 overflow-y-auto font-mono text-sm">
            {analysis.logEntries.slice(0, 10).map((entry, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-500">[{entry.timestamp}]</span>{' '}
                <span className={`font-bold ${
                  entry.level === 'ERROR' ? 'text-red-400' :
                  entry.level === 'WARN' ? 'text-yellow-400' :
                  entry.level === 'INFO' ? 'text-blue-400' : 'text-green-400'
                }`}>
                  {entry.level}
                </span>{' '}
                <span className="text-purple-400">[{entry.source}]</span>{' '}
                <span>{entry.message}</span>
              </div>
            ))}
            {analysis.logEntries.length > 10 && (
              <div className="text-gray-500 text-center mt-2">
                ... and {analysis.logEntries.length - 10} more entries
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
