'use client';

import React, { useState } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  Sparkles,
  Copy,
  Play,
  Save,
  Download,
  Code,
  BarChart3,
  Database,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  PlusCircle,
  Trash2
} from 'lucide-react';

interface DashboardConfig {
  id: string;
  name: string;
  platform: string;
  query: string;
  description: string;
  createdAt: Date;
  preview?: any;
}

export default function DashboardBuilderPage() {
  const [userRequest, setUserRequest] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('splunk');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [queryDescription, setQueryDescription] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [savedDashboards, setSavedDashboards] = useState<DashboardConfig[]>([]);

  const platforms = [
    { id: 'splunk', name: 'Splunk', icon: Database },
    { id: 'elasticsearch', name: 'Elasticsearch', icon: Database },
    { id: 'prometheus', name: 'Prometheus', icon: BarChart3 },
    { id: 'grafana', name: 'Grafana', icon: BarChart3 },
    { id: 'datadog', name: 'Datadog', icon: BarChart3 },
    { id: 'custom_sql', name: 'Custom SQL', icon: Code }
  ];

  const exampleRequests = [
    "Show me error rate by service for the last 24 hours",
    "Create a dashboard for API response times with p50, p95, p99",
    "Display HTTP 5xx errors grouped by endpoint",
    "Monitor database connection pool usage across all services",
    "Track user authentication failures over time"
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      if (selectedPlatform === 'splunk') {
        setGeneratedQuery(
          `index=production sourcetype=application_logs level=error\n` +
          `| stats count by service\n` +
          `| sort -count\n` +
          `| timechart span=1h count by service`
        );
        setQueryDescription('This Splunk query searches production logs for errors, counts them by service, and displays the trend over time with 1-hour intervals.');
      } else if (selectedPlatform === 'prometheus') {
        setGeneratedQuery(
          `sum(rate(http_requests_total{job="api"}[5m])) by (status_code)\n` +
          `or\n` +
          `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`
        );
        setQueryDescription('This PromQL query calculates the request rate by status code and the 95th percentile response time.');
      } else {
        setGeneratedQuery(
          `SELECT service, COUNT(*) as error_count\n` +
          `FROM logs\n` +
          `WHERE level = 'error' AND timestamp >= NOW() - INTERVAL '24 hours'\n` +
          `GROUP BY service\n` +
          `ORDER BY error_count DESC`
        );
        setQueryDescription('This SQL query retrieves error counts by service from the last 24 hours.');
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 1500);
  };

  const handleSave = () => {
    const newDashboard: DashboardConfig = {
      id: `dash_${Date.now()}`,
      name: userRequest.substring(0, 50) || 'Unnamed Dashboard',
      platform: selectedPlatform,
      query: generatedQuery,
      description: queryDescription,
      createdAt: new Date()
    };
    setSavedDashboards([newDashboard, ...savedDashboards]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedQuery);
  };

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <Sparkles className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
              AI Dashboard Builder
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Describe what you want to visualize, and AI will generate the query for you
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-opacity-80 hover:shadow-sm active:scale-98 flex items-center gap-2"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                border: `1px solid var(--border-default)`
              }}
            >
              <Eye className="w-4 h-4" />
              My Dashboards ({savedDashboards.length})
            </button>
          </div>
        </div>

        {/* Main Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Input & Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selection */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Select Platform
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map(platform => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatform === platform.id;
                  
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--surface-subtle)',
                        borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-default)',
                        color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)'
                      }}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{platform.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Request Input */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Describe Your Dashboard
              </h3>
              
              <textarea
                value={userRequest}
                onChange={(e) => setUserRequest(e.target.value)}
                placeholder="Example: Create a dashboard showing error rates by service for the last 24 hours..."
                className="w-full p-4 rounded-lg border outline-none resize-none font-medium"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--input-text)',
                  minHeight: '150px'
                }}
              />

              <div className="mt-4">
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Quick Examples:
                </p>
                <div className="flex flex-wrap gap-2">
                  {exampleRequests.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUserRequest(example)}
                      className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:shadow-sm hover:bg-opacity-80"
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        border: `1px solid var(--border-default)`,
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {example.substring(0, 40)}...
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!userRequest || isGenerating}
                className="w-full mt-6 px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--button-primary-bg)',
                  color: 'var(--button-primary-text)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Query...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Dashboard Query
                  </>
                )}
              </button>
            </div>

            {/* Generated Query */}
            {generatedQuery && (
              <div 
                className="p-6 rounded-xl border animate-in fade-in slide-in-from-bottom-4"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--accent-primary)',
                  boxShadow: `0 0 20px var(--accent-primary)30`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--status-positive)' }} />
                    Generated Query
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-opacity-80 hover:shadow-sm flex items-center gap-1"
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:brightness-110 hover:shadow-sm flex items-center gap-1"
                      style={{
                        backgroundColor: 'var(--status-positive)',
                        color: 'var(--text-inverse)'
                      }}
                    >
                      <Save className="w-3 h-3" />
                      Save
                    </button>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg mb-4"
                  style={{ backgroundColor: 'var(--surface-default)' }}
                >
                  <pre 
                    className="text-sm font-mono overflow-x-auto"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {generatedQuery}
                  </pre>
                </div>

                <div 
                  className="p-3 rounded-lg mb-4 flex items-start gap-2"
                  style={{ backgroundColor: 'var(--status-info-bg)' }}
                >
                  <AlertCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-info)' }} />
                  <p className="text-xs" style={{ color: 'var(--status-info-text)' }}>
                    {queryDescription}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:brightness-110 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--text-inverse)'
                    }}
                  >
                    {isExecuting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Execute in TraceonAI
                      </>
                    )}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-opacity-80 hover:shadow-sm active:scale-98 flex items-center gap-2"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      border: `1px solid var(--border-default)`,
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Use in {platforms.find(p => p.id === selectedPlatform)?.name}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Saved Dashboards */}
          <div className="space-y-4">
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Saved Dashboards
              </h3>

              {savedDashboards.length === 0 ? (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    No saved dashboards yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {savedDashboards.map((dashboard) => (
                    <div
                      key={dashboard.id}
                      className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:border-opacity-80 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        borderColor: 'var(--border-subtle)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                          {dashboard.name}
                        </h4>
                        <button
                          onClick={() => setSavedDashboards(savedDashboards.filter(d => d.id !== dashboard.id))}
                          className="text-xs p-1 rounded hover:bg-red-500/10"
                          style={{ color: 'var(--status-critical)' }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--accent-primary)',
                            color: 'var(--text-inverse)'
                          }}
                        >
                          {platforms.find(p => p.id === dashboard.platform)?.name}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {dashboard.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {dashboard.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips */}
            <div 
              className="p-6 rounded-xl border"
              style={{
                backgroundColor: 'var(--status-info-bg)',
                borderColor: 'var(--status-info)'
              }}
            >
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--status-info-text)' }}>
                <Zap className="w-4 h-4" />
                Pro Tips
              </h4>
              <ul className="space-y-2 text-xs" style={{ color: 'var(--status-info-text)' }}>
                <li>• Be specific about time ranges and metrics</li>
                <li>• Mention aggregation methods (avg, sum, count)</li>
                <li>• Specify grouping dimensions</li>
                <li>• Include threshold values if needed</li>
                <li>• You can execute queries here or copy to your platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
