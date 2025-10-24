# Backend API Integration Guide

This document provides a complete overview of all backend APIs that need to be integrated with the TraceonAI dashboard.

## 📁 Project Structure

```
frontend/src/services/api/
├── endpoints.ts              # Complete catalog of ALL backend endpoints
├── incidents.service.ts      # Incident management APIs
├── logs.service.ts           # Log search and streaming APIs
├── metrics.service.ts        # Metrics and monitoring APIs
└── index.ts                  # Main export file
```

## 🎯 Integration Status

### Legend
- ✅ **IMPLEMENTED** - Backend integrated and working
- 🔨 **MOCK** - Using mock data, needs backend integration
- ⏳ **PENDING** - Not implemented yet, throws error

---

## 📋 Required Backend Endpoints

### 1. INCIDENTS (Priority: HIGH)

#### 🔨 GET /incidents
**Status:** Using mock data  
**Purpose:** List all incidents with optional filters  
**Frontend Component:** `/dashboard/incidents`

**Request:**
```typescript
GET /api/incidents?severity=critical&status=active&page=1&limit=20
```

**Expected Response:**
```typescript
Incident[] = [
  {
    id: "INC-2024-001",
    title: "Database connection pool exhaustion",
    severity: "critical" | "high" | "medium" | "low",
    status: "active" | "investigating" | "monitoring" | "resolved",
    timestamp: "2024-10-22T14:30:00Z",
    duration: "15m",
    assignee: "Sarah Chen",
    affectedServices: ["OrderService", "PaymentAPI"],
    metrics: {
      affectedUsers: 1250,
      errorRate: 12.4,
      responseTime: 3200
    }
  }
]
```

**Integration File:** `frontend/src/services/api/incidents.service.ts`  
**Function:** `incidentsService.getIncidents()`

---

#### 🔨 GET /incidents/:id
**Status:** Using mock data  
**Purpose:** Get detailed incident information

**Request:**
```typescript
GET /api/incidents/INC-2024-001
```

**Expected Response:** Same as Incident type above

**Integration File:** `frontend/src/services/api/incidents.service.ts`  
**Function:** `incidentsService.getIncidentById()`

---

#### ⏳ POST /incidents
**Status:** Not implemented  
**Purpose:** Create new incident  
**Priority:** MEDIUM

**Request:**
```typescript
POST /api/incidents
Content-Type: application/json

{
  title: "string",
  severity: "critical" | "high" | "medium" | "low",
  description: "string",
  affectedServices: ["ServiceA", "ServiceB"]
}
```

**Expected Response:** Incident object

**Integration File:** `frontend/src/services/api/incidents.service.ts`  
**Function:** `incidentsService.createIncident()`

---

#### ⏳ PATCH /incidents/:id/status
**Status:** Not implemented  
**Purpose:** Update incident status  
**Priority:** MEDIUM

**Request:**
```typescript
PATCH /api/incidents/INC-2024-001/status
Content-Type: application/json

{
  status: "investigating" | "monitoring" | "resolved"
}
```

**Integration File:** `frontend/src/services/api/incidents.service.ts`  
**Function:** `incidentsService.updateStatus()`

---

#### ⏳ POST /incidents/:id/notes
**Status:** Not implemented  
**Purpose:** Add note to incident  
**Priority:** LOW

**Request:**
```typescript
POST /api/incidents/INC-2024-001/notes
Content-Type: application/json

{
  content: "string",
  author: "string"
}
```

**Expected Response:**
```typescript
{ noteId: "string" }
```

**Integration File:** `frontend/src/services/api/incidents.service.ts`  
**Function:** `incidentsService.addNote()`

---

#### 🔨 GET /incidents/stats
**Status:** Using mock data  
**Purpose:** Get incident statistics  
**Frontend Component:** `/dashboard/incidents` (stats cards)

**Request:**
```typescript
GET /api/incidents/stats?timeRange=24h
```

**Expected Response:**
```typescript
{
  active: 12,
  resolved: 28,
  avgResponseTime: "4.2m",
  total: 84
}
```

**Integration File:** `frontend/src/services/api/incidents.service.ts`  
**Function:** `incidentsService.getStats()`

---

### 2. LOGS (Priority: HIGH)

#### 🔨 POST /logs/search
**Status:** Using mock data  
**Purpose:** Search logs with advanced filters  
**Frontend Component:** `/dashboard/logs`

**Request:**
```typescript
POST /api/logs/search
Content-Type: application/json

{
  query: "error database",
  level: "error" | "warn" | "info" | "debug" | "all",
  services: ["OrderService", "PaymentAPI"],
  correlationId: "abc123" (optional),
  startTime: "2024-10-22T00:00:00Z",
  endTime: "2024-10-22T23:59:59Z",
  limit: 100
}
```

**Expected Response:**
```typescript
LogEntry[] = [
  {
    id: "string",
    timestamp: "2024-10-22T14:30:00Z",
    level: "error" | "warn" | "info" | "debug",
    service: "OrderService",
    message: "Failed to connect to database",
    metadata: {
      requestId: "req_abc123",
      userId: "usr_456",
      retries: 3
    }
  }
]
```

