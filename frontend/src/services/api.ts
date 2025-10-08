import { AnalysisData } from '@/components/AnalysisDisplay';
import { AnalysisRequest, AnalysisResponse, Integration, SystemMetrics } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class APIService {
  private async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Analysis endpoints
  async requestAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
    return this.fetch('/analysis', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getAnalysis(id: string): Promise<AnalysisData> {
    return this.fetch(`/analysis/${id}`);
  }

  async getAnalysisHistory(): Promise<AnalysisData[]> {
    return this.fetch('/analysis/history');
  }

  // Chat endpoints
  async sendChatMessage(message: string, analysisId?: string): Promise<{ response: string }> {
    return this.fetch('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, analysisId }),
    });
  }

  // Integration endpoints
  async getIntegrations(): Promise<Integration[]> {
    return this.fetch('/integrations');
  }

  async updateIntegration(id: string, config: Record<string, any>): Promise<Integration> {
    return this.fetch(`/integrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ config }),
    });
  }

  async testIntegration(id: string): Promise<{ status: string; message?: string }> {
    return this.fetch(`/integrations/${id}/test`, {
      method: 'POST',
    });
  }

  // System endpoints
  async getSystemMetrics(): Promise<SystemMetrics> {
    return this.fetch('/system/metrics');
  }

  async getSystemHealth(): Promise<{ status: string; services: Record<string, string> }> {
    return this.fetch('/system/health');
  }

  // Log endpoints
  async searchLogs(query: string, timeRange?: { start: Date; end: Date }): Promise<any[]> {
    const params = new URLSearchParams({ query });
    if (timeRange) {
      params.append('start', timeRange.start.toISOString());
      params.append('end', timeRange.end.toISOString());
    }
    return this.fetch(`/logs/search?${params}`);
  }

  // Mock data for development
  async getMockAnalysis(key: string): Promise<AnalysisData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: key,
      title: `Analysis for ${key}`,
      status: 'completed',
      timestamp: new Date(),
      summary: `Comprehensive analysis completed for ${key}. The system detected multiple issues across different service layers that contributed to the incident.`,
      rootCause: 'Primary cause identified as database connection pool exhaustion triggered by a memory leak in the user authentication service, compounded by insufficient circuit breaker configuration.',
      affectedSystems: ['Database Server', 'API Gateway', 'User Service', 'Payment Service', 'Notification Service'],
      severity: key.toLowerCase().includes('critical') ? 'critical' : 
                key.toLowerCase().includes('high') ? 'high' : 
                key.toLowerCase().includes('low') ? 'low' : 'medium',
      recommendations: [
        'Implement proper connection pooling with idle timeout configuration',
        'Add memory leak detection and alerting for all microservices',
        'Configure circuit breakers with appropriate failure thresholds',
        'Implement graceful degradation patterns for non-critical services',
        'Set up real-time monitoring for database connection metrics',
        'Deploy canary releases to catch issues before full rollout'
      ],
      relatedIncidents: ['INC-2024-001', 'INC-2024-003', 'CR-2024-015', 'P1-2024-007'],
      logEntries: [
        {
          timestamp: '2024-10-08T14:30:25Z',
          level: 'ERROR',
          message: 'OutOfMemoryError: Java heap space in AuthenticationService',
          source: 'user-service'
        },
        {
          timestamp: '2024-10-08T14:30:20Z',
          level: 'ERROR',
          message: 'Database connection timeout after 30s - pool exhausted',
          source: 'database-pool'
        },
        {
          timestamp: '2024-10-08T14:30:15Z',
          level: 'WARN',
          message: 'Circuit breaker OPEN for PaymentService - 10 consecutive failures',
          source: 'api-gateway'
        },
        {
          timestamp: '2024-10-08T14:30:10Z',
          level: 'ERROR',
          message: 'Failed to acquire database connection after 3 retries',
          source: 'payment-service'
        },
        {
          timestamp: '2024-10-08T14:30:05Z',
          level: 'WARN',
          message: 'High memory usage detected: 95% heap utilization',
          source: 'user-service'
        },
        {
          timestamp: '2024-10-08T14:30:00Z',
          level: 'INFO',
          message: 'Processing authentication request for user session',
          source: 'user-service'
        },
        {
          timestamp: '2024-10-08T14:29:58Z',
          level: 'WARN',
          message: 'Slow query detected: SELECT took 18.7s to execute',
          source: 'database'
        },
        {
          timestamp: '2024-10-08T14:29:55Z',
          level: 'ERROR',
          message: 'HTTP 503 Service Unavailable from upstream service',
          source: 'api-gateway'
        }
      ]
    };
  }
}

export const apiService = new APIService();
