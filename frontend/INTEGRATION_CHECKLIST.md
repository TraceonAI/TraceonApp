# 🎯 Backend Integration Checklist

Use this file to track backend API implementation progress.

## 📊 Overall Progress

**Total Endpoints:** 60+  
**Implemented:** 0 (0%)  
**Mock Data:** 17 (28%)  
**Pending:** 43+ (72%)

---

## ✅ Phase 1: Core Functionality (HIGH Priority)

Target: Essential dashboard features

### Incidents APIs

- [ ] **GET /incidents** - List all incidents with filters
  - Status: 🔨 MOCK
  - Service: `incidentsService.getIncidents()`
  - Component: `/dashboard/incidents`
  - Priority: **HIGH**
  - Estimated: 4 hours

- [ ] **GET /incidents/:id** - Get single incident details
  - Status: 🔨 MOCK
  - Service: `incidentsService.getIncidentById()`
  - Component: `/dashboard/incidents` (detail view)
  - Priority: **MEDIUM**
  - Estimated: 2 hours

- [ ] **GET /incidents/stats** - Get incident statistics
  - Status: 🔨 MOCK
  - Service: `incidentsService.getStats()`
  - Component: `/dashboard/incidents` (stats cards)
  - Priority: **HIGH**
  - Estimated: 3 hours

### Logs APIs

- [ ] **POST /logs/search** - Search logs with filters
  - Status: 🔨 MOCK
  - Service: `logsService.searchLogs()`
  - Component: `/dashboard/logs`
  - Priority: **HIGH**
  - Estimated: 6 hours

- [ ] **GET /logs/stats** - Get log statistics
  - Status: 🔨 MOCK
  - Service: `logsService.getStats()`
  - Component: `/dashboard/logs` (stats cards)
  - Priority: **HIGH**
  - Estimated: 3 hours

- [ ] **GET /logs/correlation/:id** - Get logs by correlation ID
  - Status: ⏳ PENDING
  - Service: `logsService.getByCorrelationId()`
  - Component: `/dashboard/logs` (correlation filter)
  - Priority: **HIGH**
  - Estimated: 4 hours

### Metrics APIs

- [ ] **GET /metrics/http-status** - Get HTTP status distribution
  - Status: 🔨 MOCK
  - Service: `metricsService.getHTTPStatus()`
  - Component: `/dashboard/metrics` (HTTP Status Dashboard)
  - Priority: **HIGH**
  - Estimated: 5 hours

- [ ] **GET /metrics/health** - Get service health monitoring
  - Status: 🔨 MOCK
  - Service: `metricsService.getHealthMetrics()`
  - Component: `/dashboard/metrics` (Health Monitoring)
  - Priority: **HIGH**
  - Estimated: 5 hours

- [ ] **GET /metrics/system** - Get system-wide metrics
  - Status: 🔨 MOCK
  - Service: `metricsService.getSystemMetrics()`
  - Component: `/dashboard` (overview)
  - Priority: **HIGH**
  - Estimated: 4 hours

**Phase 1 Total Estimated Time:** 36 hours (4-5 days)

---

## ✅ Phase 2: Enhanced Features (MEDIUM Priority)

Target: Interactive features and user actions

### Incidents (Write Operations)

- [ ] **POST /incidents** - Create new incident
  - Status: ⏳ PENDING
  - Service: `incidentsService.createIncident()`
  - Component: Create Incident button
  - Priority: **MEDIUM**
  - Estimated: 5 hours

- [ ] **PATCH /incidents/:id/status** - Update incident status
  - Status: ⏳ PENDING
  - Service: `incidentsService.updateStatus()`
  - Component: Incident status dropdown
  - Priority: **MEDIUM**
  - Estimated: 3 hours

- [ ] **POST /incidents/:id/notes** - Add note to incident
  - Status: ⏳ PENDING
  - Service: `incidentsService.addNote()`
  - Component: Add Note button
  - Priority: **LOW**
  - Estimated: 3 hours

### Logs (Advanced)

- [ ] **GET /logs/stream** - Stream live logs (SSE/WebSocket)
  - Status: 🔨 MOCK
  - Service: `logsService.streamLogs()`
  - Component: `/dashboard/logs` (live mode)
  - Priority: **MEDIUM**
  - Estimated: 8 hours
  - Note: Requires SSE or WebSocket setup

- [ ] **POST /logs/export** - Export logs to file
  - Status: ⏳ PENDING
  - Service: `logsService.exportLogs()`
  - Component: Export button
  - Priority: **LOW**
  - Estimated: 4 hours

### Metrics (Advanced)

- [ ] **POST /metrics/timeseries** - Query time-series data
  - Status: ⏳ PENDING
  - Service: `metricsService.getTimeSeries()`
  - Component: Charts and graphs
  - Priority: **MEDIUM**
  - Estimated: 8 hours

- [ ] **GET /metrics/dependencies** - Get service dependencies
  - Status: 🔨 MOCK
  - Service: `metricsService.getDependencies()`
  - Component: `/dashboard/topology`
  - Priority: **MEDIUM**
  - Estimated: 5 hours

### Authentication

- [ ] **POST /auth/login** - User login
  - Status: ⏳ PENDING
  - Priority: **MEDIUM**
  - Estimated: 6 hours

- [ ] **POST /auth/logout** - User logout
  - Status: ⏳ PENDING
  - Priority: **MEDIUM**
  - Estimated: 2 hours

