'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Book, 
  Code, 
  Zap, 
  Shield, 
  Database, 
  MessageCircle, 
  Brain, 
  Network,
  ChevronRight,
  Search,
  Menu,
  X,
  Copy,
  Check,
  ExternalLink,
  Github,
  Terminal,
  FileCode,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { id: 'getting-started', label: 'Introduction', icon: Book },
        { id: 'quick-start', label: 'Quick Start', icon: Zap },
        { id: 'installation', label: 'Installation', icon: Terminal },
        { id: 'authentication', label: 'Authentication', icon: Shield },
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { id: 'ai-agents', label: 'AI Agents', icon: Brain },
        { id: 'integrations', label: 'Integrations', icon: Network },
        { id: 'root-cause-analysis', label: 'Root Cause Analysis', icon: Search },
        { id: 'notifications', label: 'Notifications', icon: MessageCircle },
      ]
    },
    {
      title: 'API Reference',
      items: [
        { id: 'api-overview', label: 'API Overview', icon: Code },
        { id: 'endpoints', label: 'Endpoints', icon: FileCode },
        { id: 'webhooks', label: 'Webhooks', icon: Zap },
        { id: 'errors', label: 'Error Handling', icon: AlertCircle },
      ]
    },
    {
      title: 'Integrations',
      items: [
        { id: 'datadog', label: 'Datadog', icon: Database },
        { id: 'slack', label: 'Slack', icon: MessageCircle },
        { id: 'postgresql', label: 'PostgreSQL', icon: Database },
        { id: 'pagerduty', label: 'PagerDuty', icon: Bell },
      ]
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return <GettingStartedContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'quick-start':
        return <QuickStartContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'installation':
        return <InstallationContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'authentication':
        return <AuthenticationContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'ai-agents':
        return <AIAgentsContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'integrations':
        return <IntegrationsContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'api-overview':
        return <APIOverviewContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'endpoints':
        return <EndpointsContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'datadog':
        return <DatadogContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      case 'slack':
        return <SlackContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
      default:
        return <GettingStartedContent copyToClipboard={copyToClipboard} copiedCode={copiedCode} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderColor: 'var(--border-primary)' 
      }}>
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ 
                backgroundColor: 'var(--neon-purple)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
              }}>
                <Brain className="w-5 h-5" style={{ color: 'var(--bg-primary)' }} />
              </div>
              <span className="text-xl font-bold neon-text">TraceonAI Docs</span>
            </Link>
            
            {/* Search Bar */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg glass-effect" style={{ minWidth: '300px', border: '1px solid var(--border-primary)' }}>
              <Search className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search documentation..." 
                className="bg-transparent outline-none text-sm w-full"
                style={{ color: 'var(--text-primary)' }}
              />
              <kbd className="px-2 py-1 text-xs rounded" style={{ 
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-tertiary)'
              }}>⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/traceonai/traceon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg glass-effect transition-all duration-300 hover:scale-105"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              <Github className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>GitHub</span>
            </a>
            <Link 
              href="/"
              className="hidden md:block px-4 py-2 rounded-lg btn-primary"
            >
              Back to Home
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg glass-effect"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-72 
          border-r overflow-y-auto z-40 transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `} style={{ 
          backgroundColor: 'var(--bg-primary)', 
          borderColor: 'var(--border-primary)' 
        }}>
          <nav className="p-6 space-y-8">
            {navigation.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                          ${activeSection === item.id 
                            ? 'neon-border' 
                            : 'hover:bg-opacity-50'
                          }
                        `}
                        style={{ 
                          backgroundColor: activeSection === item.id ? 'var(--bg-secondary)' : 'transparent',
                          color: activeSection === item.id ? 'var(--neon-blue)' : 'var(--text-secondary)'
                        }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-12 py-12 max-w-4xl">
          {renderContent()}
        </main>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block sticky top-[73px] w-64 h-[calc(100vh-73px)] border-l px-6 py-12" style={{ borderColor: 'var(--border-primary)' }}>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>
            On This Page
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#overview" className="transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
                Overview
              </a>
            </li>
            <li>
              <a href="#features" className="transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
                Key Features
              </a>
            </li>
            <li>
              <a href="#examples" className="transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
                Examples
              </a>
            </li>
            <li>
              <a href="#next-steps" className="transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
                Next Steps
              </a>
            </li>
          </ul>
        </aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Content Components
function GettingStartedContent({ copyToClipboard, copiedCode }: any) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Welcome to TraceonAI</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        TraceonAI is an agentic AI platform that connects your logging tools, databases, and communication 
        channels to automate incident response and root cause analysis.
      </p>

      <div className="p-6 rounded-xl glass-effect neon-border mb-8">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 mt-1" style={{ color: 'var(--neon-orange)' }} />
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>What is TraceonAI?</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              TraceonAI is your AI SRE team that never sleeps. It monitors your infrastructure 24/7, 
              correlates data from multiple sources, identifies root causes, and automatically notifies 
              your team with actionable solutions.
            </p>
          </div>
        </div>
      </div>

      <h2 id="features" className="text-2xl font-bold mb-4 mt-12" style={{ color: 'var(--text-primary)' }}>
        Key Features
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { icon: Network, title: 'Multi-Source Integration', desc: 'Connect 15+ tools including Datadog, Splunk, PostgreSQL' },
          { icon: Brain, title: 'Intelligent Analysis', desc: 'AI-powered root cause detection in seconds' },
          { icon: MessageCircle, title: 'Smart Notifications', desc: 'Auto-notify teams via Slack, PagerDuty, Email' },
          { icon: Zap, title: 'Automation', desc: 'Auto-create Jira tickets and fix PRs' },
        ].map((feature, idx) => (
          <div key={idx} className="p-4 rounded-lg glass-effect flex gap-3">
            <feature.icon className="w-5 h-5 mt-1" style={{ color: 'var(--neon-blue)' }} />
            <div>
              <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{feature.title}</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="next-steps" className="text-2xl font-bold mb-4 mt-12" style={{ color: 'var(--text-primary)' }}>
        Next Steps
      </h2>
      <div className="space-y-3">
        <a href="#" className="flex items-center justify-between p-4 rounded-lg glass-effect hover:neon-border transition-all">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" style={{ color: 'var(--neon-green)' }} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Quick Start Guide</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
        </a>
        <a href="#" className="flex items-center justify-between p-4 rounded-lg glass-effect hover:neon-border transition-all">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5" style={{ color: 'var(--neon-purple)' }} />
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>API Reference</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
        </a>
      </div>
    </div>
  );
}

