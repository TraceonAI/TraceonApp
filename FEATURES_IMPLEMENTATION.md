# TraceonAI Dashboard - Feature Implementation Guide

## Overview

This document captures all the implemented features in the TraceonAI dashboard, with specific focus on the requested feature set for advanced observability and AI-powered analysis.

---

## 🔍 Feature 1: Advanced Log Search with Correlation ID and Application Filtering

### Location
`/frontend/src/app/dashboard/logs/page.tsx`

### Implementation Details

#### Correlation ID Search
- **Purpose**: Allows users to track a specific request across multiple services and databases
- **Use Case**: When investigating an issue, users can enter a correlation ID to trace the entire request flow
- **Benefits**: 
  - Prevents AI from scanning the entire codebase
  - Focuses analysis on relevant services
  - Faster root cause identification

#### Application Filter
- **Purpose**: Limit AI scans to specific application codebases
- **Available Applications**:
  - OrderService
  - PaymentAPI
  - AuthService
  - NotificationService
  - CacheLayer
  - UserService

- **Use Case**: User searches logs for an issue and selects only the applications involved (e.g., OrderService + PaymentAPI)
- **Benefits**:
  - Reduces noise in AI analysis
  - Faster search results
  - More targeted insights

#### Database Filter
- **Purpose**: Specify which databases to include in the search
- **Available Databases**:
  - PostgreSQL-Main
  - MongoDB-Sessions
  - Redis-Cache
  - MySQL-Analytics

- **Use Case**: When tracking a correlation ID, users can also select which databases to search
- **Benefits**:
  - AI focuses only on relevant data sources
  - Prevents unnecessary database queries
  - More efficient resource usage

### User Interface

The advanced filters panel includes:

1. **Correlation ID Input**
   - Text field for entering correlation/request IDs
   - Helper text: "Track specific request across services"

2. **Multi-Select Application Filter**
   - Shows count of selected applications
   - Helper text: "Limit AI scan to selected codebases"

3. **Multi-Select Database Filter**
   - Shows count of selected databases
   - Helper text: "Focus search on specific databases"

4. **Active Filters Display**
   - Visual chips showing all active filters
   - One-click removal of individual filters
   - Color-coded by filter type:
     - Correlation ID: Purple (accent color)
     - Applications: Blue (info color)
     - Databases: Orange (warning color)

### API Integration Points

```typescript
// When searching logs with filters:
const searchParams = {
  query: searchQuery,
  correlationId: correlationId,
  applications: selectedApplications,
  databases: selectedDatabases,
  level: selectedLevel,
  timeRange: selectedTimeRange
};

// AI receives focused context:
// - Only scans selected application codebases
// - Only queries selected databases
// - Follows correlation ID across services
```

---

## 📊 Feature 2: HTTP Status Code Dashboard

### Location
`/frontend/src/app/dashboard/metrics/page.tsx`

### Implementation Details

#### Summary Statistics Display
- **Status Code Categories**:
  - 2xx (Success): Green theme
  - 3xx (Redirects): Blue theme
  - 4xx (Client Errors): Yellow/Orange theme
  - 5xx (Server Errors): Red theme

#### Per-Application Breakdown
- **Aggregated View**: Shows total counts across all applications
- **Per-App View**: Dropdown to select specific application
- **Visual Representation**:
  - Large cards showing count for each status code category
  - Color-coded backgrounds matching severity
  - Percentage-based horizontal bars showing distribution

#### Application Comparison
- **Success Rate Calculation**: Displays percentage of 2xx responses
- **Visual Bar Charts**: Proportional representation of all status codes
- **Sortable**: Easy comparison across services

### User Configuration

#### Customization Options
1. **Application Filter**: View all apps or select specific one
2. **Time Range**: Filter by time period (inherited from page-level filter)
3. **Export Capability**: Download metrics for reporting

#### Planned Enhancements
- User-configurable dashboards (save custom views)
- Custom threshold alerts
- Trend analysis over time
- Comparison with historical baselines

### Sample Data Structure

```typescript
const httpStatusByApp = {
  'OrderService': { 
    '2xx': 8942,  // Successful requests
    '3xx': 234,   // Redirects
    '4xx': 89,    // Client errors
    '5xx': 12     // Server errors
  },
  // ... more applications
};
```

