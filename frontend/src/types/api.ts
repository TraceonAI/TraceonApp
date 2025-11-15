// API Types for Traceon AI
import type { AnalysisData } from '@/components/AnalysisDisplay';

export interface APIKey {
  id: string;
  name: string;
  key: string;
  created: Date;
  lastUsed?: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: 'slack' | 'sentry' | 'splunk' | 'teams' | 'opensearch' | 'github' | 'datadog';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
}

export interface AnalysisRequest {
  key: string;
  input?: string;
  timestamp: Date;
  integrations?: string[];
}

export interface AnalysisResponse {
  id: string;
  analysis: AnalysisData;
  metadata: {
    processingTime: number;
    sourceIntegrations: string[];
    confidence: number;
  };
}

export interface LogEntry {
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  message: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  timestamp: Date;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  metadata?: {
    analysisId?: string;
    actionTaken?: string;
  };
}

// Re-export AnalysisData from the component
export type { AnalysisData } from '@/components/AnalysisDisplay';
