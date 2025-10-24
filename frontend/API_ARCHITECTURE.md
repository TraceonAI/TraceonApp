# API Architecture Overview

## 📊 Visual Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     DASHBOARD COMPONENTS                         │
│  /dashboard/incidents  /dashboard/logs  /dashboard/metrics      │
└────────────┬────────────────────┬────────────────┬──────────────┘
             │                    │                │
             ▼                    ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CENTRALIZED API SERVICES                        │
│  frontend/src/services/api/                                      │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ incidents       │  │ logs            │  │ metrics         │ │
│  │ .service.ts     │  │ .service.ts     │  │ .service.ts     │ │
│  │                 │  │                 │  │                 │ │
│  │ • getIncidents  │  │ • searchLogs    │  │ • getHTTPStatus │ │
│  │ • getById       │  │ • streamLogs    │  │ • getHealth     │ │
│  │ • create        │  │ • exportLogs    │  │ • getSystem     │ │
│  │ • updateStatus  │  │ • getStats      │  │ • getTimeSeries │ │
│  │ • addNote       │  │ • getByCorrelId │  │ • getDeps       │ │
│  │ • getStats      │  │                 │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ endpoints.ts - Complete API Catalog (60+ endpoints)        │ │
│  │ • Incidents (6)  • Logs (5)       • Metrics (6)            │ │
│  │ • Query (4)      • Agents (4)     • Runbooks (4)           │ │
│  │ • Notifications (4) • Integrations (4) • Reports (3)       │ │
│  │ • Dashboard Builder (3) • Auth (4) • Settings (4)          │ │
│  │ • Topology (2)                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────┬────────────────────┬────────────────┬──────────────┘
             │                    │                │
             ▼                    ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API SERVER                          │
│  http://localhost:3001/api  (Development)                        │
│  https://api.traceon.ai     (Production)                         │
│                                                                   │
│  GET  /incidents                 🔨 MOCK                         │
│  GET  /incidents/:id             🔨 MOCK                         │
│  POST /incidents                 ⏳ PENDING                      │
│  GET  /incidents/stats           🔨 MOCK                         │
│  POST /logs/search               🔨 MOCK                         │
│  GET  /logs/stream               🔨 MOCK                         │
│  GET  /logs/stats                🔨 MOCK                         │
│  GET  /logs/correlation/:id      ⏳ PENDING                      │
│  GET  /metrics/http-status       🔨 MOCK                         │
│  GET  /metrics/health            🔨 MOCK                         │
│  GET  /metrics/system            🔨 MOCK                         │
│  ... 50+ more endpoints ...                                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Example

### Getting Incidents

```
User visits /dashboard/incidents
         │
         ▼
IncidentsPage.tsx component
         │
         │ useEffect(() => loadIncidents())
         ▼
import { incidentsService } from '@/services/api'
         │
         │ await incidentsService.getIncidents({ severity: 'critical' })
         ▼
incidents.service.ts
         │
         │ fetch(`${API_BASE_URL}/incidents?severity=critical`)
         ▼
Backend API: GET /api/incidents?severity=critical
         │
         │ Return Incident[] JSON
         ▼
Frontend receives data
         │
         │ setState(incidents)
         ▼
UI renders incident cards
```

## 📦 File Organization

```
frontend/
├── src/
│   ├── app/
│   │   └── dashboard/
│   │       ├── incidents/page.tsx        ──┐
│   │       ├── logs/page.tsx               │ Import from
│   │       └── metrics/page.tsx            │ services/api
│   │                                       │
│   ├── services/                           │
│   │   └── api/                            │
│   │       ├── index.ts                 <──┘ Main export
│   │       ├── endpoints.ts                  Endpoint catalog
│   │       ├── incidents.service.ts          6 incident APIs
│   │       ├── logs.service.ts               5 log APIs
│   │       ├── metrics.service.ts            6 metrics APIs
│   │       └── README.md                     Documentation
│   │
│   └── types/
│       └── (types exported from services)
│
├── API_INTEGRATION_REFERENCE.md             Quick reference
├── BACKEND_INTEGRATION_GUIDE.md             Full integration guide
└── .env.local                                API_BASE_URL config
```