---

## 🏥 Feature 3: Application Health & Uptime Monitoring

### Location
`/frontend/src/app/dashboard/metrics/page.tsx`

### Implementation Details

#### Ping Check Integration
- **Active Monitoring**: Displays "Monitoring Active" status with pulsing indicator
- **Last Check Timestamp**: Shows when each service was last pinged
- **Health Status**: Binary healthy/degraded state with color coding

#### Metrics Tracked

1. **Uptime Percentage**
   - 30-day rolling average
   - Color-coded thresholds:
     - ≥99.9%: Green (excellent)
     - ≥99.0%: Yellow (good)
     - <99.0%: Red (poor)

2. **Response Time**
   - Average ping response time in milliseconds
   - Color-coded thresholds:
     - <100ms: Green (fast)
     - <300ms: Yellow (acceptable)
     - ≥300ms: Red (slow)

3. **Ping Success Rate**
   - Percentage of successful health checks
   - Calculated over last 30 days

4. **Overall Status**
   - Visual indicator with icon
   - Healthy: Green checkmark
   - Degraded: Yellow warning triangle

#### Visual Components

1. **Health Indicator**
   - Pulsing dot with glow effect
   - Color matches status (green/yellow/red)

2. **Status Badge**
   - "HEALTHY" or "DEGRADED" label
   - Color-coded background

3. **Metrics Grid**
   - 4-column layout showing all metrics
   - Large, readable numbers
   - Color-coded for quick assessment

4. **Uptime Bar**
   - Visual representation of 30-day uptime
   - Percentage-based width
   - Color matches performance tier

### Sample Application Data

```typescript
const applicationHealth = [
  {
    name: 'OrderService',
    uptime: 99.97,           // 30-day uptime %
    lastCheck: '30s ago',    // Last ping timestamp
    status: 'healthy',       // Health state
    responseTime: 45,        // Avg response time (ms)
    pingSuccess: 99.98      // Ping success rate %
  },
  // ... more applications
];
```

---

## 🤖 Feature 4: AI-Powered Dashboard Builder

### Location
`/frontend/src/app/dashboard/dashboard-builder/page.tsx`

### Implementation Details

#### Natural Language Interface
- **User Input**: Free-form text describing desired dashboard
- **AI Processing**: Converts request to platform-specific query
- **Multi-Platform Support**:
  - Splunk
  - Elasticsearch
  - Prometheus
  - Grafana
  - Datadog
  - Custom SQL

#### Workflow

1. **Platform Selection**
   - Visual card-based selector
   - Icons for each platform
   - Active state highlighting

2. **Request Description**
   - Large text area for natural language input
   - Quick example templates
   - Common use case suggestions

3. **Query Generation**
   - AI generates platform-specific query
   - Syntax highlighting
   - Explanation of what the query does

4. **Execution Options**
   - **Option A**: Execute in TraceonAI
     - Run query directly in the platform
     - Display results in dashboard
     - Save for future use
   
   - **Option B**: Copy to External Platform
     - Copy query to clipboard
     - Instructions for pasting into target platform
     - Syntax already formatted correctly

#### Features

##### Query Management
- **Save Dashboards**: Store generated queries for reuse
- **Dashboard Library**: View all saved configurations
- **One-Click Delete**: Remove unwanted dashboards
- **Metadata Tracking**:
  - Creation timestamp
  - Platform used
  - Query description
  - Original user request

##### AI Assistance
- **Context-Aware**: Understands common metrics and patterns
- **Best Practices**: Generates optimized queries
- **Error Handling**: Validates query syntax
- **Explanations**: Provides plain-English description

##### Example Requests
```
1. "Show me error rate by service for the last 24 hours"
   → Generates time-series query grouped by service

2. "Create a dashboard for API response times with p50, p95, p99"
   → Generates percentile calculations

3. "Display HTTP 5xx errors grouped by endpoint"
   → Generates filtered aggregation query

4. "Monitor database connection pool usage across all services"
   → Generates multi-service monitoring query

5. "Track user authentication failures over time"
   → Generates authentication event tracking query
```

#### Generated Query Examples

