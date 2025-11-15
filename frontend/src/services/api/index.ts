/**
 * Centralized API Services
 * 
 * All API calls for the TraceonAI dashboard are organized here.
 * Each service is responsible for a specific domain (incidents, logs, metrics, etc.)
 * 
 * USAGE:
 * import { incidentsService, logsService, metricsService } from '@/services/api';
 * 
 * const incidents = await incidentsService.getIncidents();
 * const logs = await logsService.searchLogs({ level: 'error' });
 * 
 * INTEGRATION STATUS:
 * ✅ IMPLEMENTED - Backend integrated and working
 * 🔨 MOCK - Using mock data, needs backend integration
 * ⏳ PENDING - Not implemented yet, throws error
 */

// Export all service instances
export { incidentsService } from './incidents.service';
export { logsService } from './logs.service';
export { metricsService } from './metrics.service';

// Export types for convenience
export type { Incident, IncidentFilters, IncidentStats } from './incidents.service';
export type { LogEntry, LogSearchFilters, LogStats } from './logs.service';
export type { 
  HTTPStatusMetrics, 
  HealthMetric, 
  SystemMetrics, 
  TimeSeriesData, 
  ServiceDependency 
} from './metrics.service';

// Export endpoints catalog for reference
export { API_ENDPOINTS, API_BASE_URL } from './endpoints';
