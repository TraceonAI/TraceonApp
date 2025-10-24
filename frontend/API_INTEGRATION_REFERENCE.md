# API Integration Quick Reference

## 📂 File Structure

```
frontend/src/services/api/
├── index.ts                  # Main exports - import from here
├── endpoints.ts              # Complete catalog of ALL 60+ endpoints
├── incidents.service.ts      # 6 incident endpoints
├── logs.service.ts           # 5 log endpoints  
├── metrics.service.ts        # 6 metrics endpoints
└── (more services to be added)
```

## 🎯 Import and Use

```typescript
import { 
  incidentsService, 
  logsService, 
  metricsService 
} from '@/services/api';

// Get incidents
const incidents = await incidentsService.getIncidents({
  severity: 'critical',
  status: 'active'
});

// Search logs
const logs = await logsService.searchLogs({
  query: 'error database',
  level: 'error',
  limit: 100
});

// Get HTTP status metrics
const httpMetrics = await metricsService.getHTTPStatus();

// Get health metrics
const health = await metricsService.getHealthMetrics();
```

## 📋 Priority Endpoints to Integrate

### 🔴 PHASE 1 - Core Functionality (8 endpoints)

| Endpoint | Method | Status | Priority | Component |
|----------|--------|--------|----------|-----------|
| `/incidents` | GET | 🔨 MOCK | HIGH | Incidents Page |
| `/incidents/stats` | GET | 🔨 MOCK | HIGH | Incidents Stats |
| `/logs/search` | POST | 🔨 MOCK | HIGH | Logs Page |
| `/logs/stats` | GET | 🔨 MOCK | HIGH | Logs Stats |
| `/logs/correlation/:id` | GET | ⏳ TODO | HIGH | Correlation Search |
| `/metrics/http-status` | GET | 🔨 MOCK | HIGH | HTTP Dashboard |
| `/metrics/health` | GET | 🔨 MOCK | HIGH | Health Monitoring |
| `/metrics/system` | GET | 🔨 MOCK | HIGH | System Overview |

### 🟡 PHASE 2 - Enhanced Features (5 endpoints)

| Endpoint | Method | Status | Priority | Component |
|----------|--------|--------|----------|-----------|
| `/incidents` | POST | ⏳ TODO | MEDIUM | Create Incident |
| `/incidents/:id/status` | PATCH | ⏳ TODO | MEDIUM | Update Status |
| `/logs/stream` | GET | 🔨 MOCK | MEDIUM | Live Logs (SSE) |
| `/metrics/timeseries` | POST | ⏳ TODO | MEDIUM | Time-Series Charts |
| `/auth/login` | POST | ⏳ TODO | MEDIUM | Authentication |

### 🟢 PHASE 3 - Advanced Features (40+ endpoints)

See `endpoints.ts` for complete list including:
- Query Studio (AI query generation)
- AI Agents (agent messaging, analysis)
- Runbooks (automation execution)
- Notifications (alert management)
- Integrations (external services)
- Reports (report generation)
- Dashboard Builder (AI dashboards)
- Settings (user preferences)
- Topology (service graph)

## 🔧 Integration Steps

### 1. Check Current Status
```bash
# Open the endpoints catalog
cat frontend/src/services/api/endpoints.ts

# Find your endpoint and check status:
# ✅ IMPLEMENTED - Already integrated
# 🔨 MOCK - Using mock data (needs backend)
# ⏳ PENDING - Not implemented (throws error)
```

### 2. Implement Backend Endpoint
Create the backend API following the specification in `BACKEND_INTEGRATION_GUIDE.md`

### 3. Update Frontend Service
```typescript
// frontend/src/services/api/incidents.service.ts

// BEFORE (Mock)
async getIncidents(): Promise<Incident[]> {
  return Promise.resolve([/* mock data */]);
}

// AFTER (Real)
async getIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_BASE_URL}/incidents`);
  return response.json();
}
```

### 4. Update Status
```typescript
// frontend/src/services/api/endpoints.ts

INCIDENTS: {
  LIST: {
    method: 'GET',
    path: '/incidents',
    status: 'IMPLEMENTED', // Changed from 'MOCK'
    // ...
  }
}
```

## 🌐 Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # Development
NEXT_PUBLIC_API_URL=https://api.traceon.ai     # Production
```

## 📊 Current Integration Status

**Total Endpoints Defined:** 60+

**Status Breakdown:**
- ✅ IMPLEMENTED: 0 (0%)
- 🔨 MOCK: 17 (28%)
- ⏳ PENDING: 43+ (72%)

**By Category:**
- Incidents: 6 endpoints (2 MOCK, 4 PENDING)
- Logs: 5 endpoints (3 MOCK, 2 PENDING)
- Metrics: 6 endpoints (5 MOCK, 1 PENDING)
- Query Studio: 4 endpoints (1 MOCK, 3 PENDING)
- AI Agents: 4 endpoints (1 MOCK, 3 PENDING)
- Runbooks: 4 endpoints (2 MOCK, 2 PENDING)
- Notifications: 4 endpoints (1 MOCK, 3 PENDING)
- Integrations: 4 endpoints (1 MOCK, 3 PENDING)
- Reports: 3 endpoints (1 MOCK, 2 PENDING)
- Dashboard Builder: 3 endpoints (0 MOCK, 3 PENDING)
- Authentication: 4 endpoints (0 MOCK, 4 PENDING)
- Settings: 4 endpoints (0 MOCK, 4 PENDING)
- Topology: 2 endpoints (1 MOCK, 1 PENDING)

## 🧪 Testing

```typescript
// Test with mock data (current)
const incidents = await incidentsService.getIncidents();
// Returns mock data automatically

// Test with real backend
NEXT_PUBLIC_API_URL=https://api.traceon.ai npm run dev
const incidents = await incidentsService.getIncidents();
// Calls real API
```

## 📚 Documentation Files

1. **`endpoints.ts`** - Complete endpoint catalog with specs
2. **`BACKEND_INTEGRATION_GUIDE.md`** - Detailed integration guide
3. **`*.service.ts`** - Service implementations with JSDoc
4. **This file** - Quick reference

## 🚦 Page → API Mapping

| Dashboard Page | Required APIs |
|----------------|---------------|
| `/dashboard` | incidents (stats), metrics (system) |
| `/dashboard/incidents` | incidents (list, stats, create, update) |
| `/dashboard/logs` | logs (search, stream, stats, correlation) |
| `/dashboard/metrics` | metrics (http-status, health, system, dependencies) |
| `/dashboard/query-studio` | query (templates, execute, ai-generate) |
| `/dashboard/agent-console` | agents (list, activity, message) |
| `/dashboard/runbooks` | runbooks (list, get, execute) |
| `/dashboard/notifications` | notifications (list, mark-read, delete) |
| `/dashboard/integrations` | integrations (list, test, update) |
| `/dashboard/reports` | reports (list, generate, download) |

## ✅ Next Steps

1. **Backend Team**: Start with Phase 1 endpoints (8 high-priority)
2. **Frontend Team**: Services are ready - just swap mock → real
3. **Testing**: Use Postman/Insomnia to test endpoints
4. **Deployment**: Update `NEXT_PUBLIC_API_URL` environment variable

## 🔗 Related Files

- Full API catalog: `frontend/src/services/api/endpoints.ts`
- Integration guide: `frontend/BACKEND_INTEGRATION_GUIDE.md`
- Service implementations: `frontend/src/services/api/*.service.ts`
- Type definitions: Exported from each service file