**Splunk Query:**
```spl
index=production sourcetype=application_logs level=error
| stats count by service
| sort -count
| timechart span=1h count by service
```

**Prometheus Query:**
```promql
sum(rate(http_requests_total{job="api"}[5m])) by (status_code)
or
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

**SQL Query:**
```sql
SELECT service, COUNT(*) as error_count
FROM logs
WHERE level = 'error' AND timestamp >= NOW() - INTERVAL '24 hours'
GROUP BY service
ORDER BY error_count DESC
```

### User Interface Components

1. **Platform Selector**: 3-column grid of platform cards
2. **Request Input**: Large textarea with examples
3. **Generate Button**: Primary action with loading state
4. **Query Display**: Syntax-highlighted code block
5. **Action Buttons**:
   - Copy to clipboard
   - Save dashboard
   - Execute in TraceonAI
   - Download for external use

6. **Saved Dashboards Panel**: 
   - Scrollable list
   - Platform badges
   - Quick delete
   - Click to load

7. **Tips Panel**: Best practices and guidance

---

## 📋 Feature Summary Table

| Feature | Location | Status | Use Case |
|---------|----------|--------|----------|
| **Correlation ID Search** | `logs/page.tsx` | ✅ Implemented | Track requests across services |
| **Application Filter** | `logs/page.tsx` | ✅ Implemented | Focus AI on specific codebases |
| **Database Filter** | `logs/page.tsx` | ✅ Implemented | Target specific data sources |
| **HTTP Status Dashboard** | `metrics/page.tsx` | ✅ Implemented | Monitor API health by status codes |
| **User-Configurable Dashboards** | `metrics/page.tsx` | ⚠️ Partial | Filter by application, time range |
| **Application Health** | `metrics/page.tsx` | ✅ Implemented | Ping checks and uptime monitoring |
| **AI Dashboard Builder** | `dashboard-builder/page.tsx` | ✅ Implemented | Generate queries from natural language |
| **Multi-Platform Support** | `dashboard-builder/page.tsx` | ✅ Implemented | Splunk, Prometheus, SQL, etc. |

---

## 🎯 Key Benefits

### For Users
1. **Faster Incident Resolution**: Correlation ID + app filtering = targeted analysis
2. **Better Visibility**: HTTP status dashboards show API health at a glance
3. **Reduced Complexity**: AI generates queries without needing to know syntax
4. **Flexibility**: Execute in TraceonAI or copy to existing tools
5. **Historical Context**: Uptime monitoring tracks trends over time

### For AI Analysis
1. **Focused Scope**: Only scans selected applications and databases
2. **Better Context**: Correlation IDs provide request flow understanding
3. **Reduced Noise**: Filters eliminate irrelevant data
4. **Faster Processing**: Smaller dataset = quicker insights

---

## 🚀 Future Enhancements

### Short-Term
- [ ] Persist user dashboard configurations
- [ ] Add custom metric thresholds
- [ ] Email/Slack alerts for status code anomalies
- [ ] Historical trend comparison
- [ ] Advanced AI query refinement

### Medium-Term
- [ ] Custom dashboard templates
- [ ] Drag-and-drop dashboard builder
- [ ] Real-time query execution with streaming results
- [ ] Integration with external platforms (API-based)
- [ ] Collaborative dashboard sharing

### Long-Term
- [ ] Machine learning-powered query optimization
- [ ] Automatic anomaly detection in dashboards
- [ ] Predictive health monitoring
- [ ] Multi-tenant dashboard isolation
- [ ] Custom visualization types

---

## 📖 User Guide

### How to Search Logs with Correlation ID

1. Navigate to **Dashboard → Logs**
2. Click **"Advanced Filters"** button
3. Enter your correlation ID (e.g., `req_abc123`)
4. Select relevant applications (optional but recommended)
5. Select relevant databases (optional)
6. Click search or press Enter
7. View filtered results with active filter chips

### How to Monitor HTTP Status Codes

1. Navigate to **Dashboard → Metrics**
2. Scroll to **"HTTP Status Code Distribution"** section
3. Use dropdown to filter by application or view all
4. Observe color-coded status cards:
   - Green: 2xx responses (success)
   - Blue: 3xx responses (redirects)
   - Yellow: 4xx responses (client errors)
   - Red: 5xx responses (server errors)
5. View breakdown by application in the list below

### How to Check Application Health

1. Navigate to **Dashboard → Metrics**
2. Scroll to **"Application Health & Uptime"** section
3. View each application's status:
   - Green pulsing dot = healthy
   - Yellow pulsing dot = degraded
4. Check key metrics:
   - **Uptime**: 30-day availability percentage
   - **Response Time**: Average ping latency
   - **Ping Success**: Health check success rate
5. Monitor uptime bar for visual representation

### How to Create a Dashboard with AI

1. Navigate to **Dashboard → Dashboard Builder**
2. Select your target platform (Splunk, Prometheus, etc.)
3. Describe what you want in plain English
   - Example: "Show error rates by service for last 24 hours"
4. Click **"Generate Dashboard Query"**
5. Review the generated query and explanation
6. Choose an action:
   - **Execute in TraceonAI**: Run and visualize results
   - **Copy**: Use in your own platform
   - **Save**: Store for future reference
7. Optionally save to your dashboard library

---

## 🔧 Technical Architecture

### State Management
```typescript
// Advanced Filters State
const [correlationId, setCorrelationId] = useState('');
const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
const [selectedDatabases, setSelectedDatabases] = useState<string[]>([]);
const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
```

### Data Flow
```
User Input → State Update → Filter Application → API Call → AI Processing → Results Display
```

### Component Hierarchy
```
ProfessionalDashboardLayout
├── LogsPage
│   ├── SearchBar
│   ├── AdvancedFilters
│   │   ├── CorrelationIdInput
│   │   ├── ApplicationSelector
│   │   └── DatabaseSelector
│   └── LogsTable
├── MetricsPage
│   ├── HTTPStatusDashboard
│   │   ├── StatusCodeCards
│   │   └── ApplicationBreakdown
│   └── HealthMonitoring
│       └── ApplicationHealthCards
└── DashboardBuilderPage
    ├── PlatformSelector
    ├── RequestInput
    ├── QueryDisplay
    └── SavedDashboards
