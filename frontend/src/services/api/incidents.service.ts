/**
 * Incidents API Service
 * 
 * All incident-related API calls are centralized here.
 * Replace mock data with actual API calls when backend is ready.
 */

import { API_BASE_URL } from './endpoints';

export interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'investigating' | 'monitoring' | 'resolved';
  timestamp: Date;
  duration: string;
  assignee: string;
  affectedServices: string[];
  metrics: {
    affectedUsers: number;
    errorRate: number;
    responseTime: number;
  };
}

export interface IncidentFilters {
  severity?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface IncidentStats {
  active: number;
  resolved: number;
  avgResponseTime: string;
  total: number;
}

class IncidentsService {
  /**
   * 🔨 MOCK - Get all incidents with optional filters
   * TODO: Replace with actual API call to GET /incidents
   */
  async getIncidents(filters?: IncidentFilters): Promise<Incident[]> {
    // TODO: Uncomment when backend is ready
    // const params = new URLSearchParams(filters as any);
    // const response = await fetch(`${API_BASE_URL}/incidents?${params}`);
    // return response.json();

    // MOCK DATA - Remove when backend is integrated
    return Promise.resolve([
      {
        id: 'INC-2024-001',
        title: 'Database connection pool exhaustion',
        severity: 'critical',
        status: 'investigating',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        duration: '15m',
        assignee: 'Sarah Chen',
        affectedServices: ['OrderService', 'PaymentAPI', 'UserService'],
        metrics: {
          affectedUsers: 1250,
          errorRate: 12.4,
          responseTime: 3200
        }
      },
      {
        id: 'INC-2024-002',
        title: 'Elevated API Response Times in us-west-2',
        severity: 'high',
        status: 'monitoring',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        duration: '32m',
        assignee: 'Mike Torres',
        affectedServices: ['APIGateway', 'AuthService'],
        metrics: {
          affectedUsers: 450,
          errorRate: 3.2,
          responseTime: 1800
        }
      }
    ]);
  }

  /**
   * 🔨 MOCK - Get single incident by ID
   * TODO: Replace with actual API call to GET /incidents/:id
   */
  async getIncidentById(id: string): Promise<Incident | null> {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_BASE_URL}/incidents/${id}`);
    // if (!response.ok) return null;
    // return response.json();

    const incidents = await this.getIncidents();
    return incidents.find(inc => inc.id === id) || null;
  }

  /**
   * ⏳ PENDING - Create new incident
   * TODO: Implement API call to POST /incidents
   */
  async createIncident(data: {
    title: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    affectedServices: string[];
  }): Promise<Incident> {
    // TODO: Implement when backend is ready
    // const response = await fetch(`${API_BASE_URL}/incidents`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return response.json();

    throw new Error('API not implemented: POST /incidents');
  }

  /**
   * ⏳ PENDING - Update incident status
   * TODO: Implement API call to PATCH /incidents/:id/status
   */
  async updateStatus(id: string, status: string): Promise<Incident> {
    // TODO: Implement when backend is ready
    throw new Error('API not implemented: PATCH /incidents/:id/status');
  }

  /**
   * ⏳ PENDING - Add note to incident
   * TODO: Implement API call to POST /incidents/:id/notes
   */
  async addNote(id: string, content: string, author: string): Promise<{ noteId: string }> {
    // TODO: Implement when backend is ready
    throw new Error('API not implemented: POST /incidents/:id/notes');
  }

  /**
   * 🔨 MOCK - Get incident statistics
   * TODO: Replace with actual API call to GET /incidents/stats
   */
  async getStats(timeRange: '24h' | '7d' | '30d' = '24h'): Promise<IncidentStats> {
    // TODO: Uncomment when backend is ready
    // const response = await fetch(`${API_BASE_URL}/incidents/stats?timeRange=${timeRange}`);
    // return response.json();

    // MOCK DATA
    return Promise.resolve({
      active: 12,
      resolved: 28,
      avgResponseTime: '4.2m',
      total: 84
    });
  }
}

export const incidentsService = new IncidentsService();