- [ ] **POST /auth/refresh** - Refresh token
  - Status: ⏳ PENDING
  - Priority: **MEDIUM**
  - Estimated: 3 hours

- [ ] **GET /auth/me** - Get current user
  - Status: ⏳ PENDING
  - Priority: **MEDIUM**
  - Estimated: 2 hours

**Phase 2 Total Estimated Time:** 49 hours (6-7 days)

---

## ✅ Phase 3: Advanced Platform Features (LOW Priority)

### Query Studio

- [ ] **POST /query/execute** - Execute custom query
- [ ] **POST /query/templates** - Save query template
- [ ] **GET /query/templates** - Get saved templates (🔨 MOCK)
- [ ] **POST /query/ai-generate** - AI query generation

**Estimated:** 16 hours

### AI Agents

- [ ] **GET /agents** - List all agents (🔨 MOCK)
- [ ] **GET /agents/:id/activity** - Get agent activity
- [ ] **POST /agents/:id/message** - Send message to agent
- [ ] **POST /agents/:id/analyze** - Trigger analysis

**Estimated:** 20 hours

### Runbooks

- [ ] **GET /runbooks** - List runbooks (🔨 MOCK)
- [ ] **GET /runbooks/:id** - Get runbook details (🔨 MOCK)
- [ ] **POST /runbooks/:id/execute** - Execute runbook
- [ ] **GET /runbooks/:id/executions** - Get execution history

**Estimated:** 18 hours

### Notifications

- [ ] **GET /notifications** - List notifications (🔨 MOCK)
- [ ] **PATCH /notifications/:id/read** - Mark as read
- [ ] **PATCH /notifications/read-all** - Mark all as read
- [ ] **DELETE /notifications/:id** - Delete notification

**Estimated:** 12 hours

### Integrations

- [ ] **GET /integrations** - List integrations (🔨 MOCK)
- [ ] **POST /integrations/:id/test** - Test integration
- [ ] **PATCH /integrations/:id/config** - Update config
- [ ] **PATCH /integrations/:id/toggle** - Enable/disable

**Estimated:** 16 hours

### Reports

- [ ] **GET /reports** - List reports (🔨 MOCK)
- [ ] **POST /reports/generate** - Generate report
- [ ] **GET /reports/:id/download** - Download report

**Estimated:** 14 hours

### Dashboard Builder

- [ ] **POST /dashboards/ai-generate** - AI dashboard generation
- [ ] **POST /dashboards** - Save dashboard
- [ ] **GET /dashboards** - List dashboards (🔨 MOCK)

**Estimated:** 20 hours

### Settings

- [ ] **GET /settings/preferences** - Get preferences
- [ ] **PATCH /settings/preferences** - Update preferences
- [ ] **POST /settings/api-keys** - Generate API key
- [ ] **DELETE /settings/api-keys/:id** - Revoke API key

**Estimated:** 12 hours

### Topology

- [ ] **GET /topology/graph** - Get service topology (🔨 MOCK)
- [ ] **GET /topology/dependencies/:id** - Get dependencies

**Estimated:** 10 hours

**Phase 3 Total Estimated Time:** 138 hours (17-20 days)

---

## 📋 Integration Process

For each endpoint:

### Backend Developer Checklist

1. [ ] Read spec in `endpoints.ts`
2. [ ] Review request/response format in integration guide
3. [ ] Implement backend endpoint
4. [ ] Test with Postman/Insomnia
5. [ ] Verify response matches TypeScript types
6. [ ] Deploy to dev environment
7. [ ] Update this checklist

### Frontend Developer Checklist

1. [ ] Verify mock implementation works
2. [ ] Update service file (replace mock with real API)
3. [ ] Add authentication headers if needed
4. [ ] Add error handling
5. [ ] Test in browser
6. [ ] Update status in `endpoints.ts` to ✅ IMPLEMENTED
7. [ ] Update this checklist

---

## 🎯 Current Sprint

**Sprint Goal:** Complete Phase 1 (Core Functionality)  
**Target:** 8 endpoints in 4-5 days

**This Week:**
- [ ] Incidents APIs (3 endpoints)
- [ ] Logs APIs (3 endpoints)
- [ ] Metrics APIs (2 endpoints)

**Next Week:**
- [ ] Integration testing
- [ ] Bug fixes
- [ ] Phase 2 planning

---

## 📊 Team Assignments

### Backend Team

**Developer 1:**
- [ ] Incidents APIs (all 3)
- [ ] Logs correlation API

**Developer 2:**
- [ ] Logs search & stats APIs
- [ ] Metrics APIs (all 3)

### Frontend Team

**Developer 1:**
- [ ] Update incidents service
- [ ] Update logs service

**Developer 2:**
- [ ] Update metrics service
- [ ] Integration testing

---

## 🐛 Known Issues / Blockers

- [ ] None yet

---

## 📝 Notes

### Testing URLs

**Development:**
```
http://localhost:3001/api
```

**Staging:**
```
https://staging-api.traceon.ai
```

**Production:**
```
https://api.traceon.ai
```

### Authentication

Most endpoints will require authentication header:
```
Authorization: Bearer <token>
```

Add to service methods when integrating.

### Rate Limiting

Consider implementing rate limiting on backend:
- 100 requests/minute per user
- 1000 requests/hour per API key

---

## ✅ Completed Endpoints

None yet. Update this section as endpoints are completed.

---

**Last Updated:** October 22, 2024  
**Next Review:** [Date after Phase 1 completion]