```

---

## 📝 API Integration Specifications

### Logs Search API
```typescript
POST /api/logs/search
{
  query: string;
  correlationId?: string;
  applications?: string[];
  databases?: string[];
  level?: 'error' | 'warn' | 'info' | 'debug';
  timeRange?: string;
  limit?: number;
}
```

### Metrics API
```typescript
GET /api/metrics/http-status
{
  applications?: string[];
  timeRange?: string;
}

GET /api/metrics/health
{
  applications?: string[];
}
```

### Dashboard Builder API
```typescript
POST /api/ai/generate-query
{
  request: string;
  platform: 'splunk' | 'prometheus' | 'elasticsearch' | etc;
  context?: object;
}

POST /api/dashboards/execute
{
  query: string;
  platform: string;
}
```

---

## ✅ Testing Checklist

- [x] Correlation ID search filters logs correctly
- [x] Application filter limits AI scope
- [x] Database filter focuses search
- [x] Active filters display and remove properly
- [x] HTTP status codes display by application
- [x] Status code color coding is correct
- [x] Application health metrics display
- [x] Uptime monitoring shows accurate data
- [x] Ping check status updates
- [x] Dashboard builder generates queries
- [x] Multi-platform support works
- [x] Query copy/save functionality works
- [x] Saved dashboards persist and load

---

## 🎨 Design Tokens Used

All components follow the TraceonAI design system:

- `--accent-primary`: Primary brand color (purple)
- `--status-positive`: Success/healthy state (green)
- `--status-warning`: Warning state (yellow/orange)
- `--status-critical`: Error/critical state (red)
- `--status-info`: Informational state (blue)
- `--card-bg`: Card background color
- `--card-border`: Card border color
- `--input-bg`: Input field background
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--text-muted`: Muted text color

---

## 📞 Support & Documentation

For additional help:
- View in-app tooltips and helper text
- Check example requests and templates
- Refer to this documentation
- Contact support for custom configurations

---

**Last Updated**: October 22, 2025  
**Version**: 1.0  
**Maintainer**: TraceonAI Engineering Team