**Integration File:** `frontend/src/services/api/logs.service.ts`  
**Function:** `logsService.searchLogs()`

---

#### 🔨 GET /logs/stream (SSE or WebSocket)
**Status:** Using mock simulation  
**Purpose:** Stream live logs in real-time  
**Frontend Component:** `/dashboard/logs` (live mode toggle)

**Request:**
```typescript
GET /api/logs/stream?level=error&services=OrderService,PaymentAPI
```

**Expected Response:** Server-Sent Events stream with LogEntry objects

**Integration File:** `frontend/src/services/api/logs.service.ts`  
**Function:** `logsService.streamLogs()`

**Notes:** Implement using EventSource for SSE or WebSocket

---

#### ⏳ POST /logs/export
**Status:** Not implemented  
**Purpose:** Export logs to file  
**Priority:** LOW

**Request:**
```typescript
POST /api/logs/export
Content-Type: application/json

{
  filters: { /* same as /logs/search */ },
  format: "json" | "csv" | "txt"
}
```

**Expected Response:** File blob for download

**Integration File:** `frontend/src/services/api/logs.service.ts`  
**Function:** `logsService.exportLogs()`

---

#### 🔨 GET /logs/stats
**Status:** Using mock data  
**Purpose:** Get log statistics  
**Frontend Component:** `/dashboard/logs` (stats cards)

**Request:**
```typescript
GET /api/logs/stats?timeRange=24h
```

**Expected Response:**
```typescript
{
  logsPerSec: 1200,
  errorRate: 2.4,
  services: 24,
  dataIngested: "4.8 GB"
}
```

**Integration File:** `frontend/src/services/api/logs.service.ts`  
**Function:** `logsService.getStats()`

---

#### ⏳ GET /logs/correlation/:correlationId
**Status:** Not implemented  
**Purpose:** Get all logs for a specific correlation ID  
**Frontend Component:** `/dashboard/logs` (correlation ID filter)  
**Priority:** HIGH

**Request:**
```typescript
GET /api/logs/correlation/abc-123-xyz
```

**Expected Response:** LogEntry[]

**Integration File:** `frontend/src/services/api/logs.service.ts`  
**Function:** `logsService.getByCorrelationId()`

---

### 3. METRICS (Priority: HIGH)

#### 🔨 GET /metrics/http-status
**Status:** Using mock data  
**Purpose:** Get HTTP status code distribution per service  
**Frontend Component:** `/dashboard/metrics` (HTTP Status Dashboard)

**Request:**
```typescript
GET /api/metrics/http-status?service=OrderService&timeRange=24h
```

**Expected Response:**
```typescript
{
  "OrderService": {
    "2xx": 8523,
    "3xx": 234,
    "4xx": 89,
    "5xx": 23
  },
  "PaymentAPI": {
    "2xx": 6521,
    "3xx": 145,
    "4xx": 56,
    "5xx": 8
  }
}
```

**Integration File:** `frontend/src/services/api/metrics.service.ts`  
**Function:** `metricsService.getHTTPStatus()`

---

#### 🔨 GET /metrics/health
**Status:** Using mock data  
**Purpose:** Get service health monitoring data  
**Frontend Component:** `/dashboard/metrics` (Health Monitoring)

**Request:**
```typescript
GET /api/metrics/health?services=OrderService,PaymentAPI
```

**Expected Response:**
```typescript
HealthMetric[] = [
  {
    name: "OrderService",
    uptime: 99.98,
    lastCheck: "12s ago",
    status: "healthy" | "degraded" | "down",
    responseTime: 145,
    pingSuccess: 99.97
  }
]
```

**Integration File:** `frontend/src/services/api/metrics.service.ts`  
**Function:** `metricsService.getHealthMetrics()`

---

#### 🔨 GET /metrics/system
**Status:** Using mock data  
**Purpose:** Get system-wide metrics  
**Frontend Component:** `/dashboard` (main dashboard overview)

**Request:**
```typescript
GET /api/metrics/system
```

**Expected Response:**
```typescript
{
  cpu: 45.2,
  memory: 68.5,
  activeConnections: 1248,
  requestsPerSec: 3420
}
```

**Integration File:** `frontend/src/services/api/metrics.service.ts`  
**Function:** `metricsService.getSystemMetrics()`

---

#### ⏳ POST /metrics/timeseries
**Status:** Not implemented  
**Purpose:** Query time-series metrics data  
**Priority:** MEDIUM

**Request:**
```typescript
POST /api/metrics/timeseries
Content-Type: application/json

{
  metric: "http_request_duration_seconds",
  aggregation: "avg" | "sum" | "min" | "max" | "p50" | "p95" | "p99",
  interval: "1m" | "5m" | "15m" | "1h",
  startTime: "2024-10-22T00:00:00Z",
  endTime: "2024-10-22T23:59:59Z",
  groupBy: ["service", "status_code"]
}
```

