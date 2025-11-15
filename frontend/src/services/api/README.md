# API Services - Centralized Backend Integration

This directory contains all frontend API integrations for the TraceonAI dashboard, organized by feature domain for easy backend integration.

## 🎯 Purpose

Instead of scattered API calls throughout components, all backend communication is centralized here. This makes it crystal clear:
- **What APIs exist** (see `endpoints.ts`)
- **Which need backend integration** (🔨 MOCK status)
- **How to use them** (see service files)
- **What data they expect** (TypeScript types)

## 📁 Structure

```
api/
├── index.ts                    # Main export - import services from here
├── endpoints.ts                # Complete catalog of 60+ backend endpoints
├── incidents.service.ts        # Incident management (6 endpoints)
├── logs.service.ts             # Log search & streaming (5 endpoints)
├── metrics.service.ts          # Metrics & monitoring (6 endpoints)
└── README.md                   # This file
```

## 🚀 Quick Start

### Using the Services

```typescript
import { incidentsService, logsService, metricsService } from '@/services/api';

// Example: Get incidents
const incidents = await incidentsService.getIncidents({
  severity: 'critical',
  status: 'active',
  limit: 20
});

// Example: Search logs
const logs = await logsService.searchLogs({
  query: 'error database',
  level: 'error',
  services: ['OrderService', 'PaymentAPI']
});

// Example: Get health metrics
const health = await metricsService.getHealthMetrics();
```

### Current Status

- **17 endpoints** are using **MOCK data** (🔨)
- **43+ endpoints** are **PENDING backend** (⏳)
- **0 endpoints** are fully **IMPLEMENTED** (✅)

All mock services return realistic data that matches the expected backend response format.

## 📚 Documentation

1. **[API_INTEGRATION_REFERENCE.md](../../API_INTEGRATION_REFERENCE.md)** - Quick reference guide
2. **[BACKEND_INTEGRATION_GUIDE.md](../../BACKEND_INTEGRATION_GUIDE.md)** - Complete integration guide
3. **[endpoints.ts](./endpoints.ts)** - Full endpoint catalog with specs
4. **Service Files** - Implementation with JSDoc comments

## 🔧 For Backend Developers

### Step 1: Review Endpoints
Open `endpoints.ts` to see all defined endpoints with their specs.

### Step 2: Implement Backend
Create the backend endpoint following the specification.

### Step 3: Test Locally
```bash
# Start backend on port 3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api npm run dev
```

### Step 4: Update Frontend
Replace mock implementation in the service file:

```typescript
// In incidents.service.ts

// BEFORE (Mock)
async getIncidents(): Promise<Incident[]> {
  return Promise.resolve([/* mock data */]);
}

// AFTER (Real API)
async getIncidents(): Promise<Incident[]> {
  const response = await fetch(`${API_BASE_URL}/incidents`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}
```

### Step 5: Update Status
Change status in `endpoints.ts` from `'MOCK'` to `'IMPLEMENTED'`.

## 🎯 Priority Endpoints (Phase 1)

These 8 endpoints power the core dashboard functionality:

1. `GET /incidents` - List incidents
2. `GET /incidents/stats` - Incident statistics
3. `POST /logs/search` - Search logs
4. `GET /logs/stats` - Log statistics
5. `GET /logs/correlation/:id` - Correlation ID search
6. `GET /metrics/http-status` - HTTP status distribution
7. `GET /metrics/health` - Service health monitoring
8. `GET /metrics/system` - System metrics

See **BACKEND_INTEGRATION_GUIDE.md** for complete details.

## 🌐 Environment Setup

```bash
# Development
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Production
NEXT_PUBLIC_API_URL=https://api.traceon.ai
```

## 📊 Service Breakdown

### Incidents Service (`incidents.service.ts`)
- ✅ Get incidents (list)
- ✅ Get incident by ID
- ✅ Get incident stats
- ⏳ Create incident
- ⏳ Update incident status
- ⏳ Add note to incident

### Logs Service (`logs.service.ts`)
- ✅ Search logs
- ✅ Stream live logs
- ✅ Get log stats
- ⏳ Export logs
- ⏳ Get logs by correlation ID

### Metrics Service (`metrics.service.ts`)
- ✅ Get HTTP status metrics
- ✅ Get health metrics
- ✅ Get system metrics
- ✅ Get service dependencies
- ⏳ Get time-series data

## 🔍 Finding APIs by Feature

**Need incident management?**  
→ `incidentsService.ts`

**Need log search/streaming?**  
→ `logsService.ts`

**Need metrics/monitoring?**  
→ `metricsService.ts`

**Need to see ALL endpoints?**  
→ `endpoints.ts`

## 🧪 Testing

All services return mock data automatically when backend is not available:

```typescript
// Returns mock data (no backend needed)
const incidents = await incidentsService.getIncidents();
```

Once backend is integrated, just update the environment variable:

```typescript
// Calls real backend automatically
NEXT_PUBLIC_API_URL=https://api.traceon.ai
const incidents = await incidentsService.getIncidents();
```

## 🚦 Integration Status Legend

- ✅ **IMPLEMENTED** - Backend integrated, fully working
- 🔨 **MOCK** - Using mock data, needs backend integration
- ⏳ **PENDING** - Not implemented, throws error when called

Check `endpoints.ts` or service files for current status of each endpoint.

## 📝 Notes

- All services include TypeScript types for requests/responses
- Mock data matches expected backend response format
- Error handling is built into each service method
- JSDoc comments document each function
- Services are stateless and can be used anywhere

## 🆘 Need Help?

1. Check endpoint spec in `endpoints.ts`
2. Review service implementation in `*.service.ts`
3. Read integration guide in `BACKEND_INTEGRATION_GUIDE.md`
4. Check quick reference in `API_INTEGRATION_REFERENCE.md`

---

**Last Updated:** October 22, 2024  
**Total Endpoints:** 60+  
**Implementation Status:** 0% complete (all mock/pending)