function QuickStartContent({ copyToClipboard, copiedCode }: any) {
  const installCode = `npm install @traceonai/sdk`;
  const initCode = `import TraceonAI from '@traceonai/sdk';

const traceon = new TraceonAI({
  apiKey: process.env.TRACEON_API_KEY,
  environment: 'production'
});

// Start monitoring
await traceon.start();`;

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Quick Start</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Get up and running with TraceonAI in less than 5 minutes.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>
        1. Install the SDK
      </h2>
      <CodeBlock code={installCode} language="bash" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="install" />

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>
        2. Initialize TraceonAI
      </h2>
      <CodeBlock code={initCode} language="typescript" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="init" />

      <div className="p-6 rounded-xl glass-effect mt-8" style={{ borderLeft: '4px solid var(--neon-green)' }}>
        <div className="flex items-start gap-3">
          <Check className="w-6 h-6 mt-1" style={{ color: 'var(--neon-green)' }} />
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>You're all set!</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              TraceonAI is now monitoring your application. Visit your dashboard to see real-time insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstallationContent({ copyToClipboard, copiedCode }: any) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Installation</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Choose your preferred installation method.
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>npm</h2>
      <CodeBlock code="npm install @traceonai/sdk" language="bash" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="npm" />

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>yarn</h2>
      <CodeBlock code="yarn add @traceonai/sdk" language="bash" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="yarn" />

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>pnpm</h2>
      <CodeBlock code="pnpm add @traceonai/sdk" language="bash" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="pnpm" />
    </div>
  );
}