**Expected Response:**
```typescript
TimeSeriesData[] = [
  {
    timestamp: "2024-10-22T14:00:00Z",
    value: 0.145,
    labels: { service: "OrderService", status_code: "200" }
  }
]
```

**Integration File:** `frontend/src/services/api/metrics.service.ts`  
**Function:** `metricsService.getTimeSeries()`

---

#### 🔨 GET /metrics/dependencies
**Status:** Using mock data  
**Purpose:** Get service dependencies health  
**Frontend Component:** `/dashboard/metrics`, `/dashboard/topology`

**Request:**
```typescript
GET /api/metrics/dependencies
```

**Expected Response:**
```typescript
ServiceDependency[] = [
  {
    name: "PostgreSQL",
    health: 99,
    latency: 12,
    throughput: "2.4K/s",
    status: "healthy" | "degraded" | "down"
  }
]
```

**Integration File:** `frontend/src/services/api/metrics.service.ts`  
**Function:** `metricsService.getDependencies()`

---

### 4. ADDITIONAL ENDPOINTS (See endpoints.ts for complete list)

The following endpoint categories are also defined but marked as ⏳ PENDING:

- **Query Studio** - `/query/*` endpoints for query execution and AI generation
- **AI Agents** - `/agents/*` endpoints for agent management and messaging  
- **Runbooks** - `/runbooks/*` endpoints for automation execution
- **Notifications** - `/notifications/*` endpoints for alerts
- **Integrations** - `/integrations/*` endpoints for external services
- **Reports** - `/reports/*` endpoints for report generation
- **Dashboard Builder** - `/dashboards/*` endpoints for AI dashboard generation
- **Authentication** - `/auth/*` endpoints for user authentication
- **Settings** - `/settings/*` endpoints for user preferences
- **Topology** - `/topology/*` endpoints for service graph

**See `frontend/src/services/api/endpoints.ts` for the complete catalog.**

---

## 🔧 How to Integrate

### Step 1: Review the endpoint catalog
Open `frontend/src/services/api/endpoints.ts` to see all defined endpoints.

### Step 2: Implement backend endpoint
Create the corresponding backend API endpoint following the specification.

### Step 3: Update the service file
Replace mock implementation with actual API call.

**Example - Integrating GET /incidents:**

```typescript
// BEFORE (Mock)
async getIncidents(filters?: IncidentFilters): Promise<Incident[]> {
  return Promise.resolve([/* mock data */]);
}

// AFTER (Real API)
async getIncidents(filters?: IncidentFilters): Promise<Incident[]> {
  const params = new URLSearchParams(filters as any);
  const response = await fetch(`${API_BASE_URL}/incidents?${params}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`, // Add auth if needed
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch incidents: ${response.statusText}`);
  }
  
  return response.json();
}
```

### Step 4: Test in the dashboard
The frontend will automatically use the new API once integrated.

### Step 5: Update status in endpoints.ts
Change status from 🔨 MOCK to ✅ IMPLEMENTED

---

## 🚀 Quick Start Example

```typescript
// In your component
import { incidentsService, logsService, metricsService } from '@/services/api';

export default function MyComponent() {
  useEffect(() => {
    async function loadData() {
      // Get incidents
      const incidents = await incidentsService.getIncidents({
        severity: 'critical',
        status: 'active'
      });
      
      // Search logs
      const logs = await logsService.searchLogs({
        level: 'error',
        limit: 100
      });
      
      // Get metrics
      const health = await metricsService.getHealthMetrics();
    }
    
    loadData();
  }, []);
}
```

---

## 📊 Integration Priority

### Phase 1 (HIGH Priority)
1. ✅ GET /incidents
2. ✅ GET /incidents/stats
3. ✅ POST /logs/search
4. ✅ GET /logs/stats
5. ✅ GET /logs/correlation/:correlationId
6. ✅ GET /metrics/http-status
7. ✅ GET /metrics/health
8. ✅ GET /metrics/system

### Phase 2 (MEDIUM Priority)
1. POST /incidents (create)
2. PATCH /incidents/:id/status
3. POST /metrics/timeseries
4. GET /logs/stream (live logs)
5. Authentication endpoints

### Phase 3 (LOW Priority)
1. Query Studio endpoints
2. AI Agents endpoints
3. Runbooks execution
4. Report generation
5. Export functions

---

## 🔍 Testing

### Using Mock Data (Current)
```typescript
// All services return mock data automatically
const incidents = await incidentsService.getIncidents(); // Returns mock data
```

### Using Real Backend
```typescript
// Set environment variable
NEXT_PUBLIC_API_URL=https://api.traceon.ai

// Services will use real backend automatically
const incidents = await incidentsService.getIncidents(); // Calls real API
```

---

## 📝 Notes

- All API calls include error handling
- TypeScript types are defined for all requests/responses
- Mock data matches expected backend response format
- Services are organized by feature domain for clarity
- See JSDoc comments in service files for detailed documentation

---

## 🆘 Support

For questions or issues:
1. Check endpoint definition in `endpoints.ts`
2. Review service implementation in respective `.service.ts` file
3. Verify expected request/response format in this guide
4. Test with mock data first before integrating backend

