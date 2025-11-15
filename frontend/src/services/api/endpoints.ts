/**
 * API Endpoints Catalog
 * 
 * This file contains ALL backend API endpoints that need to be integrated.
 * Each endpoint is documented with its purpose, required parameters, and expected responses.
 * 
 * STATUS LEGEND:
 * ✅ IMPLEMENTED - Backend endpoint exists and is integrated
 * 🔨 MOCK - Currently using mock data, needs backend integration
 * ⏳ PENDING - Not yet implemented, needs backend development
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  
  // ==================== INCIDENTS ====================
  INCIDENTS: {
    // 🔨 MOCK - Get all incidents with optional filters
    LIST: {
      method: 'GET',
      path: '/incidents',
      status: 'MOCK',
      params: {
        severity: 'critical | high | medium | low | all',
        status: 'active | investigating | monitoring | resolved | all',
        page: 'number',
        limit: 'number'
      },
      returns: 'Incident[]'
    },
    
    // 🔨 MOCK - Get single incident by ID
    GET_BY_ID: {
      method: 'GET',
      path: '/incidents/:id',
      status: 'MOCK',
      params: { id: 'string' },
      returns: 'Incident'
    },
    
    // ⏳ PENDING - Create new incident
    CREATE: {
      method: 'POST',
      path: '/incidents',
      status: 'PENDING',
      body: {
        title: 'string',
        severity: 'critical | high | medium | low',
        description: 'string',
        affectedServices: 'string[]'
      },
      returns: 'Incident'
    },
    
    // ⏳ PENDING - Update incident status
    UPDATE_STATUS: {
      method: 'PATCH',
      path: '/incidents/:id/status',
      status: 'PENDING',
      params: { id: 'string' },
      body: { status: 'active | investigating | monitoring | resolved' },
      returns: 'Incident'
    },
    
    // ⏳ PENDING - Add note to incident
    ADD_NOTE: {
      method: 'POST',
      path: '/incidents/:id/notes',
      status: 'PENDING',
      params: { id: 'string' },
      body: { content: 'string', author: 'string' },
      returns: '{ noteId: string }'
    },
    
    // 🔨 MOCK - Get incident statistics
    STATS: {
      method: 'GET',
      path: '/incidents/stats',
      status: 'MOCK',
      params: { timeRange: '24h | 7d | 30d' },
      returns: '{ active: number, resolved: number, avgResponseTime: string, total: number }'
    }
  },

  // ==================== LOGS ====================
  LOGS: {
    // 🔨 MOCK - Search logs with filters
    SEARCH: {
      method: 'POST',
      path: '/logs/search',
      status: 'MOCK',
      body: {
        query: 'string',
        level: 'error | warn | info | debug | all',
        services: 'string[]',
        correlationId: 'string (optional)',
        startTime: 'ISO timestamp',
        endTime: 'ISO timestamp',
        limit: 'number'
      },
      returns: 'LogEntry[]'
    },
    
    // 🔨 MOCK - Stream live logs (SSE or WebSocket)
    STREAM: {
      method: 'GET',
      path: '/logs/stream',
      status: 'MOCK',
      params: { 
        level: 'error | warn | info | debug',
        services: 'comma-separated services'
      },
      returns: 'Server-Sent Events stream'
    },
    
    // ⏳ PENDING - Export logs to file
    EXPORT: {
      method: 'POST',
      path: '/logs/export',
      status: 'PENDING',
      body: {
        filters: 'SearchFilters',
        format: 'json | csv | txt'
      },
      returns: 'Blob (file download)'
    },
    
    // 🔨 MOCK - Get log statistics
    STATS: {
      method: 'GET',
      path: '/logs/stats',
      status: 'MOCK',
      params: { timeRange: '1h | 24h | 7d' },
      returns: '{ logsPerSec: number, errorRate: number, services: number, dataIngested: string }'
    },
    
    // ⏳ PENDING - Get logs by correlation ID
    BY_CORRELATION_ID: {
      method: 'GET',
      path: '/logs/correlation/:correlationId',
      status: 'PENDING',
      params: { correlationId: 'string' },
      returns: 'LogEntry[]'
    }
  },

  // ==================== METRICS ====================
  METRICS: {
    // 🔨 MOCK - Get HTTP status code distribution
    HTTP_STATUS: {
      method: 'GET',
      path: '/metrics/http-status',
      status: 'MOCK',
      params: { 
        service: 'string',
        timeRange: '1h | 24h | 7d'
      },
      returns: '{ [service: string]: { "2xx": number, "3xx": number, "4xx": number, "5xx": number } }'
    },
    
    // 🔨 MOCK - Get service health monitoring data
    HEALTH: {
      method: 'GET',
      path: '/metrics/health',
      status: 'MOCK',
      params: { services: 'comma-separated service names' },
      returns: 'HealthMetric[]'
    },
    
    // 🔨 MOCK - Get system-wide metrics
    SYSTEM: {
      method: 'GET',
      path: '/metrics/system',
      status: 'MOCK',
      returns: '{ cpu: number, memory: number, activeConnections: number, requestsPerSec: number }'
    },
    
    // ⏳ PENDING - Get time-series metrics
    TIME_SERIES: {
      method: 'POST',
      path: '/metrics/timeseries',
      status: 'PENDING',
      body: {
        metric: 'string (metric name)',
        aggregation: 'avg | sum | min | max | p50 | p95 | p99',
        interval: '1m | 5m | 15m | 1h',
        startTime: 'ISO timestamp',
        endTime: 'ISO timestamp',
        groupBy: 'string[] (optional)'
      },
      returns: 'TimeSeriesData[]'
    },
    
    // 🔨 MOCK - Get service dependencies health
    DEPENDENCIES: {
      method: 'GET',
      path: '/metrics/dependencies',
      status: 'MOCK',
      returns: 'ServiceDependency[]'
    }
  },

  // ==================== QUERY STUDIO ====================
  QUERY_STUDIO: {
    // ⏳ PENDING - Execute custom query
    EXECUTE: {
      method: 'POST',
      path: '/query/execute',
      status: 'PENDING',
      body: {
        query: 'string (SQL, PromQL, or custom query language)',
        datasource: 'prometheus | elasticsearch | postgres | custom',
        parameters: 'Record<string, any>'
      },
      returns: '{ results: any[], executionTime: number, rowCount: number }'
    },
    
    // ⏳ PENDING - Save query template
    SAVE_QUERY: {
      method: 'POST',
      path: '/query/templates',
      status: 'PENDING',
      body: {
        name: 'string',
        description: 'string',
        query: 'string',
        datasource: 'string',
        tags: 'string[]'
      },
      returns: '{ queryId: string }'
    },
    
    // 🔨 MOCK - Get saved query templates
    GET_TEMPLATES: {
      method: 'GET',
      path: '/query/templates',
      status: 'MOCK',
      params: { category: 'string (optional)' },
      returns: 'QueryTemplate[]'
    },
    
    // ⏳ PENDING - AI-assisted query generation
    AI_GENERATE: {
      method: 'POST',
      path: '/query/ai-generate',
      status: 'PENDING',
      body: {
        prompt: 'string (natural language description)',
        datasource: 'string',
        context: 'Record<string, any> (optional)'
      },
      returns: '{ query: string, explanation: string, confidence: number }'
    }
  },

  // ==================== AI AGENTS ====================
  AGENTS: {
    // 🔨 MOCK - List all AI agents
    LIST: {
      method: 'GET',
      path: '/agents',
      status: 'MOCK',
      returns: 'Agent[]'
    },
    
    // ⏳ PENDING - Get agent activity/history
    GET_ACTIVITY: {
      method: 'GET',
      path: '/agents/:agentId/activity',
      status: 'PENDING',
      params: { 
        agentId: 'string',
        limit: 'number',
        offset: 'number'
      },
      returns: 'AgentActivity[]'
    },
    
    // ⏳ PENDING - Send message to agent
    SEND_MESSAGE: {
      method: 'POST',
      path: '/agents/:agentId/message',
      status: 'PENDING',
      params: { agentId: 'string' },
      body: {
        message: 'string',
        context: 'Record<string, any> (optional)'
      },
      returns: '{ response: string, actions: Action[], confidence: number }'
    },
    
    // ⏳ PENDING - Trigger agent analysis
    TRIGGER_ANALYSIS: {
      method: 'POST',
      path: '/agents/:agentId/analyze',
      status: 'PENDING',
      params: { agentId: 'string' },
      body: {
        target: 'incident | service | metric',
        targetId: 'string',
        options: 'Record<string, any>'
      },
      returns: '{ analysisId: string, status: string }'
    }
  },

  // ==================== RUNBOOKS ====================
  RUNBOOKS: {
    // 🔨 MOCK - Get all runbooks
    LIST: {
      method: 'GET',
      path: '/runbooks',
      status: 'MOCK',
      params: { 
        category: 'string (optional)',
        tag: 'string (optional)'
      },
      returns: 'Runbook[]'
    },
    
    // 🔨 MOCK - Get runbook by ID
    GET_BY_ID: {
      method: 'GET',
      path: '/runbooks/:id',
      status: 'MOCK',
      params: { id: 'string' },
      returns: 'Runbook'
    },
    
    // ⏳ PENDING - Execute runbook
    EXECUTE: {
      method: 'POST',
      path: '/runbooks/:id/execute',
      status: 'PENDING',
      params: { id: 'string' },
      body: {
        parameters: 'Record<string, any>',
        dryRun: 'boolean'
      },
      returns: '{ executionId: string, status: string, steps: StepResult[] }'
    },
    
    // ⏳ PENDING - Get execution history
    EXECUTION_HISTORY: {
      method: 'GET',
      path: '/runbooks/:id/executions',
      status: 'PENDING',
      params: { 
        id: 'string',
        limit: 'number',
        status: 'success | failed | running'
      },
      returns: 'RunbookExecution[]'
    }
  },

  // ==================== NOTIFICATIONS ====================
  NOTIFICATIONS: {
    // 🔨 MOCK - Get all notifications
    LIST: {
      method: 'GET',
      path: '/notifications',
      status: 'MOCK',
      params: {
        status: 'unread | read | all',
        type: 'alert | info | warning | success',
        limit: 'number'
      },
      returns: 'Notification[]'
    },
    
    // ⏳ PENDING - Mark as read
    MARK_READ: {
      method: 'PATCH',
      path: '/notifications/:id/read',
      status: 'PENDING',
      params: { id: 'string' },
      returns: '{ success: boolean }'
    },
    
    // ⏳ PENDING - Mark all as read
    MARK_ALL_READ: {
      method: 'PATCH',
      path: '/notifications/read-all',
      status: 'PENDING',
      returns: '{ success: boolean, count: number }'
    },
    
    // ⏳ PENDING - Delete notification
    DELETE: {
      method: 'DELETE',
      path: '/notifications/:id',
      status: 'PENDING',
      params: { id: 'string' },
      returns: '{ success: boolean }'
    }
  },

  // ==================== INTEGRATIONS ====================
  INTEGRATIONS: {
    // 🔨 MOCK - Get all integrations
    LIST: {
      method: 'GET',
      path: '/integrations',
      status: 'MOCK',
      returns: 'Integration[]'
    },
    
    // ⏳ PENDING - Test integration connection
    TEST: {
      method: 'POST',
      path: '/integrations/:id/test',
      status: 'PENDING',
      params: { id: 'string' },
      returns: '{ success: boolean, message: string, latency: number }'
    },
    
    // ⏳ PENDING - Update integration config
    UPDATE_CONFIG: {
      method: 'PATCH',
      path: '/integrations/:id/config',
      status: 'PENDING',
      params: { id: 'string' },
      body: { config: 'Record<string, any>' },
      returns: 'Integration'
    },
    
    // ⏳ PENDING - Enable/disable integration
    TOGGLE: {
      method: 'PATCH',
      path: '/integrations/:id/toggle',
      status: 'PENDING',
      params: { id: 'string' },
      body: { enabled: 'boolean' },
      returns: 'Integration'
    }
  },

  // ==================== REPORTS ====================
  REPORTS: {
    // 🔨 MOCK - Get all reports
    LIST: {
      method: 'GET',
      path: '/reports',
      status: 'MOCK',
      params: { 
        type: 'incident | performance | slo | custom',
        period: 'daily | weekly | monthly'
      },
      returns: 'Report[]'
    },
    
    // ⏳ PENDING - Generate report
    GENERATE: {
      method: 'POST',
      path: '/reports/generate',
      status: 'PENDING',
      body: {
        type: 'string',
        period: 'string',
        startDate: 'ISO timestamp',
        endDate: 'ISO timestamp',
        filters: 'Record<string, any>'
      },
      returns: '{ reportId: string, status: string }'
    },
    
    // ⏳ PENDING - Download report
    DOWNLOAD: {
      method: 'GET',
      path: '/reports/:id/download',
      status: 'PENDING',
      params: { 
        id: 'string',
        format: 'pdf | excel | json'
      },
      returns: 'Blob (file download)'
    }
  },

  // ==================== DASHBOARD BUILDER ====================
  DASHBOARD_BUILDER: {
    // ⏳ PENDING - AI-generate dashboard
    AI_GENERATE: {
      method: 'POST',
      path: '/dashboards/ai-generate',
      status: 'PENDING',
      body: {
        prompt: 'string (natural language description)',
        datasources: 'string[]',
        preferences: 'Record<string, any>'
      },
      returns: '{ dashboardId: string, config: DashboardConfig, queries: Query[] }'
    },
    
    // ⏳ PENDING - Save dashboard
    SAVE: {
      method: 'POST',
      path: '/dashboards',
      status: 'PENDING',
      body: {
        name: 'string',
        config: 'DashboardConfig',
        queries: 'Query[]',
        tags: 'string[]'
      },
      returns: '{ dashboardId: string }'
    },
    
    // 🔨 MOCK - Get saved dashboards
    LIST: {
      method: 'GET',
      path: '/dashboards',
      status: 'MOCK',
      returns: 'Dashboard[]'
    }
  },

  // ==================== AUTHENTICATION ====================
  AUTH: {
    // ⏳ PENDING - Login
    LOGIN: {
      method: 'POST',
      path: '/auth/login',
      status: 'PENDING',
      body: {
        email: 'string',
        password: 'string'
      },
      returns: '{ token: string, user: User, expiresIn: number }'
    },
    
    // ⏳ PENDING - Logout
    LOGOUT: {
      method: 'POST',
      path: '/auth/logout',
      status: 'PENDING',
      returns: '{ success: boolean }'
    },
    
    // ⏳ PENDING - Refresh token
    REFRESH: {
      method: 'POST',
      path: '/auth/refresh',
      status: 'PENDING',
      body: { refreshToken: 'string' },
      returns: '{ token: string, expiresIn: number }'
    },
    
    // ⏳ PENDING - Get current user
    ME: {
      method: 'GET',
      path: '/auth/me',
      status: 'PENDING',
      returns: 'User'
    }
  },

  // ==================== SETTINGS ====================
  SETTINGS: {
    // ⏳ PENDING - Get user preferences
    GET_PREFERENCES: {
      method: 'GET',
      path: '/settings/preferences',
      status: 'PENDING',
      returns: 'UserPreferences'
    },
    
    // ⏳ PENDING - Update preferences
    UPDATE_PREFERENCES: {
      method: 'PATCH',
      path: '/settings/preferences',
      status: 'PENDING',
      body: { preferences: 'Partial<UserPreferences>' },
      returns: 'UserPreferences'
    },
    
    // ⏳ PENDING - Generate API key
    GENERATE_API_KEY: {
      method: 'POST',
      path: '/settings/api-keys',
      status: 'PENDING',
      body: {
        name: 'string',
        permissions: 'string[]',
        expiresIn: 'number (days)'
      },
      returns: '{ keyId: string, key: string, expiresAt: string }'
    },
    
    // ⏳ PENDING - Revoke API key
    REVOKE_API_KEY: {
      method: 'DELETE',
      path: '/settings/api-keys/:keyId',
      status: 'PENDING',
      params: { keyId: 'string' },
      returns: '{ success: boolean }'
    }
  },

  // ==================== TOPOLOGY ====================
  TOPOLOGY: {
    // 🔨 MOCK - Get service topology
    GET_GRAPH: {
      method: 'GET',
      path: '/topology/graph',
      status: 'MOCK',
      returns: '{ nodes: ServiceNode[], edges: ServiceEdge[] }'
    },
    
    // ⏳ PENDING - Get service dependencies
    GET_DEPENDENCIES: {
      method: 'GET',
      path: '/topology/dependencies/:serviceId',
      status: 'PENDING',
      params: { serviceId: 'string' },
      returns: '{ upstream: Service[], downstream: Service[] }'
    }
  }
};

export { API_BASE_URL };