## 🎯 Integration Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: Define Endpoint                                          │
│ ────────────────────────                                         │
│ Add specification to endpoints.ts                                │
│ - Method, path, params, response type                            │
│ - Set status: PENDING                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: Create Service Method                                   │
│ ──────────────────────────                                       │
│ Add function to appropriate .service.ts                          │
│ - Add TypeScript types                                           │
│ - Implement mock data                                            │
│ - Add JSDoc comments                                             │
│ - Update status: MOCK                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: Use in Components                                       │
│ ──────────────────────────                                       │
│ Import service in dashboard pages                                │
│ - Call service methods                                           │
│ - Handle loading/error states                                    │
│ - Display data in UI                                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: Backend Implementation                                  │
│ ───────────────────────────                                      │
│ Backend team implements actual API                               │
│ - Follow spec from endpoints.ts                                  │
│ - Return data matching TypeScript types                          │
│ - Test with Postman/Insomnia                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: Frontend Integration                                    │
│ ─────────────────────────                                        │
│ Replace mock implementation with real API call                   │
│ - Update fetch() call                                            │
│ - Add error handling                                             │
│ - Add authentication headers                                     │
│ - Update status: IMPLEMENTED                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: Testing & Deployment                                    │
│ ──────────────────────────                                       │
│ Test end-to-end functionality                                    │
│ - Verify data flow                                               │
│ - Check error scenarios                                          │
│ - Update environment variables                                   │
│ - Deploy to production                                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🏗️ Service Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│ incidentsService                                                  │
├──────────────────────────────────────────────────────────────────┤
│ Properties:                                                       │
│ • None (stateless)                                                │
│                                                                   │
│ Methods:                                                          │
│ • getIncidents(filters?)    → Incident[]        🔨 MOCK         │
│ • getIncidentById(id)       → Incident | null   🔨 MOCK         │
│ • createIncident(data)      → Incident          ⏳ PENDING      │
│ • updateStatus(id, status)  → Incident          ⏳ PENDING      │
│ • addNote(id, content)      → { noteId }        ⏳ PENDING      │
│ • getStats(timeRange?)      → IncidentStats     🔨 MOCK         │
│                                                                   │
│ Types:                                                            │
│ • Incident                                                        │
│ • IncidentFilters                                                 │
│ • IncidentStats                                                   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ logsService                                                       │
├──────────────────────────────────────────────────────────────────┤
│ Methods:                                                          │
│ • searchLogs(filters)       → LogEntry[]        🔨 MOCK         │
│ • streamLogs(filters, cb)   → cleanup fn        🔨 MOCK         │
│ • exportLogs(filters, fmt)  → Blob              ⏳ PENDING      │
│ • getStats(timeRange?)      → LogStats          🔨 MOCK         │
│ • getByCorrelationId(id)    → LogEntry[]        ⏳ PENDING      │
│                                                                   │
│ Types:                                                            │
│ • LogEntry                                                        │
│ • LogSearchFilters                                                │
│ • LogStats                                                        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ metricsService                                                    │
├──────────────────────────────────────────────────────────────────┤
│ Methods:                                                          │
│ • getHTTPStatus(...)        → HTTPStatusMetrics  🔨 MOCK        │
│ • getHealthMetrics(...)     → HealthMetric[]     🔨 MOCK        │
│ • getSystemMetrics()        → SystemMetrics      🔨 MOCK        │
│ • getTimeSeries(params)     → TimeSeriesData[]   ⏳ PENDING     │
│ • getDependencies()         → ServiceDep[]       🔨 MOCK        │
│                                                                   │
│ Types:                                                            │
│ • HTTPStatusMetrics, HealthMetric, SystemMetrics                  │
│ • TimeSeriesData, ServiceDependency                               │
└──────────────────────────────────────────────────────────────────┘
```

## 🔍 Dependency Graph

```
Dashboard Pages
    ↓
    ├─ /dashboard/incidents → incidentsService
    │                           ↓
    │                         GET /incidents
    │                         GET /incidents/:id
    │                         GET /incidents/stats
    │
    ├─ /dashboard/logs     → logsService
    │                           ↓
    │                         POST /logs/search
    │                         GET  /logs/stream
    │                         GET  /logs/stats
    │
    ├─ /dashboard/metrics  → metricsService
    │                           ↓
    │                         GET /metrics/http-status
    │                         GET /metrics/health
    │                         GET /metrics/system
    │
    └─ Other pages → (services to be created)
```

## 📈 Implementation Progress

```
Phase 1 (Core - 8 endpoints)
████████░░░░░░░░░░░░░░░░░░░░ 0/8 implemented

Phase 2 (Enhanced - 5 endpoints)  
░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0/5 implemented

Phase 3 (Advanced - 40+ endpoints)
░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0/40+ implemented

Overall: 0% complete (all using mocks)
```

---

**Status Key:**
- ✅ IMPLEMENTED - Backend integrated
- 🔨 MOCK - Using mock data  
- ⏳ PENDING - Not implemented

