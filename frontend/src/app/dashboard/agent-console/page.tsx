'use client';

import React, { useState, useRef, useEffect } from 'react';
import ProfessionalDashboardLayout from '@/components/ProfessionalDashboardLayout';
import {
  Bot,
  Send,
  Paperclip,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Server,
  Activity,
  Zap,
  Brain,
  Code,
  FileCode,
  Terminal
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  confidence?: number;
  actions?: Action[];
  thinking?: string[];
}

interface Action {
  id: string;
  type: 'approval' | 'info' | 'executed';
  label: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'executed';
}

export default function AgentConsolePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'AI Agent Console initialized. I can help you with root cause analysis, log investigation, metric correlation, and automated remediation. What would you like to investigate?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAgentResponse = (userMessage: string) => {
    setIsThinking(true);
    
    // Simulate thinking steps
    const thinkingSteps = [
      'Analyzing query context...',
      'Searching across 12 data sources...',
      'Correlating metrics with logs...',
      'Identifying patterns...',
      'Generating insights...'
    ];

    setTimeout(() => {
      const response: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I've analyzed the database latency spike. Here's what I found:\n\n**Root Cause**: N+1 query problem in OrderService endpoint /api/orders\n\n**Evidence**:\n- PostgreSQL query count increased 340% at 14:32:08 UTC\n- Average query time: 1,200ms (baseline: 45ms)\n- Affected tables: orders, order_items, users\n\n**Impact**:\n- 3,500 users experienced slow page loads\n- Error rate increased to 0.12%\n- Payment processing delayed by avg 8.2s\n\n**Recommended Actions**:\n1. Add eager loading to OrderService.getOrders()\n2. Implement query result caching\n3. Roll back to v2.2.8 if degradation continues`,
        timestamp: new Date(),
        confidence: 98,
        thinking: thinkingSteps,
        actions: [
          {
            id: 'a1',
            type: 'approval',
            label: 'Roll back to v2.2.8',
            description: 'Revert OrderService to stable version',
            status: 'pending'
          },
          {
            id: 'a2',
            type: 'approval',
            label: 'Notify @backend-team',
            description: 'Send Slack alert with RCA details',
            status: 'pending'
          }
        ]
      };

      setMessages(prev => [...prev, response]);
      setIsThinking(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    simulateAgentResponse(input);
  };

  const handleApprove = (messageId: string, actionId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.actions) {
        return {
          ...msg,
          actions: msg.actions.map(action => 
            action.id === actionId 
              ? { ...action, status: 'approved' as const }
              : action
          )
        };
      }
      return msg;
    }));

    // Simulate execution
    setTimeout(() => {
      const executionMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '✅ Action executed successfully! OrderService rolled back to v2.2.8. Monitoring for improvements...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, executionMsg]);
    }, 1000);
  };

  const quickActions = [
    { icon: Database, label: 'Analyze database queries', query: 'Analyze slow database queries in the last hour' },
    { icon: Activity, label: 'Check error rates', query: 'What\'s causing the spike in error rates?' },
    { icon: Server, label: 'Service health check', query: 'Run health check on all services' },
    { icon: Code, label: 'Review recent deploys', query: 'Show me deployments in the last 24 hours' }
  ];

  return (
    <ProfessionalDashboardLayout>
      <div className="h-full flex flex-col" style={{ backgroundColor: 'var(--surface-default)' }}>
        {/* Header */}
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--surface-raised)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                }}
              >
                <Bot className="w-6 h-6" style={{ color: 'var(--text-inverse)' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  Agent Console
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: 'var(--status-positive-bg)', color: 'var(--status-positive-text)' }}>
                    Online
                  </span>
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Conversational root cause analysis with automated actions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  color: 'var(--text-secondary)',
                  border: `1px solid var(--border-default)`,
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.1)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.transform = 'scale(1)';
                }}
              >
                <Terminal 
                  className="w-4 h-4 inline mr-2" 
                  style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                View Logs
              </button>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                style={{
                  backgroundColor: 'var(--button-primary-bg)',
                  color: 'var(--button-primary-text)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.4)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.transform = 'scale(1)';
                }}
              >
                <FileCode 
                  className="w-4 h-4 inline mr-2" 
                  style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
                New Session
              </button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden flex">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: message.role === 'user' 
                        ? 'var(--surface-subtle)' 
                        : 'var(--accent-primary)',
                      color: message.role === 'user'
                        ? 'var(--text-primary)'
                        : 'var(--text-inverse)'
                    }}
                  >
                    {message.role === 'user' ? (
                      <span className="font-bold text-sm">JD</span>
                    ) : (
                      <Brain className="w-5 h-5" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 space-y-2">
                    <div
                      className="rounded-2xl px-6 py-4 max-w-3xl"
                      style={{
                        backgroundColor: message.role === 'user'
                          ? 'var(--accent-primary)'
                          : 'var(--card-bg)',
                        color: message.role === 'user'
                          ? 'var(--text-inverse)'
                          : 'var(--text-primary)',
                        border: message.role === 'user' 
                          ? 'none'
                          : `1px solid var(--border-default)`
                      }}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>

                      {/* Confidence Badge */}
                      {message.confidence && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                          <Sparkles className="w-4 h-4" style={{ color: 'var(--status-positive)' }} />
                          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Confidence: {message.confidence}%
                          </span>
                          <div className="flex-1 h-2 rounded-full overflow-hidden ml-2" style={{ backgroundColor: 'var(--surface-subtle)' }}>
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${message.confidence}%`,
                                backgroundColor: 'var(--status-positive)'
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-4 pt-4 space-y-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                            Recommended Actions (Approval Required):
                          </p>
                          {message.actions.map((action) => (
                            <div 
                              key={action.id}
                              className="flex items-center justify-between p-3 rounded-lg"
                              style={{ backgroundColor: 'var(--surface-subtle)' }}
                            >
                              <div className="flex-1">
                                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                                  {action.label}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                  {action.description}
                                </p>
                              </div>
                              {action.status === 'pending' ? (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleApprove(message.id, action.id)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium"
                                    style={{
                                      backgroundColor: 'var(--status-positive)',
                                      color: 'var(--text-inverse)',
                                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className="px-4 py-2 rounded-lg text-sm font-medium"
                                    style={{
                                      backgroundColor: 'var(--surface-default)',
                                      color: 'var(--text-secondary)',
                                      border: `1px solid var(--border-default)`,
                                      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateY(-2px)';
                                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(239, 68, 68, 0.1)';
                                      e.currentTarget.style.borderColor = 'var(--status-critical)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateY(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                      e.currentTarget.style.borderColor = 'var(--border-default)';
                                    }}
                                  >
                                    Reject
                                  </button>
                                </div>
                              ) : (
                                <span 
                                  className="px-3 py-1 rounded-full text-xs font-semibold"
                                  style={{
                                    backgroundColor: 'var(--status-positive-bg)',
                                    color: 'var(--status-positive-text)'
                                  }}
                                >
                                  ✓ Approved
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-2 px-2">
                      <Clock className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: 'var(--text-inverse)'
                    }}
                  >
                    <Brain className="w-5 h-5" />
                  </div>
                  <div
                    className="rounded-2xl px-6 py-4"
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      border: `1px solid var(--border-default)`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent-primary)', animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent-primary)', animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent-primary)', animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                        AI Agent is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sidebar - Quick Tools */}
          <div 
            className="w-80 border-l overflow-y-auto p-6 space-y-6"
            style={{ 
              borderColor: 'var(--border-default)',
              backgroundColor: 'var(--surface-raised)'
            }}
          >
            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setInput(action.query)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid var(--border-default)`,
                        color: 'var(--text-primary)',
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(124, 58, 237, 0.15)';
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.borderColor = 'var(--border-default)';
                        const icon = e.currentTarget.querySelector('svg');
                        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                      }}
                    >
                      <Icon 
                        className="w-5 h-5" 
                        style={{ 
                          color: 'var(--accent-primary)',
                          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }} 
                      />
                      <span className="text-sm font-medium text-left">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Available Tools
              </h3>
              <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Search logs across all sources</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Query metrics and dashboards</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Run SQL queries</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Describe service topology</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Diff deployments</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Create tickets</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Page on-call teams</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Run runbooks</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--status-positive)' }} />
                  <span>Post to Slack/Teams</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div 
          className="px-6 py-4 border-t"
          style={{ 
            borderColor: 'var(--border-default)',
            backgroundColor: 'var(--surface-raised)'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div 
              className="flex items-end gap-3 p-2 rounded-2xl border"
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--input-border)'
              }}
            >
              <button
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  color: 'var(--text-secondary)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'none';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.transform = 'scale(1)';
                }}
              >
                <Paperclip 
                  className="w-5 h-5" 
                  style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything about your infrastructure, logs, metrics, or incidents..."
                className="flex-1 resize-none bg-transparent outline-none px-2 py-2 max-h-32"
                style={{ color: 'var(--input-text)' }}
                rows={1}
              />

              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: input.trim() ? 'var(--button-primary-bg)' : 'var(--surface-subtle)',
                  color: 'var(--text-inverse)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isThinking) {
                    e.currentTarget.style.transform = 'scale(1.15) rotate(5deg)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(124, 58, 237, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </ProfessionalDashboardLayout>
  );
}
