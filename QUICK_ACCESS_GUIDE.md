# Quick Feature Access Guide

A quick reference for accessing all implemented features in the TraceonAI dashboard.

---

## 🗺️ Dashboard Navigation Map

```
TraceonAI Dashboard
│
├── 📊 Overview (Main Dashboard)
│   └── High-level KPIs and recent incidents
│
├── 🔍 Logs Explorer ⭐ FEATURE: Correlation ID & Filters
│   ├── Advanced Filters Panel
│   │   ├── Correlation ID Search
│   │   ├── Application Filter (multi-select)
│   │   └── Database Filter (multi-select)
│   ├── Log Level Filter
│   ├── Time Range Selector
│   └── Live/Paused Toggle
│
├── 📈 Metrics Dashboard ⭐ FEATURES: HTTP Status & Health
│   ├── Key Metrics Grid
│   ├── Service Health Overview
│   ├── HTTP Status Code Distribution ⭐ NEW
│   │   ├── Status Code Summary (2xx, 3xx, 4xx, 5xx)
│   │   ├── Application Selector
│   │   └── Breakdown by Application
│   └── Application Health & Uptime ⭐ NEW
│       ├── Live Ping Monitoring
│       ├── Uptime Percentages
│       ├── Response Times
│       └── Health Status Indicators
│
├── 🤖 Dashboard Builder ⭐ FEATURE: AI-Powered Creation
│   ├── Platform Selection
│   │   ├── Splunk
│   │   ├── Elasticsearch
│   │   ├── Prometheus
│   │   ├── Grafana
│   │   ├── Datadog
│   │   └── Custom SQL
│   ├── Natural Language Input
│   ├── AI Query Generator
│   ├── Query Display & Actions
│   │   ├── Execute in TraceonAI
│   │   ├── Copy to Clipboard
│   │   ├── Save Dashboard
│   │   └── Export
│   └── Saved Dashboards Library
│
├── 🎯 Query Studio
│   └── Interactive SQL editor
│
├── 🚨 Incidents
│   └── Incident management
│
├── 📊 Analytics
│   └── Advanced analytics
│
└── ⚙️ Settings
    └── Configuration
```

---

## 🎯 Feature Quick Access

### Feature 1: Correlation ID Search
**Path**: `Dashboard → Logs → Advanced Filters`

**Steps**:
1. Click sidebar: **Logs**
2. Click button: **Advanced Filters**
3. Enter **Correlation ID** in input field
4. Select **Applications** (multi-select)
5. Select **Databases** (multi-select)
6. View active filters as colored chips
7. Search/filter applied automatically

**Visual Cues**:
- Advanced Filters button turns purple when active
- Active filters show as colored chips below the panel
- Filter count displayed in button badge

---

### Feature 2: HTTP Status Code Dashboard
**Path**: `Dashboard → Metrics → HTTP Status Code Distribution`

**Steps**:
1. Click sidebar: **Metrics**
2. Scroll to **"HTTP Status Code Distribution"** section
3. Use dropdown to select:
   - "All Applications" (aggregated view)
   - Specific application (e.g., "OrderService")
4. View 4 status code cards:
   - 2xx (Green): Successful responses
   - 3xx (Blue): Redirections
   - 4xx (Yellow): Client errors
   - 5xx (Red): Server errors
5. See breakdown by application in list below

**Visual Cues**:
- Color-coded cards matching status code severity
- Large numbers with emoji indicators
- Success rate percentages
- Horizontal bar charts showing distribution

---

### Feature 3: Application Health & Uptime
**Path**: `Dashboard → Metrics → Application Health & Uptime`

**Steps**:
1. Click sidebar: **Metrics**
2. Scroll to **"Application Health & Uptime"** section
3. View monitoring status (green pulsing dot = active)
4. For each application, see:
   - Uptime percentage (30-day)
   - Response time (ms)
   - Ping success rate
   - Health status (Healthy/Degraded)
5. Check visual uptime bars at bottom of each card

**Visual Cues**:
- Pulsing colored dots (green = healthy, yellow = degraded)
- Status badges (HEALTHY/DEGRADED)
- Color-coded metrics based on thresholds
- Last check timestamp
- Uptime progress bars

---

### Feature 4: AI Dashboard Builder
**Path**: `Dashboard → Dashboard Builder`

**Steps**:
1. Click sidebar: **Dashboard Builder** (or create new menu item)
2. Select target platform (Splunk, Prometheus, etc.)
3. Type your request in plain English
   - Or click an example to auto-fill
4. Click **"Generate Dashboard Query"**
5. Wait for AI to generate query (~2 seconds)
6. Review generated query and explanation
7. Choose action:
   - **Execute in TraceonAI**: Run and display results
   - **Copy**: Use in your platform
   - **Save**: Add to library
8. View saved dashboards in right panel

**Visual Cues**:
- Platform cards with icons
- Selected platform highlighted in purple
- AI sparkle icon on generate button
- Animated loading spinner during generation
- Success checkmark when query generated
- Syntax-highlighted code block

---

## 🎨 Visual Design Patterns

### Status Indicators