function AuthenticationContent({ copyToClipboard, copiedCode }: any) {
  const authCode = `const traceon = new TraceonAI({
  apiKey: 'sk_live_...',  // Your API key
  environment: 'production'
});`;

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Authentication</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Authenticate your requests using API keys.
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>API Keys</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
        TraceonAI uses API keys to authenticate requests. You can find your API keys in the dashboard.
      </p>

      <CodeBlock code={authCode} language="typescript" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="auth" />

      <div className="p-6 rounded-xl glass-effect mt-8" style={{ borderLeft: '4px solid var(--neon-orange)' }}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 mt-1" style={{ color: 'var(--neon-orange)' }} />
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Keep your keys secure</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Never commit API keys to version control. Use environment variables instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIAgentsContent({ copyToClipboard, copiedCode }: any) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">AI Agents</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Understand how TraceonAI's intelligent agents work to keep your systems reliable.
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>How AI Agents Work</h2>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
        TraceonAI agents continuously monitor your infrastructure, analyzing data from multiple sources 
        to detect anomalies, identify root causes, and recommend solutions.
      </p>

      <div className="space-y-4">
        {[
          { 
            step: '1', 
            title: 'Data Collection', 
            desc: 'Agents collect metrics, logs, and traces from all connected sources',
            icon: Database 
          },
          { 
            step: '2', 
            title: 'Pattern Analysis', 
            desc: 'AI models analyze patterns and correlate events across your stack',
            icon: Brain 
          },
          { 
            step: '3', 
            title: 'Root Cause Detection', 
            desc: 'Machine learning identifies the exact cause of issues',
            icon: Search 
          },
          { 
            step: '4', 
            title: 'Automated Response', 
            desc: 'Agents notify teams and can auto-remediate common issues',
            icon: Zap 
          },
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-xl glass-effect neon-border">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--neon-purple)', opacity: 0.2 }}>
                <item.icon className="w-6 h-6" style={{ color: 'var(--neon-purple)' }} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: 'var(--neon-purple)', color: 'var(--bg-primary)' }}>
                    Step {item.step}
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsContent({ copyToClipboard, copiedCode }: any) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Integrations</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Connect TraceonAI with your existing tools and platforms.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { name: 'Datadog', category: 'Monitoring', icon: Database, color: 'var(--neon-purple)' },
          { name: 'Slack', category: 'Communication', icon: MessageCircle, color: 'var(--neon-blue)' },
          { name: 'PostgreSQL', category: 'Database', icon: Database, color: 'var(--neon-green)' },
          { name: 'PagerDuty', category: 'Alerting', icon: Bell, color: 'var(--neon-orange)' },
          { name: 'Splunk', category: 'Logging', icon: Search, color: 'var(--neon-purple)' },
          { name: 'Jira', category: 'Project Management', icon: FileCode, color: 'var(--neon-blue)' },
        ].map((integration, idx) => (
          <div key={idx} className="p-6 rounded-xl glass-effect hover:neon-border transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: integration.color, opacity: 0.2 }}>
                <integration.icon className="w-6 h-6" style={{ color: integration.color }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{integration.name}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{integration.category}</p>
                <div className="flex items-center gap-2 text-sm" style={{ color: integration.color }}>
                  <span>View Integration</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function APIOverviewContent({ copyToClipboard, copiedCode }: any) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">API Overview</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        The TraceonAI API is organized around REST principles.
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Base URL</h2>
      <CodeBlock code="https://api.traceonai.com/v1" language="text" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="base-url" />

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>Authentication</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
        All API requests require authentication using an API key in the Authorization header:
      </p>
      <CodeBlock code="Authorization: Bearer sk_live_..." language="text" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="auth-header" />
    </div>
  );
}

function EndpointsContent({ copyToClipboard, copiedCode }: any) {
  const endpoints = [
    { method: 'GET', path: '/incidents', desc: 'List all incidents' },
    { method: 'POST', path: '/incidents', desc: 'Create a new incident' },
    { method: 'GET', path: '/incidents/:id', desc: 'Get incident details' },
    { method: 'POST', path: '/analyze', desc: 'Trigger AI analysis' },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">API Endpoints</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Complete reference for all available API endpoints.
      </p>

      <div className="space-y-4">
        {endpoints.map((endpoint, idx) => (
          <div key={idx} className="p-4 rounded-lg glass-effect">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded text-xs font-bold ${
                endpoint.method === 'GET' ? 'bg-blue-500' : 'bg-green-500'
              }`} style={{ color: 'var(--bg-primary)' }}>
                {endpoint.method}
              </span>
              <code className="text-sm" style={{ color: 'var(--neon-blue)' }}>{endpoint.path}</code>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{endpoint.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DatadogContent({ copyToClipboard, copiedCode }: any) {
  const configCode = `const traceon = new TraceonAI({
  apiKey: process.env.TRACEON_API_KEY,
  integrations: {
    datadog: {
      apiKey: process.env.DATADOG_API_KEY,
      appKey: process.env.DATADOG_APP_KEY,
      site: 'datadoghq.com'
    }
  }
});`;

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Datadog Integration</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Connect TraceonAI with Datadog to analyze metrics and logs.
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Configuration</h2>
      <CodeBlock code={configCode} language="typescript" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="datadog-config" />
    </div>
  );
}

function SlackContent({ copyToClipboard, copiedCode }: any) {
  const configCode = `const traceon = new TraceonAI({
  apiKey: process.env.TRACEON_API_KEY,
  integrations: {
    slack: {
      token: process.env.SLACK_BOT_TOKEN,
      channel: '#incidents'
    }
  }
});`;

  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 neon-text">Slack Integration</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
        Get real-time incident notifications in Slack.
      </p>

      <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Configuration</h2>
      <CodeBlock code={configCode} language="typescript" copyToClipboard={copyToClipboard} copiedCode={copiedCode} id="slack-config" />
    </div>
  );
}

// Code Block Component
function CodeBlock({ code, language, copyToClipboard, copiedCode, id }: any) {
  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="p-2 rounded-lg glass-effect transition-all duration-200 hover:scale-110"
          style={{ border: '1px solid var(--border-primary)' }}
        >
          {copiedCode === id ? (
            <Check className="w-4 h-4" style={{ color: 'var(--neon-green)' }} />
          ) : (
            <Copy className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
          )}
        </button>
      </div>
      <pre className="p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <code className="text-sm" style={{ color: 'var(--neon-blue)' }}>{code}</code>
      </pre>
    </div>
  );
}

// Missing import
import { Bell } from 'lucide-react';
