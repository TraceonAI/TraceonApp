'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Database,
  TrendingDown,
  Activity,
  ChevronLeft,
  ExternalLink,
  MessageSquare,
  GitBranch,
  FileText,
  Terminal
} from 'lucide-react';

export default function IncidentINC2041() {
  const router = useRouter();

  const incidentData = {
    id: 'INC-2041',
    title: 'S3 bucket access denied errors',
    severity: 'CRITICAL',
    status: 'Resolved',
    createdAt: '2025-01-15 10:22:15',
    resolvedAt: '2025-01-15 11:47:33',
    duration: '1h 25m',
    assignee: 'Sarah Chen',
    affectedServices: ['media-service', 's3-storage', 'cdn-service'],
    rootCause: 'IAM policy misconfiguration after deployment',
    resolution: 'Updated IAM policy to grant required S3 bucket permissions',
    metrics: {
      errorRate: 45.2,
      affectedUsers: 2847,
      requestsBlocked: 18453,
      peakErrorTime: '10:35 AM'
    }
  };

  const timeline = [
    { time: '10:22:15', event: 'Incident detected - S3 403 Forbidden errors spike', type: 'alert', icon: AlertTriangle },
    { time: '10:23:42', event: 'Auto-assigned to on-call engineer Sarah Chen', type: 'assignment', icon: Users },
    { time: '10:25:18', event: 'Investigation started - Checking S3 bucket policies', type: 'investigation', icon: Activity },
    { time: '10:31:05', event: 'Root cause identified - IAM policy mismatch', type: 'finding', icon: FileText },
    { time: '10:35:22', event: 'Fix deployed - Updated IAM policy with correct permissions', type: 'fix', icon: GitBranch },
    { time: '10:42:15', event: 'Monitoring recovery - Error rate decreasing', type: 'monitoring', icon: TrendingDown },
    { time: '11:15:08', event: 'All services recovered - Error rate normalized', type: 'recovery', icon: CheckCircle },
    { time: '11:47:33', event: 'Incident resolved - Post-mortem scheduled', type: 'resolved', icon: CheckCircle }
  ];

  const technicalDetails = {
    errorMessage: 'AccessDenied: User: arn:aws:iam::123456789012:role/media-service is not authorized to perform: s3:PutObject on resource: arn:aws:s3:::prod-media-uploads/*',
    affectedEndpoints: [
      'POST /api/media/upload',
      'PUT /api/media/update',
      'POST /api/avatars/upload'
    ],
    deploymentId: 'deploy-2025-01-15-10-15-22',
    rollbackAvailable: false,
    fixCommit: 'a7f3c9d - Fix: Update IAM policy for S3 bucket access'
  };

  return (
    <ProfessionalDashboardLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium"
          style={{
            color: 'var(--text-secondary)',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-primary)';
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Incidents
        </button>

        {/* Header */}
        <div 
          className="rounded-xl border p-6"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)'
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-mono font-bold" style={{ color: 'var(--text-muted)' }}>
                  {incidentData.id}
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--status-positive-bg)',
                    color: 'var(--status-positive-text)'
                  }}
                >
                  {incidentData.status}
                </span>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: 'var(--status-critical-bg)',
                    color: 'var(--status-critical-text)'
                  }}
                >
                  {incidentData.severity}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {incidentData.title}
              </h1>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Created: {incidentData.createdAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Resolved: {incidentData.resolvedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span>Duration: {incidentData.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {incidentData.assignee}
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Error Rate</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--status-critical-text)' }}>
                {incidentData.metrics.errorRate}%
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Affected Users</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {incidentData.metrics.affectedUsers.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Blocked Requests</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {incidentData.metrics.requestsBlocked.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Peak Error Time</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {incidentData.metrics.peakErrorTime}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="col-span-2 space-y-6">
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Incident Timeline
              </h2>
              <div className="space-y-3">
                {timeline.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 pb-3"
                      style={{ 
                        borderBottom: idx < timeline.length - 1 ? `1px solid var(--border-subtle)` : 'none'
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: item.type === 'resolved' || item.type === 'recovery' ? 'var(--status-positive-bg)' :
                                          item.type === 'alert' ? 'var(--status-critical-bg)' :
                                          'var(--surface-subtle)',
                          color: item.type === 'resolved' || item.type === 'recovery' ? 'var(--status-positive-text)' :
                                 item.type === 'alert' ? 'var(--status-critical-text)' :
                                 'var(--text-secondary)'
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                            {item.time}
                          </span>
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                            style={{
                              backgroundColor: 'var(--surface-subtle)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                          {item.event}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Details */}
            <div 
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5" style={{ color: 'var(--accent-primary)' }} />
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  Technical Details
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>ERROR MESSAGE:</p>
                  <div 
                    className="p-3 rounded-lg font-mono text-xs"
                    style={{
                      backgroundColor: 'var(--surface-default)',
                      color: 'var(--status-critical-text)',
                      border: `1px solid var(--border-default)`
                    }}
                  >
                    {technicalDetails.errorMessage}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>AFFECTED ENDPOINTS:</p>
                  <div className="space-y-1">
                    {technicalDetails.affectedEndpoints.map((endpoint, idx) => (
                      <div 
                        key={idx}
                        className="p-2 rounded-lg font-mono text-xs"
                        style={{
                          backgroundColor: 'var(--surface-subtle)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {endpoint}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>DEPLOYMENT ID:</p>
                    <p className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                      {technicalDetails.deploymentId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>FIX COMMIT:</p>
                    <p className="text-sm font-mono" style={{ color: 'var(--status-positive-text)' }}>
                      {technicalDetails.fixCommit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Root Cause */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Root Cause
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {incidentData.rootCause}
              </p>
            </div>

            {/* Resolution */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Resolution
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {incidentData.resolution}
              </p>
            </div>

            {/* Affected Services */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Affected Services
              </h3>
              <div className="space-y-2">
                {incidentData.affectedServices.map((service, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    style={{
                      backgroundColor: 'var(--surface-subtle)'
                    }}
                  >
                    <Database className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    <span className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div 
              className="rounded-xl border p-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)'
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Actions
              </h3>
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-primary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    View Post-Mortem
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between"
                  style={{
                    backgroundColor: 'var(--surface-subtle)',
                    color: 'var(--text-primary)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    View Discussion
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