| Color | Meaning | Used For |
|-------|---------|----------|
| 🟢 Green | Success/Healthy | 2xx status, healthy apps, >99.9% uptime |
| 🔵 Blue | Info/Neutral | 3xx status, informational states |
| 🟡 Yellow | Warning/Degraded | 4xx status, degraded apps, 99-99.9% uptime |
| 🔴 Red | Error/Critical | 5xx status, critical states, <99% uptime |
| 🟣 Purple | Primary/Active | Selected filters, primary actions, AI features |

### Interactive Elements

| Element | Visual Feedback |
|---------|-----------------|
| Buttons | Scale up on hover (1.05x), scale down on click (0.95x) |
| Cards | Scale up on hover (1.02x), border glow on active |
| Filters | Purple background when active, chip badges |
| Status Dots | Pulsing animation + glow effect |
| Metrics | Color changes based on threshold values |

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Full grid layouts (3-4 columns)
- Sidebar expanded by default
- All features visible simultaneously

### Tablet (768px - 1024px)
- 2-column grids
- Sidebar collapsible
- Stacked filter panels

### Mobile (<768px)
- Single column layouts
- Sidebar hidden by default
- Filters in expandable panels
- Touch-optimized controls

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘/` or `Ctrl+/` | Global search |
| `⇧⌘P` | Command palette |
| `⌘K` | Focus search bar |
| `Esc` | Close modals/panels |

---

## 🔔 Real-Time Updates

### Live Features
- **Logs Explorer**: Auto-refresh when "Live" mode enabled (pulsing red button)
- **Metrics Dashboard**: Auto-refresh when enabled (green pulsing button)
- **Health Monitoring**: Continuous ping checks with timestamp updates

### Manual Refresh
- Refresh button in page header
- Time range selector triggers data reload
- Filter changes trigger immediate search

---

## 💡 Tips for Best Experience

### For Correlation ID Search
✅ **DO**: 
- Enter full correlation ID for exact match
- Select only relevant applications to speed up search
- Choose specific databases if you know where data is

❌ **DON'T**: 
- Leave all filters unselected (defeats the purpose)
- Use partial correlation IDs (may not match)

### For HTTP Status Dashboards
✅ **DO**: 
- Start with "All Applications" view for overview
- Drill down to specific app when investigating
- Compare success rates across services

❌ **DON'T**: 
- Ignore 4xx errors (may indicate client-side issues)
- Only focus on 5xx (4xx trends can predict problems)

### For Dashboard Builder
✅ **DO**: 
- Be specific in your request (include time ranges, metrics)
- Use the example templates as starting points
- Save successful queries for reuse

❌ **DON'T**: 
- Use vague requests like "show me stuff"
- Forget to specify aggregation methods (avg, sum, count)
- Skip saving useful queries

### For Health Monitoring
✅ **DO**: 
- Check regularly for trending degradation
- Investigate when uptime drops below 99.9%
- Monitor response time trends

❌ **DON'T**: 
- Wait for complete outage before acting
- Ignore yellow "degraded" status
- Dismiss single failed ping checks

---

## 🎯 Common Workflows

### Workflow 1: Investigating an Issue
```
1. Receive alert about issue
2. Get correlation ID from logs/support
3. Go to Logs Explorer
4. Open Advanced Filters
5. Enter correlation ID
6. Select affected applications
7. Review filtered logs
8. AI analyzes focused dataset
9. Root cause identified
```

### Workflow 2: Creating Weekly Report
```
1. Go to Metrics Dashboard
2. Note HTTP status distribution
3. Check application uptime percentages
4. Export data
5. Go to Dashboard Builder
6. Generate Splunk query for detailed analysis
7. Run in Splunk for historical data
8. Compile report
```

### Workflow 3: Proactive Monitoring
```
1. Daily check: Metrics Dashboard
2. Review HTTP status codes for anomalies
3. Check application health indicators
4. If yellow status appears:
   - Investigate response time trends
   - Check uptime history
   - Review recent incidents
5. Set up Dashboard Builder query for monitoring
6. Schedule regular checks
```

---

## 📚 Related Documentation

- **Detailed Feature Guide**: [FEATURES_IMPLEMENTATION.md](./FEATURES_IMPLEMENTATION.md)
- **Requirements Mapping**: [FEATURE_REQUIREMENTS_MAPPING.md](./FEATURE_REQUIREMENTS_MAPPING.md)
- **Dashboard Design**: [PROFESSIONAL_DASHBOARD.md](./PROFESSIONAL_DASHBOARD.md)
- **Main README**: [README.md](./README.md)

---

## 🆘 Need Help?

### In-App Help
- Hover over any field for tooltips
- Click "?" icons for contextual help
- View example requests in Dashboard Builder

### Documentation
- Check feature documentation files
- Review use case examples
- Read API integration specs

### Support
- Contact engineering team
- Submit feedback
- Report bugs

---

**Quick Start Checklist**:
- [ ] Navigate to Logs and test Advanced Filters
- [ ] Check Metrics for HTTP Status dashboard
- [ ] View Application Health monitoring
- [ ] Try Dashboard Builder with example request
- [ ] Save your first custom dashboard
- [ ] Explore other dashboard features

---

**Last Updated**: October 22, 2025  
**Version**: 1.0
