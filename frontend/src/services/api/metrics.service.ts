/**
 * Metrics API Service
 * 
 * All metrics-related API calls are centralized here.
 * Replace mock data with actual API calls when backend is ready.
 */

import { API_BASE_URL } from './endpoints';

export interface HTTPStatusMetrics {
  [service: string]: {
    '2xx': number;
    '3xx': number;
    '4xx': number;
    '5xx': number;
  };
}

export interface HealthMetric {
  name: string;
  uptime: number;
  lastCheck: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  pingSuccess: number;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  activeConnections: number;
  requestsPerSec: number;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  labels?: Record<string, string>;
}

export interface ServiceDependency {
  name: string;
  health: number;
  latency: number;
  throughput: string;
  status: 'healthy' | 'degraded' | 'down';
}

class MetricsService {
  /**
   * 🔨 MOCK - Get HTTP status code distribution
   * TODO: Replace with actual API call to GET /metrics/http-status
   */
  async getHTTPStatus(service?: string, timeRange: '1h' | '24h' | '7d' = '24h'): Promise<HTTPStatusMetrics> {
    // TODO: Uncomment when backend is ready
    // const params = new URLSearchParams({ timeRange });
    // if (service) params.append('service', service);
    // const response = await fetch(`${API_BASE_URL}/metrics/http-status?${params}`);
    // return response.json();

    // MOCK DATA
    return Promise.resolve({
      'OrderService': { '2xx': 8523, '3xx': 234, '4xx': 89, '5xx': 23 },
      'PaymentAPI': { '2xx': 6521, '3xx': 145, '4xx': 56, '5xx': 8 },
      'AuthService': { '2xx': 12340, '3xx': 456, '4xx': 123, '5xx': 12 },
      'NotificationService': { '2xx': 4231, '3xx': 98, '4xx': 45, '5xx': 5 }
    });
  }

  /**
   * 🔨 MOCK - Get service health monitoring data
   * TODO: Replace with actual API call to GET /metrics/health
   */
  async getHealthMetrics(services?: string[]): Promise<HealthMetric[]> {
    // TODO: Uncomment when backend is ready
    // const params = services ? `?services=${services.join(',')}` : '';
    // const response = await fetch(`${API_BASE_URL}/metrics/health${params}`);
    // return response.json();

    // MOCK DATA
    return Promise.resolve([
      { name: 'OrderService', uptime: 99.98, lastCheck: '12s ago', status: 'healthy', responseTime: 145, pingSuccess: 99.97 },
      { name: 'PaymentAPI', uptime: 99.95, lastCheck: '25s ago', status: 'healthy', responseTime: 180, pingSuccess: 99.94 },
      { name: 'AuthService', uptime: 99.99, lastCheck: '8s ago', status: 'healthy', responseTime: 89, pingSuccess: 99.98 },
      { name: 'NotificationService', uptime: 98.50, lastCheck: '45s ago', status: 'degraded', responseTime: 450, pingSuccess: 98.45 }
    ]);
  }

  /**
   * 🔨 MOCK - Get system-wide metrics
   * TODO: Replace with actual API call to GET /metrics/system
   */
  async getSystemMetrics(): Promise<SystemMetrics> {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_BASE_URL}/metrics/system`);
    // return response.json();

    // MOCK DATA
    return Promise.resolve({
      cpu: 45.2,
      memory: 68.5,
      activeConnections: 1248,
      requestsPerSec: 3420
    });
  }

  /**
   * ⏳ PENDING - Get time-series metrics
   * TODO: Implement API call to POST /metrics/timeseries
   */
  async getTimeSeries(params: {
    metric: string;
    aggregation: 'avg' | 'sum' | 'min' | 'max' | 'p50' | 'p95' | 'p99';
    interval: '1m' | '5m' | '15m' | '1h';
    startTime: string;
    endTime: string;
    groupBy?: string[];
  }): Promise<TimeSeriesData[]> {
    // TODO: Implement when backend is ready
    // const response = await fetch(`${API_BASE_URL}/metrics/timeseries`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(params)
    // });
    // return response.json();

    throw new Error('API not implemented: POST /metrics/timeseries');
  }

  /**
   * 🔨 MOCK - Get service dependencies health
   * TODO: Replace with actual API call to GET /metrics/dependencies
   */
  async getDependencies(): Promise<ServiceDependency[]> {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_BASE_URL}/metrics/dependencies`);
    // return response.json();

    // MOCK DATA
    return Promise.resolve([
      { name: 'PostgreSQL', health: 99, latency: 12, throughput: '2.4K/s', status: 'healthy' },
      { name: 'Redis Cache', health: 100, latency: 2, throughput: '15K/s', status: 'healthy' },
      { name: 'API Gateway', health: 98, latency: 45, throughput: '4.2K/s', status: 'healthy' },
      { name: 'Message Queue', health: 97, latency: 8, throughput: '1.2K/s', status: 'healthy' },
      { name: 'Payment API', health: 95, latency: 180, throughput: '450/s', status: 'healthy' },
      { name: 'Email Service', health: 89, latency: 350, throughput: '120/s', status: 'degraded' }
    ]);
  }
}

export const metricsService = new MetricsService();
